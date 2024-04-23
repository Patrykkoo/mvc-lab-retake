const http = require('http');
const url = require('url');
const routes = require('./routes');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path === '/' && method === 'GET') {
        routes.handleHome(res);
    } else if (path === '/add-car' && method === 'GET') {
        routes.handleAddCar(req, res);
    } else if (path === '/car' && method === 'GET') {
        routes.handleCar(res);
    } else {
        routes.handlePageNotFound(res);
    }
});

server.on('listening', () => {
    console.log(`Server is running on ${PORT}.`);
});

server.listen(PORT);