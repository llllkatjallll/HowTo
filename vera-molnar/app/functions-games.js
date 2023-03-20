$(document).ready(function (){

    // Get innerHeight für vh  
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    $('.section-wrapper').on('scroll', function() {
       // console.log( $(this).scrollTop() );
    });


    // Menü Button einblenden

    setTimeout(function() {
        $('.dropdown-menu').removeClass('opacity-zero');
    }, 100);

    // Button-Transition

    $('.text-button').click(function(){
        
        if(!document.getElementById("button-speichern").classList.contains('disabled')){
        $(this).addClass('button-clicked');
        setTimeout(function(){
            $('.text-button').removeClass('button-clicked');
        }, 600);  
        }     
    });

    // Redirect

    $('.dropdown-menu').click(function (){
        $('.section-wrapper').animate({top: '120vh'});
        setTimeout(function() {
            window.location.href = 'menu.html';
        }, 1200);
    });

    $('#back-to-menu').click(function (){
        $('.section-wrapper').css('height', '120vh');
        $('.section-wrapper').animate({top: '-120vh'});
        setTimeout(function() {
            window.location.href = 'menu.html';
        }, 1200);
    });


    // Slider    
    
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    
    
    // Bug beheben bei stacking cards / 2nd child position

    $('.section-wrapper').scroll(function() {
        $('.section-wrapper').addClass('scroll-snap');
    });    

});

