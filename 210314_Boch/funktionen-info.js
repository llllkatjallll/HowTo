$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
// Image-Slider
    
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });    
    
// Navigation einblenden

    $('#information').removeClass('height');
    setTimeout(function(){
        $('svg').removeClass('disappear');
        $('#information-content').removeClass('disappear');
    }, 250);
    
// Navigation   

    $('#zurueck').click(function (){
        $('#information-content').addClass('disappear');
        $('svg').addClass('disappear');
        setTimeout(function(){
            $('#information').css('height','0');
        }, 1000);
        setTimeout(function(){
            window.location.href = 'menue.html';
        }, 2000);
    });  
            
    $('#mehr').click(function (){
        $('#mehr').css('display','none');
        $('#text-mehr').css('display','block');
    });
    
});