function startTimer (time) {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

        countDown = new Date(time).getTime(),
        x = setInterval(function() {

            let now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            //do something later when date is reached
            if (distance < 0) {
                let headline = document.getElementById("headline"),
                    countdown = document.getElementById("countdown"),
                    content = document.getElementById("content");

                headline.innerText = "We're Live! Join Us!";
                countdown.style.display = "none";
                content.style.display = "block";

                clearInterval(x);
            }
            //seconds
        }, 0)
};

window.onload = function () {
    const date = new Date();
    const minutes = date.getMinutes();
    let roundUpForMinutes = minutes;
    let roundUpForSeconds = 0;

    if (minutes < 15) {
        roundUpForMinutes = 15;
    }
    else if (minutes < 30) {
        roundUpForMinutes = 30;
    }
    else if (minutes < 45) {
        roundUpForMinutes = 45;
    }
    else if (minutes < 60) {
        roundUpForMinutes = 60;
    }

    date.setMinutes(roundUpForMinutes);
    date.setSeconds(roundUpForSeconds);
    // console.log(date.getHours(), date.getMinutes())

    const countdown = document.querySelector("#countdown");
    if (countdown) {
        startTimer(date);
    }

    /*let mouseX = 0;
    let mouseY = 0;
    let popupCounter = 0;

    document.addEventListener("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    $(document).mouseleave(function () {
        if (mouseY < 100) {
            if (popupCounter < 1) {
                document.querySelector("#tabCloseAlertTrigger").click();
            }
            popupCounter ++;
        }
    });*/
};

function doSomething() {
    var d = new Date(),
        h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), (d.getMinutes() - (d.getMinutes() % 15)) + 15, 0, 0),
        e = h - d;
    window.setTimeout(doSomething, e);
}
doSomething();