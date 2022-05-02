$(document).ready(function(){

        // Slick slider
        $('.slider').slick({
            arrows: true,
            focusOnSelect: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
            {
                breakpoint: 1200,
                settings: {
                    arrows: true,
                    focusOnSelect: true,
                    infinite: true,      
                    slidesToShow: 3,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    focusOnSelect: true,
                    infinite: true,      
                    slidesToShow: 1,
                  slidesToScroll: 1,
                  adaptiveHeight: true,
                }
              }
            ]
        });

        $('.wrapper--app').mouseenter(function(){
          $(this).removeClass('grayscale');
        });
        $('.wrapper--app').mouseleave(function(){
          $(this).addClass('grayscale');
        });

        $('#icon--hamburger-menu').click(function(){
          $('#curtain-menu').toggleClass('curtain-menu--hidden');
        });
        $('#icon--close-menu').click(function(){
          $('#curtain-menu').toggleClass('curtain-menu--hidden');
        });

})