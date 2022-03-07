$(function () {

    //    slider js 

    $(".slider_active").slick({
        arrows: true,
        nextArrow: ".right_btn",
        prevArrow: ".left_btn",
    });

    //    counter up js

    $('.counter').counterUp({
        time: 1500
    });

    //    brand slider js

    $(".brand_slide").slick({
        arrows: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true
                }
    },

  {
                breakpoint: 577,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
    },

  
  {
                breakpoint: 321,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
    },

  ]
    })

    //    news slider js

    $(".news_active").slick({
        arrows: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
    },

  {
                breakpoint: 321,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
    },

  ]
    })

    //    mixitup js

    var mixer = mixitup('.mix_wrap');

    //    venobox

    $('.venobox').venobox({
        spinner: 'three-bounce'
    });

    //    sticky menue

    $(window).scroll(function () {
        var scrollAmmount = $(window).scrollTop();
        if (scrollAmmount > 200) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
    });

    
    
//    wowjs
    
    var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null,    // optional scroll container selector, otherwise use window,
    resetAnimation: true,     // reset animation on end (default is true)
  }
);
wow.init();
    
    

});
