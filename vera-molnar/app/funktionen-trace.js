
$(document).ready(function (){

    // Audioplayer

    var audioElement = document.createElement('audio');
    //KATJA: Habe es auskommentiert, damit es keine fehler wirft, bis wir audio eingebaut haben
    //audioElement.setAttribute('src', 'audio/trace.mp3');
    
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
        $(this).addClass('disappear-audio');
        setTimeout(function(){
            $('#button-play').removeClass('dont-show');
            $('#button-pause').addClass('dont-show');
        }, 300);
        setTimeout(function(){
            $('#button-play').removeClass('fade');
        }, 600);
    });    
        

    // Show more text

    $('#button-continue').click(function() {
        $('#further-text').removeClass('fade');
        $('#further-text').removeClass('dont-show');
        $('#button-continue').addClass('fade');
    });


});