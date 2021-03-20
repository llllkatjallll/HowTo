$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);


/* Random Anzeige-Bild im Launch Screen */

    var img_name = new Array("img/background-1.jpg", "img/background-2.jpg", "img/background-3.jpg");
    var l = img_name.length;
    var rnd_no = Math.floor(l*Math.random());
    document.getElementById("launch-background").src = img_name[rnd_no];

/* Launch Screen automatisch ausblenden lassen */
          
        setTimeout(function(){
            $('#launch').css('top','-100vh');        
            $('#launch-image').css('top','-100vh');        
        }, 1000);   
        setTimeout(function(){
            $('#launch').css('z-index', '0');
            $('#launch-image').css('z-index', '0');
        }, 2600);

/* Intro Overlay einblenden */
        
setTimeout(function(){
    $('#intro-wrapper').removeClass('hide');
    $('#intro').addClass('turn-animation');
    $('#intro-wrapper').css('background-color','rgba(0, 0, 0, 0.2)');
 }, 2500); 
setTimeout(function(){
    $('#intro').removeClass('turn');
}, 3500);    
setTimeout(function(){
    $('#intro').removeClass('turn-animation');
}, 4000);    
 
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

    $('#enzweiler').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'enzweiler.html';
        }, 1000);
      });
    
    $('#raum').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'raum.html';
        }, 1000);
      });
    
    $('#rhythmus').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'rhythmus.html';
        }, 1000);
      });
    
    $('#interaktion').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'interaktion.html';
        }, 1000);
      });
    
    $('#stadt-raum').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'stadt-raum.html';
        }, 1000);
      });
    
    $('#komposition').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = 'komposition.html';
        }, 1000);
      });
    
    $('#app').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            window.location.href = 'app.html';
        }, 10);
    });
    
});    
