// Simple gallery renderer and lightbox
const videoGrid = document.getElementById('video-grid');
const graphicGrid = document.getElementById('graphic-grid');
const LB = document.getElementById('lightbox');
const LB_CONTENT = document.getElementById('lb-content');
const LB_CAP = document.getElementById('lb-caption');
const LB_CLOSE = document.getElementById('lb-close');

async function loadData(){
  try{
    const res = await fetch('data/projects.json');
    const data = await res.json();
    render(data);
  }catch(e){
    console.error('Failed to load projects.json', e);
  }
}

function createCard(item){
  const card = document.createElement('div');
  card.className = 'card';
  card.tabIndex = 0;
  card.innerHTML = `
    <img class="thumb" src="${item.thumb}" alt="${escapeHtml(item.title)}" />
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.role || '')}</p>
  `;
  card.addEventListener('click', ()=>openLightbox(item));
  card.addEventListener('keydown', (ev)=>{ if(ev.key === 'Enter') openLightbox(item) });
  return card;
}

function render(items){
  items.filter(i=>i.type==='video').forEach(i=>videoGrid.appendChild(createCard(i)));
  items.filter(i=>i.type==='graphic').forEach(i=>graphicGrid.appendChild(createCard(i)));
}

function openLightbox(item){
  LB_CONTENT.innerHTML = '';
  LB_CAP.textContent = `${item.title} — ${item.description || ''}`;
  if(item.video){
    if(item.video.includes('youtube.com') || item.video.includes('youtu.be') || item.video.includes('vimeo.com')){
      const iframe = document.createElement('iframe');
      iframe.src = videoEmbedUrl(item.video);
      iframe.frameBorder = 0;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      LB_CONTENT.appendChild(iframe);
    } else {
      const vid = document.createElement('video');
      vid.controls = true;
      const src = document.createElement('source');
      src.src = item.video;
      vid.appendChild(src);
      LB_CONTENT.appendChild(vid);
      vid.play().catch(()=>{ /* autoplay might be blocked */ });
    }
  } else if(item.images && item.images.length){
    const img = document.createElement('img');
    img.src = item.images[0];
    LB_CONTENT.appendChild(img);
  }
  LB.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  LB.setAttribute('aria-hidden', 'true');
  LB_CONTENT.innerHTML = '';
  LB_CAP.textContent = '';
  document.body.style.overflow = '';
}
LB_CLOSE.addEventListener('click', closeLightbox);
LB.addEventListener('click', (e)=>{ if(e.target === LB) closeLightbox(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

function videoEmbedUrl(url){
  try{
    const u = new URL(url);
    if(u.hostname.includes('youtu')){
      const id = u.searchParams.get('v') || u.pathname.split('/').pop();
      return `https://www.youtube.com/embed/${id}?rel=0&showinfo=0`;
    }
    if(u.hostname.includes('vimeo')) {
      const id = u.pathname.split('/').pop();
      return `https://player.vimeo.com/video/${id}`;
    }
  }catch(e){}
  return url;
}

function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]); }

loadData();
