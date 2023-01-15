$(document).ready(function (){

    // Get innerHeight für vh  
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    
    // Transition Start
    $('.section-first').removeClass('hidden');

    //Navigation zu Unterseiten
    $('#molnar').click(function (){   
        $('#molnar').css('top','1.5em');
        $('.section-first').not('#molnar').addClass('hidden');
        setTimeout(function() {
            window.location.href = 'molnar.html';
        }, 1200);
    });  

    $('#trace').click(function (){   
        $('#trace').css('top','1.5em');
        $('.section-first').not('#trace').addClass('hidden');
        setTimeout(function() {
            $('#trace-quote').removeClass('hidden');
        }, 300);
        setTimeout(function() {
            window.location.href = 'trace.html';
        }, 1500);
    });  

    $('#character').click(function (){   
        $('#character').css('top','1.5em');
        $('.section-first').not('#character').addClass('hidden');
        setTimeout(function() {
            $('#character-quote').removeClass('hidden');
        }, 500);
        setTimeout(function() {
            window.location.href = 'character.html';
        }, 1500);
    });  

    $('#coincidence').click(function (){   
        $('#coincidence').css('top','1.5em');
        $('.section-first').not('#coincidence').addClass('hidden');
        setTimeout(function() {
            $('#coincidence-quote').removeClass('hidden');
        }, 500);
        setTimeout(function() {
            window.location.href = 'coincidence.html';
        }, 1500);
    });  

    $('#disorder').click(function (){   
        $('#disorder').css('top','1.5em');
        $('.section-first').not('#disorder').addClass('hidden');
        setTimeout(function() {
            $('#disorder-quote').removeClass('hidden');
        }, 500);
        setTimeout(function() {
            window.location.href = 'disorder.html';
        }, 1500);
    });  

    $('#magic').click(function (){   
        $('#magic').css('top','1.5em');
        $('.section-first').not('#magic').addClass('hidden');
        setTimeout(function() {
            $('#magic-quote').removeClass('hidden');
        }, 500);
        setTimeout(function() {
            window.location.href = 'magic.html';
        }, 1500);
    });  

    $('#app').click(function (){   
        $('#app').css('top','1.5em');
        $('.section-first').not('#app').addClass('hidden');
        setTimeout(function() {
            window.location.href = 'app.html';
        }, 1500);
    });  

});    
