$(document).ready(function(){

        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Slick slider
        $('.slider').slick({
            arrows: true,
            focusOnSelect: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            adaptiveHeight: false,
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
                }
              }
            ]
        });

        $('.wrapper--app:not(#vera--molnar)').mouseenter(function(){
          $(this).removeClass('grayscale');
        });
        $('.wrapper--app:not(#vera--molnar)').mouseleave(function(){
          $(this).addClass('grayscale');
        });

        $('#icon--hamburger-menu').click(function(){
          $('#curtain-menu').toggleClass('curtain-menu--hidden');
        });
        $('#icon--close-menu').click(function(){
          $('#curtain-menu').toggleClass('curtain-menu--hidden');
        });

        //Slider element should have height with aspect ratio of 2.163
          var sliderImgWidth = $('.slick-slide > div > img').width();
          var sliderImgHeight = sliderImgWidth * 2.163;
          $('.slick-slide > div > img').height(sliderImgHeight);

        //Overlay forwarding

        $('.link--je').click(function(){
          if ($(window).width() < 1199) {
            $('#overlay--wrapper--je').removeClass('inactive');
            setTimeout(
              function() 
              {
                $('#overlay--wrapper--je').removeClass('invisible');
              }, 100);
          }
          else {
              window.location.href = 'jo_enzweiler.html';
        }
      });

        $('.link--mvb').click(function(){
          if ($(window).width() < 1199) {
            $('#overlay--wrapper--mvb').removeClass('inactive');
            setTimeout(function() {
                $('#overlay--wrapper--mvb').removeClass('invisible');
              }, 100);
          }
          else {
              window.location.href = 'monika_von_boch.html';
          }
        });

        $('.link--vm').click(function(){
          if ($(window).width() < 1199) {
            $('#overlay--wrapper--vm').removeClass('inactive');
            setTimeout(function() {
                $('#overlay--wrapper--vm').removeClass('invisible');
              }, 100);
          }
          else {
              window.location.href = 'vera_molnar.html';
          }
        });

        $('#overlay--close--mvb').click(function(){
          $('#overlay--wrapper--mvb').addClass('invisible');
          setTimeout(function() {
              $('#overlay--wrapper--mvb').addClass('inactive');
            }, 300);
        });

        $('#overlay--close--je').click(function(){
          $('#overlay--wrapper--je').addClass('invisible');
          setTimeout(function() {
              $('#overlay--wrapper--je').addClass('inactive');
            }, 300);
        });
          
        $('#overlay--close--vm').click(function(){
          $('#overlay--wrapper--vm').addClass('invisible');
          setTimeout(function() {
              $('#overlay--wrapper--vm').addClass('inactive');
            }, 300);
        });
})