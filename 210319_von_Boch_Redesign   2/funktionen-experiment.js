$(document).ready(function (){

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/experiment.mp3');
    
    $('#button-play').click(function() {
        audioElement.play();
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
        audioElement.pause();
        $(this).addClass('disappear-audio');
        setTimeout(function(){
            $('#button-play').removeClass('hide');
            $('#button-pause').addClass('hide');
        }, 300);
        setTimeout(function(){
            $('#button-play').removeClass('disappear-audio');
        }, 600);
    });    

    $('#button-weiter').click(function (){
        if ($('#information').hasClass('disappear') == false){
            audioElement.pause();
        }
    });

    $('#button-zurueck').click(function (){
        if ($('#information').hasClass('disappear') == false){
            audioElement.pause();
        }
    });
    
});