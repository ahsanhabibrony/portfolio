var App = (function ($) {
    var infinitySlider = {
        init: function ($outline) {
            $outline.slick({
                centerMode: true,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 1,
                variableWidth: true,
                arrows: false
            });
        }
    };
    var faq = {
        init: function ($element, $publicElement) {
            $element.click(function (e) {
                var $parent = $(this).parent();
                if ($parent.hasClass("open"))
                    $parent.removeClass("open");
                else
                    $parent.addClass("open");
                $parent.children("p").slideToggle("normal");
                $(".igorsoloads-questions-question").not($parent).removeClass("open");
                $(".igorsoloads-questions-question").not($parent).children("p").slideUp("fast");
                e.preventDefault();
            });
        }
    };
    var lightbox = {
        init: function () {
            var thisClass = this;
            $("[data-lightbox]").click(function (e) {
                var $this = $(this);
                var $lightboxModel = $("#slider-lightbox");
                thisClass._setLightboxContent($this.attr("href"));
                $lightboxModel.modal("show");
                e.preventDefault();
            });
            $('#slider-lightbox').on('hidden.bs.modal', function () {
                $(".lightbox-content").html("");
            });
        },
        _setLightboxContent: function (url) {
            var $lightboxModel = $("#slider-lightbox");
            var $lightboxContent = $(".lightbox-content");
            if (this._getLightboxType(url) == "img")
                $lightboxContent.html("<img class='img-fluid text-center' src='" + url + "' alt='' />");
            else
                $lightboxContent.html("<iframe width='758' height='430' src='https://fast.wistia.net/embed/iframe/" + this._getYoutubeIdFromUrl(url) + "?rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>");
        },
        _getLightboxType: function (url) {
            var p = /^(?:https?:\/\/)?(?:www\.)?(?:wistia\.com\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            var matches = url.includes('kheifets-igor.wistia.com');
            if (matches)
                return "youtube";
            return "img";
        },
        _getYoutubeIdFromUrl: function (url) {
            var regExp = /^.*(kheifets-igor.wistia.com\/|v\/|u\/\w\/|embed\/|medias\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            var match = url.replace('https://kheifets-igor.wistia.com/medias/', '');
            if (match && match.length > 0) {
                return match;
            } else {
                return 'error';
            }
        }
    };
    return {
        init: function () {
            faq.init($(".igorsoloads-questions-question > a"), $(".igorsoloads-questions-question"));
        }
    };
}(jQuery));
$(function () {
    App.init();

    //Get the button:
    mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

});