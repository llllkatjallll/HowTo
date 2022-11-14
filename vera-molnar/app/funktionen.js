$(document).ready(function (){
    
// Get innerHeight für vh   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

// Random Anzeige-Bild im Launch Screen 

/*    var img_name = new Array("img/background-1.jpg");
    var l = img_name.length;
    var rnd_no = Math.floor(l*Math.random());
    document.getElementById("launch-background").src = img_name[rnd_no];*/


// Launch Screen automatisch ausblenden lassen 

setTimeout(function(){
    $('#launch').addClass('fade');
}, 1600);   

setTimeout(function(){
    $('#launch').css('z-index', '0');
}, 2800);

// Spiele-Anleitung

$('#icon-bulb-light').click(function() {
    $('#introduction').css('z-index', '200');
    setTimeout(function(){
        $('#introduction').removeClass('fade')
    }, 200);   
    });

$('#button-close').click(function() {
    $('#introduction').addClass('fade');
    setTimeout(function(){
        $('#introduction').css('z-index', '-100');
    }, 600);   
    });


// Navigation zu Unterseiten 

    $('#molnar').click(function (){   
        $('#menu').addClass('fade');
        setTimeout(function() {
            window.location.href = 'trace.html';
        }, 1200);
      });
    
    $('#magic').click(function (){   
        $('#menu').addClass('fade');
        setTimeout(function() {
            window.location.href = 'trace.html';
        }, 1200);
      });
    
    $('#character').click(function (){   
        $('#menu').addClass('fade');
        setTimeout(function() {
            window.location.href = 'trace.html';
        }, 1200);
      });
    
    $('#red').click(function (){   
        $('#menu').addClass('fade');
        setTimeout(function() {
            window.location.href = 'trace.html';
        }, 1200);
      });
    
    $('#disorder').click(function (){   
        $('#menu').addClass('fade');
        setTimeout(function() {
            window.location.href = 'trace.html';
        }, 1200);
      });
    
    $('#trace').click(function (){   
        $('#menu').addClass('fade');
        setTimeout(function() {
            window.location.href = 'trace.html';
        }, 1200);
    });

/* Navigation zu Menü */    

    $('#button-home').click(function (){
        window.location.href = 'menue.html';
    });

    $('#button-help').click(function (){
        window.location.href = 'menue.html';
    });

    $('#button-new').click(function (){
        window.location.href = 'menue.html';
    });

    $('#button-safe').click(function (){
        window.location.href = 'menue.html';
    });
    
    
});    
