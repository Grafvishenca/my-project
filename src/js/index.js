/* eslint-disable no-invalid-this */
import intlTelInput from 'intl-tel-input';
import '@popperjs/core';
import 'bootstrap';

const body = document.getElementById('body');
if (body) {
    const d = new Date;
    const years = document.querySelectorAll('.year');
    years.forEach((item) => {
        item.textContent = d.getFullYear();
    });

    document.querySelector('title').innerHTML = `Vortex Edge | Official ${d.getFullYear()} Update`;

    const phone = document.querySelectorAll('.phone');
    phone.forEach((input) => {
        intlTelInput(input, {
            initialCountry: 'auto',
            geoIpLookup: function(callback) {
                fetch('https://ipapi.co/json')
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(data) {
                        callback(data.country_code);
                    })
                    .catch(function() {
                        callback('us');
                    });
            },
            separateDialCode: true
        });
    });

    const button = document.querySelectorAll('.form__btn');
    button.forEach((btn) => {
        if (!btn.disabled) {
            btn.classList.remove('form__btn--disabled');
            return true;
        }

        btn.classList.add('form__btn--disabled');
        const loader = document.createElement('span');
        loader.classList.add('loader');
        btn.appendChild(loader);
    });

    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const accordionItem = button.closest('.accordion-item');

                setTimeout(() => {
                    accordionItem.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

        const flagList = document.getElementById('flagList');

        flagList.addEventListener('click', function(event) {
            const target = event.target.closest('.country-list__item');
            if (target) {
                const selectedFlagImg = document.getElementById('selectedFlagImg');
                const selectedFlagCode = document.getElementById('selectedFlagCode');

                const selectedFlagSrc = selectedFlagImg.getAttribute('src');
                const selectedFlagDataCode = selectedFlagCode.textContent;

                const flagContainer = target.querySelector('.flag-container');
                const codeContainer = target.querySelector('.code-container');

                const flag = flagContainer.querySelector('img').getAttribute('src');
                const code = codeContainer.textContent;

                // Поменять флаг и код местами
                selectedFlagCode.textContent = code;
                selectedFlagImg.setAttribute('src', flag);

                flagContainer.innerHTML = `<img src="${selectedFlagSrc}" alt="flag">`;
                codeContainer.textContent = selectedFlagDataCode;
            }
        });
}