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
        };

        const navbar = {

            init: () => {
                navbar.add();
            },

            add: () => {
                const navbar = document.querySelector('.js-navbar');

                if(window.pageYOffset > 0) {
                    navbar.classList.add('-sticky');
                }

                else {
                    navbar.classList.remove('-sticky');
                }
            }
        };

        const sections = {

            init: () => {
                sections.count();
            },

            count: () => {
                const getAllSections = document.querySelectorAll('.js-sections');

                getAllSections.forEach((item, index) => {

                    if(index == 0) {
                        item.classList.add('-first');
                    }

                    else if(index % 2 == 0) {
                        item.classList.add('-even');
                    }

                    else {
                        item.classList.add('-odd');
                    }
                });
            }
        };

        const disableLinks = {

            init: () => {
                disableLinks.disable();
            },

            disable: () => {
                // Get all empty links
                const getAllLinks = document.querySelectorAll('a');

                getAllLinks.forEach(item => {
                    
                    if (item.attributes.href.value === '#') {
                        
                        item.addEventListener('click', (event) => {
                            event.preventDefault();
                        });
                    }
                });
            }
        };

        const parallax = {};

        /**
         * Initializing functions
         */

        AOS.init({
            duration: 800,
            animatedClassName: 'aos-animate', // class applied on animation
        });

        add.init();
        sections.init();
        disableLinks.init();

        window.addEventListener('scroll', () => {
            navbar.init();
        })
    });
}());