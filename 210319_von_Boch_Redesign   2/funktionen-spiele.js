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
            $('#information').css('pointer-events','none');
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
                    $('#body-wrapper').css('background-color','#7822F0');
                    $('path').css('stroke','white');
                    $('circle').css('stroke','white');
                    $('line').css('stroke','white');
                    $('rect').css('stroke','white');
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
                    $('#button-gallery').removeClass('disappear');
                    $('#button-shoot').removeClass('disappear');
                    $('#button-intro').removeClass('disappear');
                 }, 1000);
        }
        /* else if ($('#button-shoot').hasClass('disappear') == false){
            $('#gamebar').removeClass('hide');
            $('#button-stamp').removeClass('hide');
            $('#button-intro').addClass('disappear');
            $('#button-shoot').addClass('disappear');
            $('#button-gallery').addClass('disappear');
            setTimeout(function(){
                $('#button-wrapper-camera').removeClass('dont-show');
                $('#button-wrapper-download').removeClass('dont-show');
                $('#button-wrapper-shoot').addClass('dont-show');
                //$('#button-wrapper-gallery').addClass('dont-show');
                $('#gamebar').removeClass('disappear');
                $('#button-intro').removeClass('disappear');
                $('#button-camera').removeClass('disappear');
                $('#button-download').removeClass('disappear');
                $('#button-stamp').removeClass('disappear');
                }, 1000);
        } */
        else if ($('#game').hasClass('disappear') == false){
                $('#information').removeClass('hide'); 
                $('#game-content').addClass('disappear');
                $('#gamebar').addClass('disappear');
                $('#button-camera').addClass('disappear');
                $('#button-shoot').addClass('disappear');
                $('#button-gallery').addClass('disappear');
                $('#button-intro').addClass('disappear');
                $('#button-download').addClass('disappear');
                $('#button-stamp').addClass('disappear');
                $('#game').css('background-color','white');
                $('#information').css('pointer-events','');
                setTimeout(function(){      
                    $('#button-wrapper-camera').addClass('dont-show');
                    $('#button-wrapper-intro').addClass('dont-show');
                    $('#button-wrapper-download').addClass('dont-show');
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
                    $('path').css('stroke','#7822F0');
                    $('circle').css('stroke','#7822F0');
                    $('line').css('stroke','#7822F0');
                }, 500);    
        }
        else if ($('#button-shoot').hasClass('disappear') == false){
            $('#button-gallery').addClass('disappear');
            $('#button-shoot').addClass('disappear');
            $('#button-intro').addClass('disappear');
            setTimeout(function(){
                $('#game-content').addClass('disappear');
                $('#introduction').removeClass('hide');
            }, 500);
            setTimeout(function(){
                $('#game').removeClass('down');
                $('#introduction').removeClass('disappear');
            }, 1000);            
        }        
        else if ($('#button-select').hasClass('disappear') == false){
            $('#button-zurueck').addClass('disappear');
            $('#button-select').addClass('disappear');
            $('#gamebar').removeClass('hide');
            setTimeout(function(){      
                $('#button-wrapper-weiter').removeClass('dont-show');
                $('#button-wrapper-select').addClass('dont-show');
            }, 750);
            setTimeout(function(){      
                $('#game-content').removeClass('disappear');
                $('#gamebar').removeClass('disappear');
                $('#button-zurueck').removeClass('disappear');
                $('#button-gallery').removeClass('disappear');
                $('#button-shoot').removeClass('disappear');
                $('#button-intro').removeClass('disappear');
                $('#button-weiter').removeClass('disappear');
            }, 1000);
        }   
        else if ($('#button-camera').hasClass('disappear') == false){
            $('#gamebar').addClass('disappear');
            $('#button-intro').addClass('disappear');
            $('#button-camera').addClass('disappear');
            $('#button-download').addClass('disappear');
            $('#button-stamp').addClass('disappear');
            setTimeout(function(){
                $('#button-wrapper-shoot').removeClass('dont-show');
                //$('#button-wrapper-gallery').removeClass('dont-show');
            }, 750);
            setTimeout(function(){
                $('#button-wrapper-camera').addClass('dont-show');
                $('#button-wrapper-download').addClass('dont-show');
                $('#gamebar').addClass('hide');
                $('#button-stamp').addClass('hide');
                $('#button-intro').removeClass('disappear');
                $('#button-shoot').removeClass('disappear');
                $('#button-gallery').removeClass('disappear');
            }, 1000);
        }     
        else if ($('#information').hasClass('disappear') == false){
            $('#button-wrapper-camera').removeClass('dont-show');
            $('#button-wrapper-intro').removeClass('dont-show');
            $('#button-wrapper-download').removeClass('dont-show');
            $('#information').addClass('disappear');
            $('#gamebar').removeClass('hide');
            setTimeout(function(){      
                $('#information').addClass('hide'); 
                $('#game-content').removeClass('disappear');
                $('#gamebar').removeClass('disappear');
                $('#button-camera').removeClass('disappear');
                $('#button-intro').removeClass('disappear');
                $('#button-download').removeClass('disappear');
                $('#button-stamp').removeClass('disappear');
                $('#game').css('background-color','rgba(30, 30, 30, 1)');
                $('#information').css('pointer-events','none');
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

    $('#button-gallery').click(function (){
        //$('#game-content').addClass('disappear');
        $('#gamebar').addClass('disappear');
        $('#button-zurueck').addClass('disappear');
        $('#button-gallery').addClass('disappear');
        $('#button-shoot').addClass('disappear');
        $('#button-intro').addClass('disappear');
        $('#button-weiter').addClass('disappear');
        $('#button-stamp').addClass('disappear');
        setTimeout(function(){      
            $('#button-wrapper-select').removeClass('dont-show');
        }, 750);
        setTimeout(function(){      
            $('#button-wrapper-weiter').addClass('dont-show');
            $('#button-zurueck').removeClass('disappear');
            $('#button-select').removeClass('disappear');
            $('#gamebar').addClass('hide');
        }, 1000);
    }); 

    // Text ausklappen
        
    $('#button-mehr').click(function (){
        $('#button-mehr').css('display','none');
        $('.dont-show').css('display','block');
    });

});
