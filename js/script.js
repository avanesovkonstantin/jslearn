'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const timer = require('./modules/timer'),
    modal = require('./modules/modal'),
    cards = require('./modules/cards'),
    slider = require('./modules/slider'),
    calculator = require('./modules/calculator');

    timer();
    
    modal();

    cards();

    slider();

    calculator();

}); //do not touch