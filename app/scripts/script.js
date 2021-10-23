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

        const mobileMenu = {

            init: () => {
                mobileMenu.menu();
            },

            menu: () => {
                const hamburger = document.querySelector('.js-hamburger');
                const mobileHamburger = document.querySelector('.js-mobileHamburger');
                const backdrop = document.querySelector('.js-backdrop');
                const menu = document.querySelector('.js-menu');
                const menuLinks = menu.querySelectorAll('a');

                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('-open');
                    mobileHamburger.classList.remove('-open');
                    backdrop.classList.add('-open');

                    hamburger.classList.contains('-open')
                        ? menu.classList.add('-open')
                        : menu.classList.remove('-open');

                    document.body.classList.add('-scrollY0');
                });

                mobileHamburger.addEventListener('click', () => {
                    mobileHamburger.classList.toggle('-open');
                    hamburger.classList.remove('-open');
                    backdrop.classList.remove('-open');

                    if (mobileHamburger.classList.contains('-open') && menu.classList.contains('-open')) {
                        menu.classList.add('-open')
                        menu.classList.remove('-open');
                    }

                    document.body.classList.remove('-scrollY0');
                });

                backdrop.addEventListener('click', () => {
                    backdrop.classList.remove('-open');
                    menu.classList.remove('-open');
                    hamburger.classList.remove('-open');
                    mobileHamburger.classList.remove('-open');
                    document.body.classList.remove('-scrollY0');
                });

                menuLinks.forEach(item => {
                    
                    item.addEventListener('click', () => {
                        backdrop.classList.remove('-open');
                        menu.classList.remove('-open');
                        hamburger.classList.remove('-open');
                        mobileHamburger.classList.remove('-open');
                        document.body.classList.remove('-scrollY0');
                    });
                });
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

        const toggleClass = {

            init: () => {
                toggleClass.toggle();
            },

            toggle: () => {
                const tabSwitch = document.querySelectorAll('.js-sliderSwitch');

                const clickHandler = (event) => {
                    event.preventDefault();
                    const active = document.querySelector('.js-sliderSwitch.-active');

                    if (active) {
                        active.classList.remove('-active');
                    }

                    event.currentTarget.classList.add('-active');
                };

                tabSwitch.forEach(item => {
                    item.addEventListener('click', clickHandler);
                });
            }
        }

        const swiper = {

            init: () => {
                swiper.slider();
            },

            slider: () => {
                const workSlider = document.querySelector('.js-workSlider');
                const internshipSlider = document.querySelector('.js-internshipSlider');

                const workSliders = document.querySelectorAll('.js-workSliders');

                workSliders.forEach((slider, index) => {

                    if (index > 0) {
                        slider.classList.add('-onTop');
                    }
                });

                const workTab = document.querySelector('.js-tabCategoryWork');
                const internshipTab = document.querySelector('.js-tabCategoryInternship');

                // Init thumb tab slider like behavior
                const thumbSliderWork = new Swiper(workTab, {
                    allowTouchMove: false
                });
                const thumbSliderInternship = new Swiper(internshipTab, {
                    allowTouchMove: false
                });

                new Swiper(internshipSlider, {

                    pagination: {
                        el: '.js-internshipPagination'
                    },

                    thumbs: {
                        swiper: thumbSliderInternship
                    },

                    // navigation: {
                    //     nextEl: '.js-nextNavigation',
                    //     prevEl: '.js-prevNavigation',
                    // },
                });

                new Swiper(workSlider, {

                    pagination: {
                        el: '.js-workPagination'
                    },

                    thumbs: {
                        swiper: thumbSliderWork
                    },

                    // navigation: {
                    //     nextEl: '.js-nextNavigation',
                    //     prevEl: '.js-prevNavigation',
                    // },
                });

                const sliderSwitch = document.querySelectorAll('.js-sliderSwitch');
                const tabCategories = document.querySelectorAll('.js-tabCategories');

                const clickHandler = event => {
                    const currentItem = event.currentTarget;
                    const currentItemDataAttr = currentItem.getAttribute('data-switch');

                    workSliders.forEach((slider, index) => {
                        slider.classList.remove('-active')

                        if (slider.getAttribute('data-slider') === currentItemDataAttr) {
                            slider.classList.add('-active');
                        }
                    });

                    tabCategories.forEach(tab => {
                        tab.classList.remove('-active')

                        if (tab.getAttribute('data-category') === currentItemDataAttr) {
                            tab.classList.add('-active');
                        }
                    });
                };

                sliderSwitch.forEach(sliderSwitch => {
                    sliderSwitch.addEventListener('click', clickHandler);
                });
            }
        };

        const manipulate = {

            init: () => {
                manipulate.manipulate();
            },

            manipulate: () => {
                const overlayHeading = document.querySelector('.m-cards > div:first-of-type .a-heading');
                const overlay = document.querySelectorAll('.m-cards__content');

                overlay.forEach(element => {

                    element.addEventListener('mouseover', () => {
                        overlayHeading.style.opacity = '0'
                    });

                    element.addEventListener('mouseout', () => {
                        overlayHeading.style.opacity = '1'
                    });
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
        mobileMenu.init();
        sections.init();
        disableLinks.init();
        toggleClass.init();
        swiper.init();
        manipulate.init();

        window.addEventListener('scroll', () => {
            navbar.init();
        })
    });
}());