'use strict';

import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import slider from './modules/slider';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', () => {

    timer();
    modal();
    cards();
    slider();
    calculator();

}); //do not touch