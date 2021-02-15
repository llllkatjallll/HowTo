$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
/* Screen orientation lock to portrait     
    
    var myScreenOrientation = window.screen.orientation;
    
    myScreenOrientation.lock("portrait");
    myScreenOrientation.unlock(); */

/* Launch Screen automatisch ausblenden lassen */    
    
    setTimeout(function(){
        $('#launch').css('left','-100vw');        
    }, 1000);   
    
    setTimeout(function(){
        $('#launch').css('z-index', '0');
    }, 2000);   
    
    
/* Intro AlertBox automatisch einblenden */    

    setTimeout(function(){
       $("#alertBox").css("animation-play-state", "running");
    }, 2500); 
    setTimeout(function(){
        $('#alertBox').removeClass('turn');
    }, 3500);     
    
    $('#button-alertBox').click(function (){
        $("#intro").css("animation-play-state", "running");
        $('#alertBox').css('box-shadow','clear')
        setTimeout(function(){
            $('#intro').css('z-index', '0');
            $('#intro').addClass('turnBack');
        }, 1000);
        setTimeout(function(){
        }, 2000);
    }); 

    
/* Navigation zu Unterseiten */    

    $('#enzweiler').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "enzweiler.html";
        }, 2000);
      });
    
    $('#raum').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "raum.html";
        }, 2000);
      });
    
    $('#rhythmus').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "rhythmus.html";
        }, 2000);
      });
    
    $('#interaktion').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "interaktion.html";
        }, 2000);
      });
    
    $('#oeffentlicher-raum').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "oeffentlicher-raum.html";
        }, 2000);
      });
    
    $('#komposition').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "komposition.html";
        }, 2000);
      });
    
    $('#app').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "app.html";
        }, 2000);
      });
    
// Navigation in Part 1    
   
    $('#weiter').click(function (){
         if ($(('question').classList.contains('disappear')) = false){
                $('#question').addClass('disappear');
            $('#quote').removeClass('hide');
            setTimeout(function(){
                $('#question').addClass('hide');
                $('#quote').removeClass('disappear');            
                }, 1000);
            }
            else if (($('quote').classList.contains('disappear')) = false){
                $('#quote').addClass('disappear');
                $('#introduction').removeClass('hide');
                setTimeout(function(){
                    $('#quote').addClass('hide');
                    $('#introduction').removeClass('disappear');
                }, 1000);
            }
            else if (($('information').classList.contains('disappear')) = false){
                $('#quote').addClass('disappear');
                $('#introduction').removeClass('hide');
                setTimeout(function(){
                    $('#quote').addClass('hide');
                    $('#introduction').removeClass('disappear');
                }, 1000);
            }
       });                
  
    $('#zurueck').click(function (){
        $('#quote').addClass('disappear');            $('#question').removeClass('hide');
        setTimeout(function(){
            $('#quote').addClass('hide');
            $('#question').removeClass('disappear');
        }, 1000); 

    }); 
    
});


                  