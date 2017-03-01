(function($) {

    $('.slider__top').slick({
        // autoplay: true,
        // autoplaySpeed: 6000,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        dotsClass: 'dots',
        appendDots: $('.slider__controls')
    });

})(jQuery);

(function($) {
    /* media check for submenu */
    function mediaCheck() {
        var $mediaCheck = window.matchMedia("(max-width: 820px)");

        if ($mediaCheck.matches) {
            $('.recipes__items').slick({
                // autoplay: true,
                // autoplaySpeed: 6000,
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                infinite: false
            });
        } else {
            $('.recipes__items').slick('unslick');
        }
    }

    window.onresize = function () {
        mediaCheck();
    };
    mediaCheck();
})(jQuery);