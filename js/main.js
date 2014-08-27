$(document).ready(function () {
    $(".primary-btn").click(function () {
        $(".primary-btn").addClass("active");
        $(".runoff-btn").removeClass("active");
        $("#primary").css("display", "block");
        $("#runoff").css("display", "none");
    });
    $(".runoff-btn").click(function () {
        $(".runoff-btn").addClass("active");
        $(".primary-btn").removeClass("active");
        $("#primary").css("display", "none");
        $("#runoff").css("display", "block");
    });
    $("#importance").click(function () {
        $('#importancediv').css('display', 'block');
        //$(this).next('#importancediv').stop().show('slide', {direction: 'down'}, 1400);
    });
    //$('#blackout').show();
/*$('#blackout').click(function() {
    $('#blackout').css("display", "block")
});*/

// This code will show and hide the iframes
// Primaries
$('.liccardo-pri-btn').click(function() {
    $('iframe').hide();
    $('iframe.liccardo-pri').show();
    var name = 'Licarrdo';
    var pri_total = '1.2m';
    var pri_contrib = '1k';
    var pri_per = '20%';
    $( "h2" ).html(name);
    $( "h3" ).html(pri_total);
    $( "h4" ).html(pri_contrib);
    $( "h5" ).html(pri_per);

});

$('.nguyen-pri-btn').click(function() {
    $('iframe').hide();
    $('iframe.nguyen-pri').show();
    var name = 'Nguyen';
    var pri_total = '800k';
    var pri_contrib = '1.3k';
    var pri_per = '5%';
    $( "h2" ).html(name);
    $( "h3" ).html(pri_total);
    $( "h4" ).html(pri_contrib);
    $( "h5" ).html(pri_per);
    
});

$('.cortese-pri-btn').click(function() {
    $('iframe').hide();
    $('iframe.cortese-pri').show();
    var name = 'Cortese';
    var pri_total = '1.12m';
    var pri_contrib = '1.1k';
    var pri_per = '15%';
    $( "h2" ).html(name);
    $( "h3" ).html(pri_total);
    $( "h4" ).html(pri_contrib);
    $( "h5" ).html(pri_per);
});

$('.oliverio-pri-btn').click(function() {
    $('iframe').hide();
    $('iframe.oliverio-pri').show();
    var name = 'Oliverio';
    var pri_total = '500k';
    var pri_contrib = '500';
    var pri_per = '1%';
    $( "h2" ).html(name);
    $( "h3" ).html(pri_total);
    $( "h4" ).html(pri_contrib);
    $( "h5" ).html(pri_per);
});

$('.herrera-pri-btn').click(function() {
    $('iframe').hide();
    $('iframe.herrera-pri').show();
    var name = 'Herrera';
    var pri_total = '$200';
    var pri_contrib = '750';
    var pri_per = '2%';
    $( "h2" ).html(name);
    $( "h3" ).html(pri_total);
    $( "h4" ).html(pri_contrib);
    $( "h5" ).html(pri_per);
});

//Run offs
})
