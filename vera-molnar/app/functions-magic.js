$(document).ready(function (){

    // Audioplayer

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/Magie.mp3');
    
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

})