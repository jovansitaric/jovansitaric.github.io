(function () {

    document.addEventListener("DOMContentLoaded", function() {

        const add = {

            init: () => {
                add.add();
            },

            add: () => {
                const el = document.querySelectorAll('.js-heroText');

                el.forEach(item => {
                    item.classList.add('-show', '-offset');
                });
            }
        }

        AOS.init({
            duration: 800
        });

        add.init();
    });
}());