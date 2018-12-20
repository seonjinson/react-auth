jQuery(function ($) {

    'use strict';

    // -------------------------------------------------------------
    //  Index
    // -------------------------------------------------------------

    // Preloader
    // Hide Mobile Menu On Click
    // Navigation Scroll
    // Sticky Nav
    // Parallax Scrolling
    // MagnificPopup
    // CounterUp
    // Slick Slider
    // TheiaStickySidebar
    // Animationend
    // Gmap

    // -------------------------------------------------------------
    // -------------------------------------------------------------


    // -------------------------------------------------------------
    //  Preloader
    // -------------------------------------------------------------

    $(window).on("load", function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });

    // -------------------------------------------------------------
    //  Hide Mobile Menu On Click
    // -------------------------------------------------------------

    (function () {  
        function menuHide(){
            var windowWidth = $(window).width();
                if(windowWidth < 991 ){
                    $('.navbar-collapse a').on("click", function (e) {
                    $('.navbar-collapse').collapse('toggle');
                });
            }  
        }
        menuHide();
    }()); 

    // -------------------------------------------------------------
    // Navigation Scroll
    // -------------------------------------------------------------

    $(window).on("scroll", function(event) {
        Scroll();
    }); 

    $('.navbar-nav li a').on("click", function() {  
        $('html, body').animate({scrollTop: $(this.hash).offset().top -50}, 1000);
        return false;
    });

    // User define function
    function Scroll() {
        var contentTop      =   [];
        var contentBottom   =   [];
        var winTop      =   $(window).scrollTop();
        var rangeTop    =   200;
        var rangeBottom =   500;
        $('.navbar-nav').find('.scroll a').each(function(){
            contentTop.push( $( $(this).attr('href') ).offset().top);
            contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
        })
        $.each( contentTop, function(i){
            if ( winTop > contentTop[i] - rangeTop ){
                $('.navbar-nav li.scroll')
                .removeClass('active')
                .eq(i).addClass('active');          
            }
        })

    };


    // -------------------------------------------------------------
    //  Sticky Nav
    // -------------------------------------------------------------
     (function () {  
        function menuToggle(){
            var windowWidth = $(window).width();
           $(window).on('scroll', function(){
                if( $(window).scrollTop()>55 ){
                    $('.navbar').addClass('navbar-fixed-top animated fadeInDown');
                } else {
                    $('.navbar').removeClass('navbar-fixed-top animated fadeInDown');
                };
            });
        }

        menuToggle();
    }()); 


    // -------------------------------------------------------------
    //  Parallax Scrolling
    // -------------------------------------------------------------

    $(window).bind('load', function () {
        parallaxInit();             
    });
    function parallaxInit() {   
        $(".gb-cta-1").parallax("50%", 0.3);
        $(".gb-video-section").parallax("50%", 0.3);
        $(".gb-cta-2").parallax("50%", 0.3);
        $(".gb-cta-3").parallax("50%", 0.3);
        $(".gb-twitter").parallax("50%", 0.3);
    } 
    parallaxInit();  
    

    // -------------------------------------------------------------
    //  MagnificPopup
    // -------------------------------------------------------------

    (function() {
        
        $('.video-link').magnificPopup({type:'iframe'});

    }());


    // -------------------------------------------------------------
    // CounterUp
    // -------------------------------------------------------------

    (function () {

        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });

    }());  

    // -------------------------------------------------------------
    //  Slick Slider
    // -------------------------------------------------------------  

    (function() {
      
       $(".work-slider").slick({
            infinite: true,
            slidesToShow: 4,
            autoplay:true,
            autoplaySpeed:10000,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]        
        }); 

       $(".testimonial-slider").slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            autoplay:true,
            autoplaySpeed:10000,
            slidesToScroll: 1,       
        });

       $(".twitter-slider").slick({
            infinite: true,
            slidesToShow: 1,
            autoplay:true,
            autoplaySpeed:10000,
            slidesToScroll: 1,       
        }); 

       $(".portfolio-slider").slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            autoplay:true,
            autoplaySpeed:10000,
            slidesToScroll: 1,       
        }); 

       $(".team-slider").slick({
            dots: true,
            infinite: true,
            slidesToShow: 4,
            autoplay:true,
            autoplaySpeed:10000,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]        
        });            

    }());

    /*==============================================================*/
    // TheiaStickySidebar
    /*==============================================================*/
           
   (function() {

        $('.gb-sticky')
            .theiaStickySidebar({
                additionalMarginTop: 0
            });
    }());


  /*==============================================================*/
  // Animationend
  /*==============================================================*/

    (function( $ ) {

        function doAnimations( elems ) {
            var animEndEv = 'webkitAnimationEnd animationend';
            
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }
        
        var $myCarousel = $('#home-carousel'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
            
        $myCarousel.carousel();
        
        doAnimations($firstAnimatingElems);

        $myCarousel.carousel('pause');
        
        $myCarousel.on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });  
        
    })(jQuery);


 

            
// script end
});

