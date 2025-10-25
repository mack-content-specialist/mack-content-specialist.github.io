class IndexController {
    getAll(req, res) {
        // Logic to retrieve all items
        res.send('Retrieve all items');
    }

    getById(req, res) {
        const id = req.params.id;
        // Logic to retrieve an item by ID
        res.send(`Retrieve item with ID: ${id}`);
    }
}

export default IndexController;