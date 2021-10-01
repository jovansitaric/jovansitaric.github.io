(function () {

    document.addEventListener("DOMContentLoaded", function() {

        const add = {

            init: () => {
                add.add();
            },

            add: () => {
                const heroText = document.querySelectorAll('.js-heroText');
                const headings = document.querySelectorAll('.js-headings');

                heroText.forEach((item, index) => {
                    item.classList.add('-show', '-offset');
                    
                    // Add rest of the name to first heading
                    if(index == 0) {
                        setTimeout( () => {
                            item.innerHTML += 'ovan';
                        } ,2500)
                    }
                });

                headings.forEach(item => {
                    item.classList.add('-animate');
                });
            }
        }

        AOS.init({
            duration: 800,
            animatedClassName: 'aos-animate', // class applied on animation
        });

        add.init();
    });
}());