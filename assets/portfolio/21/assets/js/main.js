; (function ($) {
    "use strict";

    $(document).ready(function () {

        /**-----------------------------
         *  Navbar fix
         * ---------------------------*/
        $(document).on('click', '.navbar-area .navbar-nav li.menu-item-has-children>a', function (e) {
            e.preventDefault();
        })
       
        /*-------------------------------------
            menu
        -------------------------------------*/
        $('.navbar-area .menu').on('click', function() {
            $(this).toggleClass('open');
            $('.navbar-area .navbar-collapse').toggleClass('sopen');
        });
    
        // mobile menu
        if ($(window).width() < 992) {
            $(".in-mobile").clone().appendTo(".sidebar-inner");
            $(".in-mobile ul li.menu-item-has-children").append('<i class="fas fa-chevron-right"></i>');
            $('<i class="fas fa-chevron-right"></i>').insertAfter("");

            $(".menu-item-has-children a").on('click', function(e) {
                // e.preventDefault();

                $(this).siblings('.sub-menu').animate({
                    height: "toggle"
                }, 300);
            });
        }

        var menutoggle = $('.menu-toggle');
        var mainmenu = $('.navbar-nav');
        
        menutoggle.on('click', function() {
            if (menutoggle.hasClass('is-active')) {
                mainmenu.removeClass('menu-open');
            } else {
                mainmenu.addClass('menu-open');
            }
        });

        /*--------------------------------------------------
            select onput
        ---------------------------------------------------*/
        $(document).ready(function() {
            $('select').niceSelect();
        });



        /* -----------------------------------------------------
            Variables
        ----------------------------------------------------- */
        var leftArrow = '<i class="la la-arrow-left"></i>';
        var leftAngle = '<i class="fa fa-angle-left"></i>';
        var rightArrow = '<i class="la la-arrow-right"></i>';
        var rightAngle = '<i class="fa fa-angle-right"></i>';

        /*---------------------------------------
            Thumbnail Slider
        ---------------------------------------*/
        var productDetailSlider = $('.single-thumbnail-slider');
        var pThumbanilSlider = $('.product-thumbnail-carousel');

        if (productDetailSlider.length) {
            productDetailSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                speed: 1500,
                asNavFor: '.product-thumbnail-carousel',
            });
        }
        if (pThumbanilSlider.length) {
            pThumbanilSlider.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.single-thumbnail-slider',
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                speed: 1500,
                arrows:true,
                prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left"></i></div>',
                nextArrow: '<div class="slick-next"><i class="fa fa-angle-right"></i></div>',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                        }
                    }
                ]
            });
        }


        /*------------------------------------------------
            partner-slider
        ------------------------------------------------*/
        $('.partner-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            smartSpeed:1500,
            items: 1,
            navText: [ leftAngle, rightAngle],
            responsive: {
                0: {
                    items: 1
                },
                425: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
            }
        });

        /*------------------------------------------------
            testimonial-slider
        ------------------------------------------------*/
        $('.testimonial-slider').owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            dots: true,
            smartSpeed:1500,
            navText: [ leftAngle, rightAngle],
            responsive: {
                0: {
                    items: 1
                },
            }
        });

        /*------------------------------------------------
            explore-slider
        ------------------------------------------------*/
        $('.explore-slider').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            smartSpeed:1500,
            items: 1,
            navText: [ leftAngle, rightAngle],
            responsive: {
                0: {
                    items: 1
                },
                426: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1100: {
                    items: 4
                },
            }
        });

        /* -------------------------------------------------
            Banner Slider 
        ------------------------------------------------- */
            var menu = [];
            jQuery('.swiper-slide').each( function(index){
                menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
            });
            var interleaveOffset = 0.5;
            var swiperOptions = {
                loop: true,
                speed: 1000,
                parallax: true,
                autoplay: {
                    delay: 6500,
                    disableOnInteraction: false,
                },
                watchSlidesProgress: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                on: {
                    progress: function() {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slideProgress = swiper.slides[i].progress;
                            var innerOffset = swiper.width * interleaveOffset;
                            var innerTranslate = slideProgress * innerOffset;
                            swiper.slides[i].querySelector(".slide-inner").style.transform =
                            "translate3d(" + innerTranslate + "px, 0, 0)";
                        }      
                    },

                    touchStart: function() {
                      var swiper = this;
                      for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                      }
                    },

                    setTransition: function(speed) {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".slide-inner").style.transition =
                            speed + "ms";
                        }
                    }
                }
            };

            var swiper = new Swiper(".swiper-container", swiperOptions);

            // DATA BACKGROUND IMAGE
            var sliderBgSetting = $(".slide-bg-image");
            sliderBgSetting.each(function(indx){
                if ($(this).attr("data-background")){
                    $(this).css("background-image", "url(" + $(this).data("background") + ")");
                }
            });

        /*-------------------------------------------------
            wow js init
        --------------------------------------------------*/
        new WOW().init();

        /*------------------
           back to top
        ------------------*/
        $(document).on('click', '.back-to-top', function () {
            $("html,body").animate({
                scrollTop: 0
            }, 2000);
        });

    });

    $(window).on("scroll", function() {
        /*---------------------------------------
        sticky menu activation && Sticky Icon Bar
        -----------------------------------------*/

        var mainMenuTop = $(".navbar-area");
        if ($(window).scrollTop() >= 1) {
            mainMenuTop.addClass('navbar-area-fixed');
        }
        else {
            mainMenuTop.removeClass('navbar-area-fixed');
        }
        
        var ScrollTop = $('.back-to-top');
        if ($(window).scrollTop() > 1000) {
            ScrollTop.fadeIn(1000);
        } else {
            ScrollTop.fadeOut(1000);
        }
    });


    $(window).on('load', function () {

        /*-----------------
            preloader
        ------------------*/
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);

        /*-----------------
            back to top
        ------------------*/
        var backtoTop = $('.back-to-top')
        backtoTop.fadeOut();

        /*---------------------
            Cancel Preloader
        ----------------------*/
        $(document).on('click', '.cancel-preloader a', function (e) {
            e.preventDefault();
            $("#preloader").fadeOut(2000);
        });

    });



})(jQuery);