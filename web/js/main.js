window.onload = function() {

    function GetIEVersion() {
        var sAgent = window.navigator.userAgent;
        var Idx = sAgent.indexOf("MSIE");

        // If IE, return version number.
        if (Idx > 0)
            return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

        // If IE 11 then look for Updated user agent string.
        else if (!!navigator.userAgent.match(/Trident\/7\./))
            return 11;

        else
            return 0; //It is not IE
    }

    if (GetIEVersion() > 0) {
        $('body').addClass('internet-explorer');
    } else {
        return;
    }
};
(function($) {

    function linkHighlight(linkClass) {

        /* highlight active menu item*/
        $(linkClass).each(function (index) {
            if (this.href.trim() == window.location)
                $(this).addClass('link_active');
        });
    }

    linkHighlight('.nav__link');

})(jQuery);
(function($) {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variable
        var links = this.el.find('.accordion__btn');
        // Event
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    };

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this);
        $next = $this.next();

        $next.slideToggle(150);
        $this.parent().toggleClass('accordion__item_open');

        //collapse other accordions
        //if (!e.data.multiple) {
        //    $el.find('.accordion__content').not($next).slideUp().parent().removeClass('accordion__item_open');
        //};
    };

    var accordion = new Accordion($('.accordion'), false);

})(jQuery);
/* hamburger hide show */
(function($) {
    var hamburger = $('.hamburger');

    function hamburgerOpen() {
        hamburger.addClass('hamburger_active');
        $('body').addClass('menu-mobile_opened');
        $('.menu-mobile').slideDown(150);
    }

    function hamburgerClose() {
        hamburger.removeClass('hamburger_active');
        $('body').removeClass('menu-mobile_opened');
        $('.menu-mobile').slideUp(150);
    }

    hamburger.on('click', function () {
        if ( $(this).hasClass('hamburger_active') ) {
            hamburgerClose()
        } else {
            hamburgerOpen();
        }
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape key
            hamburgerClose()
        }
    });
})(jQuery);
// Iterate over each dropdown element
$('.dropdown').each(function () {

    // Cache the number of options
    var $dropdown = $(this),
        $dropdownBtn = $('.dropdown__btn'),
        $dropdownList = $('.dropdown__list'),
        $dropdownListItems = $('.dropdown__list li');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $dropdownBtn.on('click', function(e) {
        e.stopPropagation();
        if ($dropdown.hasClass('dropdown_opened')) {
            $dropdown.removeClass('dropdown_opened');
            $dropdown.find('.dropdown__list').slideUp(150);
        } else {
            $dropdown.addClass('dropdown_opened');
            $dropdown.find('.dropdown__list').slideDown(150);
        }
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $dropdownListItems.click(function(e) {
        e.stopPropagation();
        $dropdownBtn.text($(this).text());
        $dropdown.removeClass('dropdown_opened');
        $dropdownList.slideUp(150);
    });

    // Hides the unordered list when clicking outside of it
    $(document.body).click( function() {
        $dropdown.removeClass('dropdown_opened');
        $dropdownList.slideUp(150);
    });
});
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