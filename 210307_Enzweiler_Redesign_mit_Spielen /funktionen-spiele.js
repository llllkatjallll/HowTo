$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
// Slider    
    
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    
// Navigation einblenden

    $('#zurueck').removeClass('disappear');
    $('#weiter').removeClass('disappear');

    $('#game').addClass('down');
    $('#introduction').addClass('disappear');
    setTimeout(function(){
        $('#game-content').removeClass('disappear');
        $('#info').removeClass('disappear');
        $('#download').removeClass('disappear');
        $('#stamp').removeClass('disappear');
        $('#introduction').addClass('hide');
    }, 500);
    
// Navigation  
   
    $('#weiter').click(function (){
        if ($('#question').hasClass('disappear') == false){
            $('#question').addClass('disappear');
            $('#quote').removeClass('hide');
            //KATJA
            $('#information').css('pointer-events','none');
            //KATJA END
            setTimeout(function(){
                $('#question').addClass('hide');
                $('#quote').removeClass('disappear');            
                }, 500);
            }
            else if ($('#quote').hasClass('disappear') == false){
                $('#quote').addClass('disappear');
                $('#introduction').removeClass('hide');
                setTimeout(function(){
                    $('#quote').addClass('hide'); $('#introduction').removeClass('disappear');
                    $('#body-wrapper').css('background-color','#6232FB');
                    $('path').css('stroke','white');
                    $('circle').css('stroke','white');
                    $('line').css('stroke','white');
                }, 500);
            }
            else if ($('#introduction').hasClass('disappear') == false){
                $('#game').addClass('down');
                $('#introduction').addClass('disappear');
                setTimeout(function(){
                    $('#game-content').removeClass('disappear');
                    $('#info').removeClass('disappear');
                    $('#download').removeClass('disappear');
                    $('#stamp').removeClass('disappear');
                    $('#introduction').addClass('hide');
                }, 500);
            }
            else if ($('#game-content').hasClass('disappear') == false){
                $('#game-content').addClass('disappear');
                $('#information').removeClass('hide'); 
                //KATJA
                $('#information').css('pointer-events','');
                //KATJA END
                setTimeout(function(){      $('#information').removeClass('disappear');
                $('#info').addClass('disappear');
                $('#download').addClass('disappear');
                $('#stamp').addClass('disappear');
                }, 500);
            }
            else if ($('#information').hasClass('disappear') == false){ 
                audioElement1.pause();                
                $('#information').addClass('disappear');
                $('svg').addClass('disappear');
                setTimeout(function(){
                    $('#game').removeClass('down');
                }, 1000);
                setTimeout(function(){
                    window.location.href = 'menue.html';
                }, 2000);
            }
       });    
    
    $('#zurueck').click(function (){
        if ($('#question').hasClass('disappear') == false){  
            $('#question').addClass('disappear');
            $('svg').addClass('disappear');
            setTimeout(function(){
                $('#body-wrapper').css('top','-100vh');
            }, 1000);
            setTimeout(function(){
                window.location.href = 'menue.html';
            }, 2000);
        }
        else if ($('#quote').hasClass('disappear') == false){
            $('#quote').addClass('disappear');             $('#question').removeClass('hide');
            setTimeout(function(){
                $('#quote').addClass('hide');
                $('#question').removeClass('disappear');
            }, 700);            
        }
        else if ($('#introduction').hasClass('disappear') == false){
                $('#introduction').addClass('disappear');
                $('#quote').removeClass('hide');
                setTimeout(function(){
                    $('#introduction').addClass('hide'); $('#quote').removeClass('disappear');
                    $('#body-wrapper').css('background-color','white');
                    $('path').css('stroke','#6232FB');
                    $('circle').css('stroke','#6232FB');
                    $('line').css('stroke','#6232FB');
                }, 500);    
        }
        else if ($('#game-content').hasClass('disappear') == false){
            $('#game').removeClass('down');
            $('#introduction').removeClass('hide');
            $('#info').addClass('disappear');
            $('#download').addClass('disappear');
            $('#stamp').addClass('disappear');
            setTimeout(function(){
                $('#introduction').removeClass('disappear');
            }, 500);
        }        
        else if ($('#information').hasClass('disappear') == false){
            audioElement1.pause();
            //KATJA
            $('#information').css('pointer-events','none');
            //KATJA END
            $('#information').addClass('disappear');
            setTimeout(function(){
                $('#information').addClass('hide');
                $('#game-content').removeClass('disappear');
                $('#info').removeClass('disappear');
                $('#download').removeClass('disappear');
                $('#stamp').removeClass('disappear');
            }, 500);
        }
    });
            
// Text ausklappen
    
    $('#mehr').click(function (){
        $('#mehr').css('display','none');
        $('#text-mehr').css('display','block');
    });
    
    var audioElement1 = document.createElement('audio');
    audioElement1.setAttribute('src', 'audio/raum.mp4');
    
    $('#play').click(function() {
        audioElement1.play();
        $(this).addClass('disappear-audio');
        setTimeout(function(){
            $('#pause').removeClass('hide');
            $('#play').addClass('hide');
        }, 300);
        setTimeout(function(){
            $('#pause').removeClass('disappear-audio');
        }, 600);        
    });
    
    $('#pause').click(function() {
        audioElement1.pause();
        $(this).addClass('disappear-audio');
        setTimeout(function(){
            $('#play').removeClass('hide');
            $('#pause').addClass('hide');
        }, 300);
        setTimeout(function(){
            $('#play').removeClass('disappear-audio');
        }, 600);
    });
    
});