/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator() {
    const result = document.querySelector('.calculating__result span');

    let sex = 'female',
        height = '',
        weight = '',
        age = '',
        ratio = '1.375';

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    }

    if (localStorage.getItem('ratio')) {
        sex = localStorage.getItem('ratio');
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'xxx';
            return;
        }

        let resulttext;

        if (sex === 'female') {
            resulttext = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        } else {
            resulttext = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        }

        result.textContent = Math.round(resulttext);
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {

            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                };

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = '';
            };

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

};

module.exports = calculator;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...clases) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.clases = clases;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const elemetn = document.createElement("div");

            if (!this.clases.length) {
                this.clases = ['menu__item'];
            };

            this.clases.forEach(className => elemetn.classList.add(className));

            elemetn.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
                 `;
            this.parent.append(elemetn);
        }
    };

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price,
                        '.menu .container',
                        'menu__item')
                    .render();
            });
        });

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {



    const bts = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        classNameShow = 'show';

    function openCloseModal() {
        modal.classList.toggle(classNameShow);
        if (modalIsOpen()) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

    }

    function modalIsOpen() {
        return modal.classList.contains(classNameShow);
    }

    bts.forEach((btn) => {
        btn.addEventListener('click', openCloseModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '' && modalIsOpen()) {
            openCloseModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalIsOpen()) {
            openCloseModal();
        }
    });


    function showModalIfScrollIsDown() {
        if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
            openCloseModal();
            window.removeEventListener('scroll', showModalIfScrollIsDown);
        }
    }

    window.addEventListener('scroll', showModalIfScrollIsDown);

    const message = {
        loading: 'Выполняется отправка...',
        success: 'мы с вамии свяжемся!',
        error: 'возникла ошибка, попробуйте в следующий раз'
    };

    const postData = async (url, data) => {

        const res = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await res.json();

    };

    function sendData(form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formdata = new FormData(form);
            const body = JSON.stringify(Object.fromEntries(formdata.entries()));

            postData('http://localhost:3000/requests', body)
                .then(data => {
                    console.log(data);
                    openCloseModal();
                    openmessageAfterRequest('success');
                })
                .catch(() => {
                    openCloseModal();
                    openmessageAfterRequest('error');
                })
                .finally(() => {
                    form.reset();
                });
        });
    };

    const forms = document.querySelectorAll('form');

    forms.forEach(function (form) {
        sendData(form);

    });

    function openmessageAfterRequest(result) {

        const messageAfterRequest = document.createElement('div');
        messageAfterRequest.setAttribute('data-close', '');
        messageAfterRequest.classList.add('modal', 'show');
        messageAfterRequest.innerHTML = `
    <div class="modal__dialog">
        <div class="modal__content">
            <form action="#">
                <div modal_close_AfterRequest class="modal__close">&times;</div>
                <div class="modal__title">${message[result]}</div>
            </form>
        </div>
    </div>`;
        document.body.append(messageAfterRequest);

        document.querySelector('[modal_close_AfterRequest]').addEventListener('click', () => {
            messageAfterRequest.remove();
        });

        setTimeout(() => {
            messageAfterRequest.remove();
        }, 4000);

    }
};

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){


const sliders = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        slider = document.querySelector('.offer__slider'),
        slideIndicator = document.createElement('ol'),
        dots = [],
        width = window.getComputedStyle(slidesWrapper).width;

    let total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slideIndex = 1,
        offset = 0;

    slidesField.style.width = 100 * sliders.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slideIndicator.classList.add('carousel-indicators');
    slider.style.position = 'relative';
    slider.append(slideIndicator);

    function getNumbFromSrting(str) {
        return +str.replace(/\D/g, '');
    };

    sliders.forEach((slide, i) => {
        slide.style.width = width;

        const dot = document.createElement('ul');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-number', i + 1);
        slideIndicator.append(dot);

        if (i == 0) {
            dot.classList.add('dot_activete');
        };

        dots.push(dot);

        dot.addEventListener('click', (e) => {
            slideIndex = e.target.getAttribute('data-slide-number');
            changeActiveDdot();
            offset = getNumbFromSrting(width) * (slideIndex - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
        });
    });

    function changeActiveDdot() {
        dots.forEach(createdDot => {
            if (createdDot.classList.contains('dot_activete')) {
                createdDot.classList.remove('dot_activete');
            }
        });
        dots[slideIndex - 1].classList.add('dot_activete');
        changeSlideIndexText();
    }

    function changeSlideIndexText() {

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    next.addEventListener('click', () => {
        if (offset == getNumbFromSrting(width) * (sliders.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += getNumbFromSrting(width);
            slideIndex++;
        }

        changeSlideIndexText();
        changeActiveDdot();

        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = getNumbFromSrting(width) * (sliders.length - 1);
            slideIndex = sliders.length;
        } else {
            offset -= getNumbFromSrting(width);
            slideIndex--;
        }

        changeSlideIndexText();
        changeActiveDdot();

        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    changeSlideIndexText();

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {

    const dedline = '2021-12-31';

    function getTimerSettings(endtime) {
        const t = Date.parse(endtime) - new Date();

        function setZero(num) {
            if (num > 0 && num < 10) {
                return `0${num}`;
            }

            return num;
        }

        return {
            "total": t,
            "days": setZero(Math.floor(t / (1000 * 60 * 60 * 24))),
            "hours": setZero(Math.floor(t / (1000 * 60 * 60) % 60)),
            "minutes": setZero(Math.floor(t / (1000 * 60) % 60)),
            "seconds": setZero(Math.floor((t / 1000) % 60))
        };
    }

    function updateTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(setTimer, 1000);

        setTimer();

        function setTimer() {
            const t = getTimerSettings(dedline);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total < 0) {
                clearInterval(timeInterval);
            }
        }

    }

    updateTimer('.timer', dedline);

}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {

    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
    modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
    cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
    slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
    calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

    timer();
    
    modal();

    cards();

    slider();

    calculator();

}); //do not touch
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map