const fs = require('fs');
const querystring = require('querystring');
const homeView = require('../views/home');
const addCarView = require('../views/add-car');
const carView = require('../views/car');

function handleHome(response) {
    response.setHeader('Content-Type', 'text/html');
    response.write(homeView.renderPage());
    response.end();
}

function handleAddCar(request, response) {
    if (request.method === 'GET') {
        response.setHeader('Content-Type', 'text/html');
        response.write(addCarView.renderPage());
        response.end();
    } else if (request.method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const formData = querystring.parse(body);
            fs.writeFile('formData.json', JSON.stringify(formData), err => {
                if (err) {
                    console.error(err);
                    return;
                }
                response.statusCode = 302;
                response.setHeader('Location', '/car');
                response.end();
            });
        });
    }
}

function handleCar(response) {
    fs.readFile('formData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        response.setHeader('Content-Type', 'text/html');
        response.write(carView.renderPage(data));
        response.end();
    });
}

function handlePageNotFound(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.write('404 Page Not Found');
    response.end();
}

module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound
};