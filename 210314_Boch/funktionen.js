$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

/* Launch Screen automatisch ausblenden lassen */            
        setTimeout(function(){
            $('#launch').css('left','-100vw');        
        }, 1000);   
        setTimeout(function(){
            $('#launch').css('z-index', '0');
        }, 2000);   

/* Intro AlertBox automatisch einblenden */
        
        setTimeout(function(){
           $('#alertBox').css('animation-play-state', 'running');
        }, 2500); 
        setTimeout(function(){
            $('#alertBox').removeClass('turn');
        }, 3500);     

        $('#okay').click(function (){
            $('#intro').css('animation-play-state', 'running');
            $('#alertBox').css('box-shadow','clear')
            setTimeout(function(){
                $('#intro').css('z-index', '0');
                $('#intro').addClass('turnBack');
            }, 500);
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
