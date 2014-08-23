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
})