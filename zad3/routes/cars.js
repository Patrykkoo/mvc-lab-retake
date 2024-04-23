const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');

let cars = [];
let nextId = 1;

router.get('/car', (req, res) => {
    res.sendFile('car.html', { root: 'views' });
});

router.get('/car/add', (req, res) => {
    res.sendFile('add-car.html', { root: 'views' });
});

router.get('/car/list', (req, res) => {
    const $ = cheerio.load('<div class="cars"></div>');
    if (cars.length === 0) {
        $('.cars').text('No cars have been found.');
    } else {
        $('.cars').html('<h2>Cars</h2><ul></ul>');
        const ul = $('.cars').children('ul');
        cars.forEach(car => {
            const li = $('<li></li>').appendTo(ul);
            Object.keys(car).forEach(property => {
                $('<p></p>').html(`<span class="bold">${property}:</span> ${car[property]}`).appendTo(li);
            });
        });
    }
    res.send($.html());
});

router.post('/car/add', (req, res) => {
    const newCar = {
        id: nextId,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color
    };
    cars.push(newCar);
    nextId++;
    res.redirect('/car');
});

module.exports = router;