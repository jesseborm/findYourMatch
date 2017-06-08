$(document).ready(function() {

  var buttons = $('.knop');

  buttons.on('click', function() {
    // debugger;
    var choice = this.innerText;
    var tableRow = $(this).parent().parent().parent();
    var user_id = tableRow.data('id');

    $.ajax({
      type: 'PUT',
      url: '/users/set_role',
      data: JSON.stringify({
        choice: choice,
        id: user_id
      }),
      contentType: 'application/json',
      dataType: 'json'
    });
  });
});
