$(document).ready(function () {
    $(".primary-btn").click(function () {
        $("#tabs li").removeClass("active");
        $(".primary-btn").addClass("active");
        $(".candidate-gp").css("display", "none");
        $("#primary").css("display", "block");
        map.renderContributions('primary','cortese', '2014-06-05');
        var name = 'Cortese';
        var total = '930k';
        var contrib = '3.2k';
        var percent = '48%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);

    });
    $(".runoff-btn").click(function () {
        $("#tabs li").removeClass("active");
        $(".runoff-btn").addClass("active");
        $(".candidate-gp").css("display", "none");
        $("#runoff").css("display", "block");
        map.renderContributions('runoff','cortese', '2014-09-24');
        var name = 'Cortese';
        var total = '1.13m';
        var contrib = '4.1k';
        var percent = '49%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);
    });
    $(".pac-btn").click(function () {
        $("#tabs li").removeClass("active");
        $(".pac-btn").addClass("active");
        $(".candidate-gp").css("display", "none");
        $("#pac").css("display", "block");
        map.renderContributions('pac','cortese', '2014-08-01');
        var name = 'Pacs Supporting Cortese';
        var total = 'x.m';
        var contrib = 'x.k';
        var percent = 'x%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);

    });
    // On start up show the About screen
    $("#blackout").css('display', 'block');
    $("#about").css('display', 'block');
    $("#blackout").click(function () {
        $("#blackout").css("display", "none");
        //$(".modal").css("display", "none");
    });
    // $(".importance-btn").click(function () {
    //     $("#blackout").css("display", "block");
    //     $(".modal").css("display", "none");
    //     $("#importance-div").css("display", "block");
    // });
    // $(".whats-a-pac-btn").click(function () {
    //     $("#blackout").css("display", "block");
    //     $(".modal").css("display", "none");
    //     $("#whats-a-pac-div").css("display", "block");
    // });
    $(".directions-btn").click(function () {
        $("#blackout").css("display", "block");
        $(".modal").css("display", "none");
        $("#about-div").css("display", "block");
    });
    $(".csj-btn").click(function () {
        $("#blackout").css("display", "block");
        $(".modal").css("display", "none");
        $("#csj-div").css("display", "block");
    });
    $(".process-btn").click(function () {
        $("#blackout").css("display", "block");
        $(".modal").css("display", "none");
        $("#process-div").css("display", "block");
    });

// This code will show and hide the iframes
// Primaries
    $('.liccardo-pri-btn').click(function() {
        map.renderContributions('primary','liccardo', '2014-06-05');
        var name = 'Liccardo';
        var total = '1.2m';
        var contrib = '3.2k';
        var percent = '55%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);
    });

    $('.cortese-pri-btn').click(function() {
        map.renderContributions('primary','cortese', '2014-06-05');
        var name = 'Cortese';
        var total = '930k';
        var contrib = '3.2k';
        var percent = '48%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);
    });

    $('.nguyen-pri-btn').click(function() {
        map.renderContributions('primary','nguyen', '2014-06-05');
        var name = 'Nguyen';
        var total = '473k';
        var contrib = '1.7k';
        var percent = '21%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);
    });

    $('.oliverio-pri-btn').click(function() {
        map.renderContributions('primary','oliverio', '2014-06-05');
        var name = 'Oliverio';
        var total = '161k';
        var contrib = '381';
        var percent = '29%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);
    });

    $('.herrera-pri-btn').click(function() {
        map.renderContributions('primary','herrera', '2014-06-05');
        var name = 'Herrera';
        var total = '$115k';
        var contrib = '179';
        var percent = '46%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);
    });

    //Run offs
    $('.liccardo-run-btn').click(function() {
        map.renderContributions('runoff','liccardo', '2014-09-24');
        var name = 'Liccardo';
        var total = '1.24m';
        var contrib = '3.2k';
        var percent = '55%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);

    });

    $('.cortese-run-btn').click(function() {
        map.renderContributions('runoff','cortese', '2014-09-24');
        var name = 'Cortese';
        var total = '1.13m';
        var contrib = '4.1k';
        var percent = '49%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);
    });

    //PACs
    $('.liccardo-pac-btn').click(function() {
        map.renderContributions('pac','liccardo', '2014-08-01');
        var name = 'Pacs Supporting Licarrdo';
        var total = 'x.m';
        var contrib = 'xk';
        var percent = 'x%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);

    });

    $('.cortese-pac-btn').click(function() {
        map.renderContributions('pac','cortese', '2014-08-01');
        var name = 'Pacs Supporting Cortese';
        var total = 'x.m';
        var contrib = 'x.k';
        var percent = 'x%';
        $( "h2" ).html(name);
        $( "h3" ).html(total);
        $( "h4" ).html(contrib);
        $( "h5" ).html(percent);
    });
})
