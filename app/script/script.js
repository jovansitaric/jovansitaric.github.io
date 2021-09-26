(function () {

    document.addEventListener("DOMContentLoaded", function() {

        const add = {

            init: () => {
                add.add();
            },

            add: () => {
                const el = document.querySelectorAll('.js-heroText');

                el.forEach((item, index) => {
                    item.classList.add('-show', '-offset');
                    
                    // Add rest of the name to first heading
                    if(index == 0) {
                        setTimeout( () => {
                            item.innerHTML += 'ovan';
                        } ,2500)
                    }
                });
            }
        }

        AOS.init({
            duration: 800
        });

        add.init();
    });
}());