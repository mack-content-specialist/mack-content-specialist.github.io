const request = require('supertest');
const app = require('../src/index'); // Adjust the path as necessary

describe('Example Test Suite', () => {
    it('should respond with a 200 status code for the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should return JSON data from the API', async () => {
        const response = await request(app).get('/api/example'); // Adjust the endpoint as necessary
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    // Add more tests as needed
});