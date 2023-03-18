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
    
    // Animation

    setTimeout(function(){
        $('#launchscreen-wrapper').css('color','#FBF6F0');
        $('#square-1').animate({top:'-100vw', left:'-55'});
        $('#square-1').css('transform','rotate(37deg)');
        $('#square-2').animate({top:'-100vw', left:'0'});
        $('#square-2').css('transform','rotate(60deg)');
        $('#square-3').animate({top:'-100vw', left:'120vw'});
        $('#square-3').css('transform','rotate(40deg)');
        $('#square-4').animate({top:'45vw', left:'120vw'});
        $('#square-4').css('transform','rotate(50deg)');
        $('#square-5').animate({top:'70vw', left:'-100vw'});
        $('#square-5').css('transform','rotate(-40deg)');
        $('#square-6').animate({top:'100vh', left:'-100vw'});
        $('#square-6').css('transform','rotate(55deg)');
        $('#square-7').animate({top:'100vh', left:'100vw'});
        $('#square-7').css('transform','rotate(37deg)');
        $('#launchscreen-wrapper').css('color','#FBF6F0');
    }, 1900);

    setTimeout(function(){
            $('#start-info').css('opacity','1');
            $('#start-info').css('z-index','9999999');
            $('#launchscreen-wrapper').css('opacity','0');
    }, 3500);

    $('#button-start').click(function (){ 
        $('#start-info').css('opacity','0');
        setTimeout(function() {
            window.location.href = 'menu.html';
        }, 1000);
    
    })

});
