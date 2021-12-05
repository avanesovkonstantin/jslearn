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