function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

jQuery(function ($) {
  $(document).ready(function () {
    //Preloader
    var preloader = $('.preloader');
    $(window).load(function () {
      preloader.remove();
    });


    var trianglify = Trianglify({
      width: window.innerWidth,
      height: 650,
      variance: 0.75,
      cell_size: 50,
      seed: Math.random(),
      x_colors: ['#337ab7', '#25406e', '#2f5e97'],
      y_colors: ['#213963', '#337ab7', '#162140']
    });

    trianglify.canvas(document.querySelector('#bg-canvas'));

    particlesJS.load('bg-particle', 'js/particles.config.json');

    // Animate Text scale-up-texts
    anime.timeline({loop: true})
      .add({
        targets: '.scale-up-texts span:nth-child(1)',
        opacity: [0,1],
        scale: [0.2, 1],
        duration: 500
      })
      .add({
        targets: '.scale-up-texts span:nth-child(1)',
        opacity: 0,
        scale: 3,
        duration: 800,
        easing: "easeInExpo",
        delay: 1000
      })
      .add({
        targets: '.scale-up-texts span:nth-child(2)',
        opacity: [0,1],
        scale: [0.2, 1],
        duration: 500
      })
      .add({
        targets: '.scale-up-texts span:nth-child(2)',
        opacity: 0,
        scale: 3,
        duration: 800,
        easing: "easeInExpo",
        delay: 10000
      });


    // Typed Text
    var typed = new Typed('.typed-texts',{
      strings: [
        'Senior .NET Fullstack Developer',
        'C# .NET',
        'HTML5, CSS3, JS',
        'Ionic Framework, AngularJs',
        'Umbraco, Sitecore, EpiServer'
      ],
      typeSpeed: 20,
      backSpeed: 10,
      backDelay: 2000,
      startDelay: 1000,
      loop: true
    });

    //#main-slider
    // var slideHeight = $(window).height();
    // $('#home-slider .item').css('height',slideHeight);
    //
    // $(window).resize(function(){'use strict',
    // 	$('#home-slider .item').css('height',slideHeight);
    // });


    //Scroll Menu
    //$(window).on('scroll', function(){
    //	if( $(window).scrollTop()>slideHeight ){
    //		$('.main-nav').addClass('navbar-fixed-top');
    //	} else {
    //		$('.main-nav').removeClass('navbar-fixed-top');
    //	}
    //});

    // Navigation Scroll
    $(window).scroll(function (event) {
      Scroll();
    });

    $('.navbar-collapse ul li a').on('click', function () {
      $('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
      return false;
    });

    // User define function
    function Scroll() {
      var contentTop = [];
      var contentBottom = [];
      var winTop = $(window).scrollTop();
      var rangeTop = 200;
      var rangeBottom = 500;
      $('.navbar-collapse').find('.scroll a').each(function () {
        contentTop.push($($(this).attr('href')).offset().top);
        contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
      })
      $.each(contentTop, function (i) {
        if (winTop > contentTop[i] - rangeTop) {
          $('.navbar-collapse li.scroll')
            .removeClass('active')
            .eq(i).addClass('active');
        }
      })
    };

    $('#tohash').on('click', function () {
      //$('html, body').animate({scrollTop: $(this.hash).offset().top - 70}, 1000);
      return false;
    });

    //Initiat WOW JS
    new WOW().init();
    //smoothScroll
    smoothScroll.init();

    // Progress Bar
    $('#about-us').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
      if (visible) {
        $.each($('div.progress-bar'), function () {
          $(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
        });
        $(this).unbind('inview');
      }
    });

    //Countdown
    //$('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
    //	if (visible) {
    //		$(this).find('.timer').each(function () {
    //			var $this = $(this);
    //			$({ Counter: 0 }).animate({ Counter: $this.text() }, {
    //				duration: 2000,
    //				easing: 'swing',
    //				step: function () {
    //					$this.text(Math.ceil(this.Counter));
    //				}
    //			});
    //		});
    //		$(this).unbind('inview');
    //	}
    //});

    // Portfolio Single View
    $('#portfolio').on('click', '.folio-read-more', function (event) {
      event.preventDefault();
      var link = $(this).data('single_url');
      var full_url = '#portfolio-single-wrap',
        parts = full_url.split("#"),
        trgt = parts[1],
        target_top = $("#" + trgt).offset().top;

      $('html, body').animate({scrollTop: target_top}, 600);
      $('#portfolio-single').slideUp(500, function () {
        $(this).load(link, function () {
          $(this).slideDown(500);
        });
      });
    });

    // Close Portfolio Single View
    $('#portfolio-single-wrap').on('click', '.close-folio-item', function (event) {
      event.preventDefault();
      var full_url = '#portfolio',
        parts = full_url.split("#"),
        trgt = parts[1],
        target_offset = $("#" + trgt).offset(),
        target_top = target_offset.top;
      $('html, body').animate({scrollTop: target_top}, 600);
      $("#portfolio-single").slideUp(500);
    });

    // Contact form
    var form = $('#main-contact-form');
    form.submit(function (event) {
      event.preventDefault();
      var form_status = $('<div class="form_status"></div>');
      $.ajax({
        url: $(this).attr('action'),
        beforeSend: function () {
          form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
        }
      }).done(function (data) {
        form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
      });
    });
  })
});

