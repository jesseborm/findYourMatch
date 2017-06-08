// $('#new-pair-form').css("display", "block");


$(document).ready(function() {
  // debugger;

  $('.clickadyclick').on('click', function() {
    // event.preventDefault();
    // debugger;

    $('#new-pair-form').slideDown(350);
    $('#new-pair-form').css("display", "block");

  });
});
