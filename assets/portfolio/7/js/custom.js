$(function () {

    $(".slider_wrap").slick({
        arrows: true,
        nextArrow: ".right_btn",
        prevArrow: ".left_btn",
    });


    // countdown js

    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let countDown = new Date('Aug 23, 2020 22:45:00').getTime(),
        x = setInterval(function () {

            let now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById('days').innerText = Math.floor(distance / (day)),
                document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

            //do something later when date is reached
            //if (distance < 0) {
            //  clearInterval(x);
            //  'IT'S MY BIRTHDAY!;
            //}

        }, second)




    // POPUP JS


    $('.btn-header').on('click', function () {
        $('#myOverlay').fadeIn();
        $("body").addClass("overflow_hide");

    });

    $('.btn-primary').on('click', function () {
        $('#myOverlay').fadeIn();
        $("body").addClass("overflow_hide");
    });

    $('.warning_button').on('click', function () {
        $('#myOverlay').fadeIn();
        $("body").addClass("overflow_hide");
    });

    $('.closebtn').on('click', function () {
        $("body").removeClass("overflow_hide");
    })

    $('.closebtn').on('click', function () {
        $('#myOverlay').fadeOut();

    });


});