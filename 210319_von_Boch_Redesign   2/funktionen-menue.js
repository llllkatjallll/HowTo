$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    $('#menue').removeClass('opacity-zero');
    
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
