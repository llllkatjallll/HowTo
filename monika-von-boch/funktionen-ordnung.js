var i = 0;
var txt = 'kann man mit blicken ordnen ?';
var speed = 150;

function typeWriter() {
    console.log("type");
    if (i < txt.length) {
        document.getElementById("question-content").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

$(document).ready(function (){

    // Frage einblenden 

    $('#question-content').removeClass('opacity-zero');

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