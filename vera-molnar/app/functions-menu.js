$(document).ready(function (){

    // Get innerHeight für vh  
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Button-Transition

    $('.text-button').click(function(){
        $(this).addClass('button-clicked');
        setTimeout(function(){
            $('.text-button').removeClass('button-clicked');
        }, 600);       
    });
    
    // Transition Start
    $('.section-first').removeClass('hidden');

    //Navigation zu Unterseiten
    $('#molnar').click(function (){   
        $('#molnar').addClass('top-position');
        $('.section-first').not('#molnar').addClass('hidden');
        setTimeout(function() {
            $('.dropdown-menu').addClass('opacity-zero');
        }, 1100);
        setTimeout(function() {
            window.location.href = 'molnar.html';
        }, 1200);
    });  

    $('#trace').click(function (){   
        $('#trace').addClass('top-position');
        $('.section-first').not('#trace').addClass('hidden');
        setTimeout(function() {
            $('#trace-quote').removeClass('hidden');
        }, 300);
        setTimeout(function() {
            $('.dropdown-menu').addClass('opacity-zero');
        }, 1100);
        setTimeout(function() {
            window.location.href = 'trace.html';
        }, 1500);
    });  

    $('#character').click(function (){   
        $('#character').addClass('top-position');
        $('.section-first').not('#character').addClass('hidden');
        setTimeout(function() {
            $('#character-quote').removeClass('hidden');
        }, 500);
        setTimeout(function() {
            $('.dropdown-menu').addClass('opacity-zero');
        }, 1100);
        setTimeout(function() {
            window.location.href = 'character.html';
        }, 1500);
    });  

    $('#coincidence').click(function (){   
        $('#coincidence').addClass('top-position');
        $('.section-first').not('#coincidence').addClass('hidden');
        setTimeout(function() {
            $('#coincidence-quote').removeClass('hidden');
        }, 500);
        setTimeout(function() {
            $('.dropdown-menu').addClass('opacity-zero');
        }, 1100);
        setTimeout(function() {
            window.location.href = 'coincidence.html';
        }, 1500);
    });  

    $('#disorder').click(function (){   
        $('#disorder').addClass('top-position');
        $('.section-first').not('#disorder').addClass('hidden');
        setTimeout(function() {
            $('#disorder-quote').removeClass('hidden');
        }, 500);
        setTimeout(function() {
            $('.dropdown-menu').addClass('opacity-zero');
        }, 1100);
        setTimeout(function() {
            window.location.href = 'disorder.html';
        }, 1500);
    });  

    $('#magic').click(function (){   
        $('#magic').addClass('top-position');
        $('.section-first').not('#magic').addClass('hidden');
        setTimeout(function() {
            $('#magic-quote').removeClass('hidden');
        }, 500);
        setTimeout(function() {
            $('.dropdown-menu').addClass('opacity-zero');
        }, 1100);
        setTimeout(function() {
            window.location.href = 'magic.html';
        }, 1500);
    });  

    $('#app').click(function (){   
        $('#app').addClass('top-position');
        $('.section-first').not('#app').addClass('hidden');
        setTimeout(function() {
            $('.dropdown-menu').addClass('opacity-zero');
        }, 1100);
        setTimeout(function() {
            window.location.href = 'app.html';
        }, 1500);
    });  

    $('#back-to-menu').click(function (){
        $('.section-wrapper').css('height', '120vh');
        $('.section-wrapper').animate({top: '-120vh'});
        setTimeout(function() {
            window.location.href = 'menu.html';
        }, 1200);
    });

});    
