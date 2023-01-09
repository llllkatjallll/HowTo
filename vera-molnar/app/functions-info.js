$(document).ready(function (){

    // Get innerHeight für vh  
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);


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

});