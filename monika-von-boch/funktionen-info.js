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

    // Text ausklappen
    
    $('#button-mehr').click(function (){
        $('#button-mehr').css('display','none');
        $('.dont-show').css('display','block');
    });

    // Audio-Player

    var audioElement1 = document.createElement('audio');
    audioElement1.setAttribute('src', 'audio/fotografie.mp3');

    $('#button-play').click(function() {
        audioElement1.play();
        $(this).addClass('disappear-audio');
        setTimeout(function(){
            $('#button-pause').removeClass('hide');
            $('#button-play').addClass('hide');
        }, 300);
        setTimeout(function(){
            $('#button-pause').removeClass('disappear-audio');
        }, 600);        
    });

    $('#button-pause').click(function() {
        audioElement1.pause();
        $(this).addClass('disappear-audio');
        setTimeout(function(){
            $('#button-play').removeClass('hide');
            $('#button-pause').addClass('hide');
        }, 300);
        setTimeout(function(){
            $('#button-play').removeClass('disappear-audio');
        }, 600);
    });    
    
});