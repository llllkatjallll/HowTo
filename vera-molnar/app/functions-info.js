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

        // Audioplayer

        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'audio/Biografie.mp3');
        
        $('#button-play').click(function() {
            audioElement.play();
            $(this).addClass('fade');
            setTimeout(function(){
                $('#button-pause').removeClass('dont-show');
                $('#button-play').addClass('dont-show');
            }, 300);
            setTimeout(function(){
                $('#button-pause').removeClass('fade');
            }, 600);        
        });
        
        $('#button-pause').click(function() {
            audioElement.pause();
            $(this).addClass('fade');
            setTimeout(function(){
                $('#button-play').removeClass('dont-show');
                $('#button-pause').addClass('dont-show');
            }, 300);
            setTimeout(function(){
                $('#button-play').removeClass('fade');
            }, 600);
        });  

});