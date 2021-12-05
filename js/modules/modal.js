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