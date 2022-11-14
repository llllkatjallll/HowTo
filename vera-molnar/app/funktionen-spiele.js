$(document).ready(function (){

    let currentSectionNr = 1    
    
// Get innerHeight für vh  
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    

// Einblenden erste Section & Menü im Hintergrund

    $('#question-section').removeClass('fade');
    setTimeout(function(){
        $('#menu-game').removeClass('fade');
    }, 1500);    


/* Scroll-Event Fade in – funktioniert bisher nicht!!!

    const checkpoint = 200;
    var parent = document.querySelector("section")
 
    window.addEventListener("scroll", () => {
      const currentScroll = parent.OffsetTop;
      if (currentScroll <= checkpoint) {
        opacity = 1 - currentScroll / checkpoint;
      } else {
        opacity = 0;
      }
      parent.querySelector(".section-content").style.opacity = opacity;
    });
*/

// Home-Button

    $('#icon-home-light').click(function() {
        $('section').addClass('fade');
        setTimeout(function() {
            window.location.href = 'menu.html';
        }, 800);
    });

    $('#icon-home-dark').click(function() {
        $('section').addClass('fade');
        setTimeout(function() {
            window.location.href = 'menu.html';
        }, 800);
    });


// Slider    
    
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

});
