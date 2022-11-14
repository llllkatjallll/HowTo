// Frage einblenden mit Type Effect

var i = 0;
var txt = 'wie macht man das unsichtbare sichtbar ?';
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

    // Audioplayer

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/trace.mp3');
    
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