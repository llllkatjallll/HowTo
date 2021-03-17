$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    $('#menue').removeClass('opacity-zero');
    
/* Navigation zu Unterseiten */    

    $('#enzweiler').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "enzweiler.html";
        }, 2000);
      });
    
    $('#natur').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "natur.html";
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
    
    $('#stadt-raum').click(function (){   
        $(this).addClass('li-activated');
        setTimeout(function() {
            $(this).removeClass('li-activated');
            window.location.href = "stadt-raum.html";
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
});    
