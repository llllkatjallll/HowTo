$(document).ready(function (){

    // Temporäre Alternative zu Typewriter Effect

    $('#question-content').removeClass('opacity-zero');

    // Typewriter Effect

    /*
    var i = 0;
    var txt = 'wie macht man das unsichtbare sichtbar?';
    var speed = 50;
    
    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("question-content").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }*/

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/ordnung.mp3');
    
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