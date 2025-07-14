(function($) {
    "use strict";

    // Sticky Navbar
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        var AESticky = $('.active-sticky');
        if (scroll < 245) {
            AESticky.removeClass("is-sticky");
        } else {
            AESticky.addClass("is-sticky");
        }
    });

    // Progress bar width
    $('.progress .progress-bar').css("width", function() {
        return $(this).attr("aria-valuenow") + "%";
    });

    // Smooth scroll
    $('.smooth-scroll a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 750);
                return false;
            }
        }
    });

    // One Page Nav
    var OnePNav = $('.onepage-nev');
    var top_offset = OnePNav.height() - -0;
    OnePNav.onePageNav({
        currentClass: 'active',
        scrollOffset: top_offset,
    });

    // Expand Menu
    var CloseMu = $('.close-menu');
    var ExMu = $('.mainmenu-expand');
    var ExMuOp = $('.expand-menu-open');
    CloseMu.on('click', function() {
        $(this).parent(ExMu).removeClass('slide_right');
    });
    ExMuOp.on('click', function() {
        CloseMu.parent(ExMu).addClass('slide_right');
    });

    // Skill Progress Animation
    var ProWey = $('.skill-progress');
    if (ProWey.length > 0) {
        ProWey.waypoint(function() {
            $('.skill-bar').each(function() {
                $(this).find('.progress-content').animate({
                    width: $(this).attr('data-percentage')
                }, 2000);

                $(this).find('.progress-mark').animate({
                    left: $(this).attr('data-percentage')
                }, {
                    duration: 2150,
                    step: function(now) {
                        var data = Math.round(now);
                        $(this).find('.percent').html(data + '%');
                    }
                });
            });
        }, { offset: '90%' });
    }

    // Fancybox
    $('.fancybox').fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        padding: 0,
        closeBtn: true,
        helpers: {
            overlay: { locked: false },
            title: { type: 'inside' },
            buttons: {}
        }
    });

    $(".various").fancybox({
        padding: 0,
        maxWidth: 800,
        maxHeight: 600,
        fitToView: false,
        width: '70%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'fade',
        closeEffect: 'fade'
    });

    // Slick Carousel
    $('.one-item').slick({
        dots: true,
        arrows: false,
    });

    // Contact Form Validation
    var CTForm = $('#contact_form');
    var CTSubmit = $('#contact_submit');
    CTForm.validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        },
        messages: {
            name: "What's your name?",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },
        highlight: function(element) {
            $(element).text('').addClass('error');
        },
        success: function(element) {
            element.text('').addClass('valid');
        }
    });

    // Contact Form Submit
    CTForm.submit(function() {
        if ($(this).valid()) {
            CTSubmit.button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function() {
                    CTSubmit.button('reset');
                    CTSubmit.button('complete');
                },
                error: function() {
                    CTSubmit.button('reset');
                    CTSubmit.button('error');
                }
            });
        } else {
            CTSubmit.button('reset');
        }
        return false;
    });

    // Scroll Up
    $.scrollUp({
        scrollText: '<i class="zmdi zmdi-chevron-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    // Preloader and Isotope Init
    $(window).on('load', function() {
        $('#loading').fadeOut(1000);

        var $grid = $('.portfolio-grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry'
        });

        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');
        });
    });

})(jQuery);


// === KUSTOM FILTER KATEGORI === //
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.filter-btn');
    const folderView = document.getElementById('folderView');
    const gridGroups = document.querySelectorAll('.grid-group');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Atur tombol aktif
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (filter === 'all') {
                folderView.style.display = 'flex';
                gridGroups.forEach(g => g.style.display = 'none');
            } else {
                folderView.style.display = 'none';
                gridGroups.forEach(g => {
                    g.style.display = g.classList.contains(filter) ? 'block' : 'none';
                });
            }
        });
    });

    // Pastikan gambar-gambar grid-item di folderView tetap muncul
    folderView.querySelectorAll('img').forEach(img => {
        img.classList.add('grid-item');
    });

    folderView.style.display = 'flex';
    gridGroups.forEach(g => g.style.display = 'none');
});