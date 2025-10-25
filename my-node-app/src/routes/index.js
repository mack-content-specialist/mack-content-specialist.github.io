const express = require('express');
const IndexController = require('../controllers/index');

const router = express.Router();
const indexController = new IndexController();

function setRoutes(app) {
    router.get('/items', indexController.getAll.bind(indexController));
    router.get('/items/:id', indexController.getById.bind(indexController));
    
    app.use('/api', router);
}

module.exports = setRoutes;