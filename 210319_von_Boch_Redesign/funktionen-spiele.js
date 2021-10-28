function selectPhotoAction() {
    myp5.selectedImageMode();
    $('#button-zurueck-from-gallery').addClass('disappear');
    $('#button-wrapper-weiter').removeClass('dont-show');
    setTimeout(function(){      
        $('#button-wrapper-zurueck').removeClass('dont-show');
        $('#game-content').removeClass('disappear');
        $('#button-wrapper-zurueck-from-gallery').addClass('dont-show');
    }, 500);
    setTimeout(function(){      
        
        $('#button-zurueck').removeClass('disappear');
        $('#button-weiter').removeClass('disappear');
        
    }, 1000);
    }

 function backFromGalleryAction(){
    myp5.refreshCamera();
    $('#gallery').removeClass('gallery-animation');
    $('#gallery').addClass('gallery-animation-reverse');
    $('#gallery').removeClass('active-gallery');
    
    //$('#button-wrapper-camera').removeClass('dont-show');
    $('#button-wrapper-intro').removeClass('dont-show');
    $('#button-wrapper-shoot').removeClass('dont-show');
    $('#button-wrapper-gallery').removeClass('dont-show');
    $('#button-wrapper-weiter').removeClass('dont-show');
    $('#button-wrapper-select').addClass('dont-show');
    $('#button-zurueck-from-gallery').addClass('disappear');
    $('#button-wrapper-zurueck-from-gallery').addClass('dont-show');
    
    $('#button-wrapper-zurueck').removeClass('dont-show');
    $('#gamebar').addClass('hide');
    setTimeout(function(){     
        $('#game-content').removeClass('disappear');
        
    }, 500);
    setTimeout(function(){     
        

       // $('#game-content').removeClass('disappear');
        $('#gamebar').removeClass('disappear');
        $('#button-camera').removeClass('disappear');
        $('#button-intro').removeClass('disappear');
        $('#button-weiter').removeClass('disappear');
        $('#button-download').removeClass('disappear');
        $('#button-shoot').removeClass('disappear');
        $('#button-gallery').removeClass('disappear');
        $('#button-stamp').removeClass('disappear');
        $('#button-zurueck').removeClass('disappear');
        $('#game').css('background-color','rgba(30, 30, 30, 1)');
    }, 1000);
 }   


$(document).ready(function (){

    let currentSectionNr = 1    
    
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

// functions


    
// Navigation einblenden

    $('#button-zurueck').removeClass('disappear');
    $('#button-weiter').removeClass('disappear');


// Navigation  
$('#button-weiter').click(function (){
    currentSectionNr = currentSectionNr+1;
    switch (currentSectionNr) {
        case (0):
          idName = "menu";
          console.log(idName + currentSectionNr);
          break;
        case (1):
          idName = "question";
          console.log(idName + currentSectionNr);
          
          break;
        case (2):
          idName = "quote";
          console.log(idName + currentSectionNr);
          $('#question').addClass('disappear');
            $('#quote').removeClass('hide');
            $('#information').css('pointer-events','none');
            setTimeout(function(){
                $('#question').addClass('hide');
                $('#quote').removeClass('disappear');            
                }, 500);
          break; 
         case (3):
          idName = "introduction";
          console.log(idName + currentSectionNr);
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
          break;
         case (4):
          idName = "game";
          console.log(idName);
          try {
            myp5.refreshCamera();
        } catch (e) {
        }
          
                $('#game').addClass('down');
                $('#introduction').addClass('disappear');
                $('#button-wrapper-intro').removeClass('dont-show');
                $('#button-wrapper-shoot').removeClass('dont-show');
                $('#button-wrapper-gallery').removeClass('dont-show');
                
                setTimeout(function(){
                    
                    $('#introduction').addClass('hide');
                }, 500);
                setTimeout(function(){
                    $('#game-content').removeClass('disappear');
                    $('#button-gallery').removeClass('disappear');
                    $('#button-shoot').removeClass('disappear');
                    $('#button-intro').removeClass('disappear');
                    $('#button-wrapper-camera').addClass('dont-show');
                    $('#button-wrapper-download').addClass('dont-show');
                 }, 1000);
          break;  
         case (5):
          idName = "information";
          console.log(idName);
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
                    $('#gamebar').addClass('dont-show');  
                    $('#button-wrapper-shoot').addClass('dont-show');  
                    $('#button-wrapper-gallery').addClass('dont-show');    
                    $('#button-wrapper-camera').addClass('dont-show');
                    $('#button-wrapper-intro').addClass('dont-show');
                    $('#button-wrapper-download').addClass('dont-show');
                    $('#information').removeClass('disappear');
                    //$('#game').addClass('disappear');
                    $('#gamebar').addClass('hide');
                }, 1000);

          break;
         case (6):
            idName = "menue";
            console.log(idName);
            console.log("zum menu");
                $('#information').addClass('disappear');
                $('svg').addClass('disappear');
                setTimeout(function(){
                    $('#game').removeClass('down');
                    //$('#body-wrapper').css('top','-100vh');
                }, 1000);
                setTimeout(function(){
                    window.location.href = 'menue.html';
                }, 2000);
            break;   
        default:
          console.log("Sorry " + currentSectionNr + ".");
      }
}); 

// Navigation  BACK
$('#button-zurueck').click(function (){
    console.log("second function")
    currentSectionNr = currentSectionNr-1;
    switch (currentSectionNr) {
        case (0):
          idName = "menu";
          console.log(idName);
          $('#question').addClass('disappear');
            $('svg').addClass('disappear');
            setTimeout(function(){
                $('#body-wrapper').css('top','-100vh');
            }, 1000);
            setTimeout(function(){
                window.location.href = 'menue.html';
            }, 2000);
          break;
        case (1):
          idName = "question";
          console.log(idName);
          $('#quote').addClass('disappear');             
            $('#question').removeClass('hide');
            setTimeout(function(){
                $('#quote').addClass('hide');
                $('#question').removeClass('disappear');
            }, 700);
          break;
        case (2):
          idName = "quote";
          console.log(idName);
          $('#introduction').addClass('disappear');
                $('#quote').removeClass('hide');
                setTimeout(function(){
                    $('#introduction').addClass('hide'); $('#quote').removeClass('disappear');
                    $('#body-wrapper').css('background-color','white');
                    $('path').css('stroke','#7822F0');
                    $('circle').css('stroke','#7822F0');
                    $('line').css('stroke','#7822F0');
                }, 500); 
          break; 
         case (3):
          idName = "introduction";
          console.log(idName);
          myp5.refreshCamera()
            $('#button-gallery').addClass('disappear');
            $('#button-shoot').addClass('disappear');
            $('#button-intro').addClass('disappear');
            $('#button-camera').addClass('disappear');
            $('#button-download').addClass('disappear');
            $('#gamebar').addClass('disappear');
            $('#game-content').addClass('disappear');
            setTimeout(function(){
                
                $('#introduction').removeClass('hide');

                
                $('#button-wrapper-gallery').addClass('dont-show');
                $('#button-wrapper-camera').addClass('dont-show');
                $('#button-wrapper-shoot').addClass('dont-show');
                $('#button-wrapper-intro').addClass('dont-show');
                $('#button-wrapper-download').addClass('dont-show');
                
                
            }, 500);
            setTimeout(function(){
                $('#game').removeClass('down');
                $('#introduction').removeClass('disappear');
            }, 1000); 
          break;
         case (4):
          idName = "game";
          console.log(idName);
          //myp5.newCapture();
        
           //$('#button-wrapper-camera').removeClass('dont-show');
           $('#button-wrapper-intro').removeClass('dont-show');
           $('#button-wrapper-shoot').removeClass('dont-show');
           $('#button-wrapper-gallery').removeClass('dont-show');
           //$('#button-wrapper-download').removeClass('dont-show');
           $('#information').addClass('disappear');
           $('#gamebar').addClass('hide');
           setTimeout(function(){      
               $('#information').addClass('hide'); 
               console.log("trying to work");
               $('#game-content').removeClass('disappear');
               $('#gamebar').removeClass('disappear');
               $('#button-camera').removeClass('disappear');
               $('#button-intro').removeClass('disappear');
               $('#button-download').removeClass('disappear');
               $('#button-shoot').removeClass('disappear');
               $('#button-gallery').removeClass('disappear');
               $('#button-stamp').removeClass('disappear');
               $('#game').css('background-color','rgba(30, 30, 30, 1)');
               $('#information').css('pointer-events','none');
           }, 1000);
          break;  
         case (5):
          idName = "information";
          console.log(idName);
          
          break;  
        default:
          
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
            $('#game-content').removeClass('disappear');
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
        $('#game-content').addClass('disappear');
        $('#button-zurueck').addClass('disappear');
        $('#button-gallery').addClass('disappear');
        $('#button-shoot').addClass('disappear');
        $('#button-intro').addClass('disappear');
        $('#button-weiter').addClass('disappear');
        $('#button-stamp').addClass('disappear');
        setTimeout(function(){      
            $('#button-wrapper-zurueck').addClass('dont-show');
            $('#button-wrapper-select').removeClass('dont-show');
            $('#button-wrapper-zurueck-from-gallery').removeClass('dont-show');
        }, 750);
        setTimeout(function(){      
            $('#button-wrapper-weiter').addClass('dont-show');
            $('#button-zurueck-from-gallery').removeClass('disappear');
            $('#button-select').removeClass('disappear');
            $('#gamebar').addClass('hide');
        }, 1000);
    }); 

    // Text ausklappen
        
    $('#button-mehr').click(function (){
        
        $('.text-info-small').css('display','block');
        $('#button-mehr').css('display','none');
    });

});
