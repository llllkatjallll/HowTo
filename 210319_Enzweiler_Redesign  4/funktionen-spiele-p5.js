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

    $('#button-zurueck').removeClass('disappear');
    $('#button-weiter').removeClass('disappear');

    //KATJA : go direct to game - for faster debugging
    /*$('#game').addClass('down');
    $('#introduction').addClass('disappear');
    setTimeout(function(){
        $('#game-content').removeClass('disappear');
        $('#info').removeClass('disappear');
        $('#download').removeClass('disappear');
        $('#stamp').removeClass('disappear');
        $('#introduction').addClass('hide');
    }, 500);*/
    
// Navigation  
   
    $('#button-weiter').click(function (){
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
                    $('#quote').addClass('hide'); 
                    $('#introduction').removeClass('disappear');
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
                    $('#introduction').addClass('hide');
                }, 500);
                setTimeout(function(){
                    $('#gamebar').removeClass('disappear');
                    $('#button-intro').removeClass('disappear');
                    $('#button-download').removeClass('disappear');
                    $('#button-stamp').removeClass('disappear');
                    $('#button-refresh').removeClass('disappear');
                 }, 1000);
        }
            else if ($('#game-content').hasClass('disappear') == false){
                $('#information').removeClass('hide'); 
                $('#game-content').addClass('disappear');
                $('#button-intro').addClass('disappear');
                $('#button-download').addClass('disappear');
                $('#button-stamp').addClass('disappear');
                $('#button-gamebar').addClass('disappear');
                $('#button-refresh').addClass('disappear');
                //KATJA
                $('#information').css('pointer-events','');
                //KATJA END
                setTimeout(function(){      
                    $('#information').removeClass('disappear');
                    $('#gamebar').addClass('hide');
                }, 1000);
            }
            else if ($('#information').hasClass('disappear') == false){ 
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
    
    $('#button-zurueck').click(function (){
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
            $('#button-intro').addClass('disappear');
            $('#button-download').addClass('disappear');
            $('#button-stamp').addClass('disappear');
            $('#button-refresh').addClass('disappear');
            $('#gamebar').addClass('disappear');
            setTimeout(function(){
                $('#introduction').removeClass('disappear');
            }, 1000);
        }        
        else if ($('#information').hasClass('disappear') == false){
            $('#information').addClass('disappear');
            //KATJA
            $('#information').css('pointer-events','none');
            //KATJA END
            setTimeout(function(){
                $('#information').addClass('hide');
                $('#gamebar').removeClass('disappear');
            }, 500);
            setTimeout(function(){
                $('#game-content').removeClass('disappear');
                $('#button-intro').removeClass('disappear');
                $('#button-download').removeClass('disappear');
                $('#button-stamp').removeClass('disappear');
                $('#button-refresh').removeClass('disappear');
            }, 1000);
        }
    });

/* Intro Overlay einblenden */
        
$('#button-intro').click(function (){
    $('#intro-wrapper').removeClass('hide');
    $('#intro').addClass('turn-animation');
    setTimeout(function(){
        $('#intro-wrapper').css('background-color','rgba(0, 0, 0, 0.35)');
    }, 5);     
    setTimeout(function(){
        $('#intro').removeClass('turn');
    }, 500);     
    setTimeout(function(){
        $('#intro').removeClass('turn-animation');
    }, 1000);     
});

 
 $('#button-okay').click(function (){
    $('#intro').addClass('turnBack-animation');
    $('#intro-wrapper').css('background-color','rgba(0, 0, 0, 0)');
    setTimeout(function(){
    }, 500);     
    setTimeout(function(){
        $('#intro').addClass('turn');
        $('#intro').removeClass('turnBack-animation');
        $('#intro-wrapper').addClass('hide');
    }, 1000);     
});    

// Text ausklappen
    
    $('#button-mehr').click(function (){
        $('#button-mehr').css('display','none');
        $('.dont-show').css('display','block');
    });

});