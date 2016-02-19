(function ($) {

    // validation form
    var form = $('#contact'),
        submit = form.find('[name="submit"]');

    form.on('submit', function(e) {
        e.preventDefault();

        // avoid spamming buttons
        if (submit.attr('value') !== 'Send')
            return;

        var valid = true;
        form.find('input, textarea').removeClass('invalid').each(function() {
            if (!this.value) {
                $(this).addClass('invalid');
                valid = false;
            }
        });

        if (!valid) {
            form.animate({left: '-3em'},  50)
                .animate({left:  '3em'}, 100)
                .animate({left:    '0'},  50);
        } else {
            submit.attr('value', 'Sending...')
                .css({boxShadow: '0 0 200em 200em rgba(225, 225, 225, 0.6)',
                    backgroundColor: '#ccc'});
            // simulate AJAX response
            setTimeout(function() {
                // step 1: slide labels and inputs
                // when AJAX responds with success
                // no animation for AJAX failure yet
                form.find('label')
                    .animate({left: '100%'}, 500)
                    .animate({opacity: '0'}, 500);
            }, 1000);
            setTimeout(function() {
                // step 2: show thank you message after step 1
                submit.attr('value', 'Thank you :)')
                    .css({boxShadow: 'none'});
            }, 2000);
            setTimeout(function() {
                // step 3: reset
                form.find('input, textarea').val('');
                form.find('label')
                    .css({left: '0'})
                    .animate({opacity: '1'}, 500);
                submit.attr('value', 'Send')
                    .css({backgroundColor: ''});
            }, 4000);
        }
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
                'scrollTop': $target.offset().top+2
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
    });

    $(document).scroll(onScroll);
    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('#navigation a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('navigation ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }

    //speakers
    $('.speakers-info i').click(
        function() {
        $(this).parents().eq(2).toggleClass('fullDesc');

            $(this).toggleClass('glyphicon-menu-down glyphicon-remove');

            //if ($(this).hasClass('glyphicon-remove')) {
            //$(this).prependTo(".speakers-info");
            //

            //$(this).insertBefore(".speakers-info");

            $(this).siblings('p').toggle( "slow", function() {
                // Animation complete.
            });

            $(this).parents('.row').fadeTo('slow', 0.3, function()
            {
                $(this).parents().css('background-image', 'url(../img/speakers/speakers-bg-04.jpg)');
            }).fadeTo('slow', 1);
    });

})(jQuery);