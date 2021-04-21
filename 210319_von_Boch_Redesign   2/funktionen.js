$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);


/* Random Anzeige-Bild im Launch Screen */

    var img_name = new Array("img/background-1.jpg", "img/background-2.jpg", "img/background-3.jpg", "img/background-4.jpg");
    var l = img_name.length;
    var rnd_no = Math.floor(l*Math.random());
    document.getElementById("launch-background").src = img_name[rnd_no];

/* Launch Screen automatisch ausblenden lassen */

    $('#launch').removeClass('opacity-zero');
    $('#launch-image').removeClass('opacity-zero');
    $('#menue').removeClass('opacity-zero');

setTimeout(function(){
    $('#launch').css('top','-100vh');        
    $('#launch-image').css('top','-100vh');   
    $('body').css('background-color','#7822F0');     
}, 1800);   

setTimeout(function(){
    $('#launch').css('z-index', '0');
    $('#launch-image').css('z-index', '0');
}, 3400);

/* Intro Overlay einblenden */

setTimeout(function(){
    $('#intro-wrapper').removeClass('hide');
    $('#intro').addClass('turn-animation');
    $('#intro-wrapper').css('background-color','rgba(0, 0, 0, 0.2)');
    }, 4300); 
    setTimeout(function(){
    $('#intro').removeClass('turn');
    }, 4800);    
    setTimeout(function(){
    $('#intro').removeClass('turn-animation');
}, 5300);    

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

/* Navigation zu Unterseiten */    

    $('#boch').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'boch.html';
        }, 1000);
      });
    
    $('#natur').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'natur.html';
        }, 1000);
      });
    
    $('#licht').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'licht.html';
        }, 1000);
      });
    
    $('#ordnung').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'ordnung.html';
        }, 1000);
      });
    
    $('#experiment').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'experiment.html';
        }, 1000);
      });
    
    $('#app').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            window.location.href = 'app.html';
        }, 10);
    });
    
});    
