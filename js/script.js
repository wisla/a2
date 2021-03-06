(function ($) {

    // When the document is ready
    $(document).ready(function () {

        //validation rules
        $("#contactform").validate({
            focusInvalid: false,
            onkeyup: false,
            onfocusout: false,
            errorElement: "div",
            errorPlacement: function (error, element) {
                error.appendTo("div#errors");
            },
            rules: {
                "contactform-fullname": {
                    required: true,
                    minlength: 5
                },
                "contactform-email": {
                    required: true,
                    email: true
                },
                "contactform-subject": {
                    required: true,
                    minlength: 5
                },
                "contactform-message": {
                    required: true,
                    minlength: 15
                },
                "contactform-condition": {
                    required: true
                }
            },
            messages: {
                "contactform-fullname": {
                    required: "Pole \"Name\" powinno być wypełnione",
                    minlength: "Źle wypełniłeś pole - minimalnie 5 znaków"
                },
                "contactform-email": {
                    required: "Pole \"Email\" powinno być wypełnione",
                    email: "Podaj poprawny adres mailowy"
                },
                "contactform-subject": {
                    required: "Pole \"Subject\" powinno być wypełnione",
                    minlength: "Źle wypełniłeś pole - minimalnie 5 znaków"
                },
                "contactform-message": {
                    required: "Proszę wpisać wiadomość",
                    minlength: "Zbyt krótka treść wiadomości"
                },
                "contactform-condition": {
                    required: "Musisz zaakceptować warunki"
                }
            }
        });

    });

    //scroll smooth
    $(document).ready(function () {
        $(document).on("scroll", onScroll);

        //smoothscroll
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');

            var target = this.hash,
                menu = target;
            $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top + 2
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
    });

    $(document).scroll(onScroll);
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('#navigation a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('navigation ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }

    //speakers
    $('.speakers-info i').click(
        function () {
            $(this).parents().eq(2).toggleClass('fullDesc').siblings().removeClass('fullDesc').find('.speakers-info i').addClass('glyphicon-menu-down').removeClass('glyphicon-remove');

            $(this).toggleClass('glyphicon-menu-down glyphicon-remove');

        });

    (function () {
        var $window = $(window),
            $html = $('.wow');

        $window.resize(function resize() {
            if ($window.width() > 767) {
                return $html.addClass('wow');
            }

            $html.removeClass('wow');
        }).trigger('resize');
    })()

})(jQuery);