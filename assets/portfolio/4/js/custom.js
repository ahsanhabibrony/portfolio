$(function () {


    // search click
    $(".btn_search").click(function () {
        $(".overlay").addClass("active");
        $("body").addClass("overflow_hide");
    });

    $(".fa-close").click(function () {
        $(".overlay").removeClass("active");
        $("body").removeClass("overflow_hide");
    });

    // banner slider
    $('.slider_active').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    // work mixitup
    // var mixer = mixitup('.mixitup_active');

    // work venobox
    $('.work_item').venobox({
        share: ['facebook', 'twitter', 'download'],
        spinner: 'three-bounce'
    });

    // counter
    $('.counter').counterUp({
        time: 2000
    });

    // team slider
    $('.clint_slide').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        speed: 300,
        vertical: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveHeight: true
    });

    // faq area
    $('.faq_header').on('click', function () {
        $('.faq_header button').removeClass('faq_active');
        $(this).children('button').addClass('faq_active');
    });

    // animated 
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window,
        resetAnimation: true, // reset animation on end (default is true)
    });
    wow.init();




});
