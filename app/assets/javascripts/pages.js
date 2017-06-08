// $('#new-pair-form').css("display", "block");


$(document).ready(function() {
  // debugger;
  var date = $('.today').data('date');
  var today = date;

  $.ajax({
    type: 'POST',
    url: '/pairs/get_by_date',
    data: JSON.stringify({
      day: date
    }),
    contentType: 'application/json',
    dataType: 'json'
  })
  .done(function(data) {
    for(var i=0; i < Object.keys(data).length; i++) {
      var id = data[i].id;
      console.log(id);
      $.ajax({
        type: 'POST',
        url: '/users/get_by_pair',
        data: JSON.stringify({
          id: id
        }),
        contentType: 'application/json',
        dataType: 'json'
      })
      .done(function(data) {
        console.log(data[0].email);
        console.log(data[1].email);
      })
    }
  })

  $('.clickadyclick').on('click', showSelectPairsForm);
  $('.clackadyclock').on('click', showViewPairsForm);
  $('.glyphicon-chevron-right').on('click', displayNextAssignedPair);


});


function showViewPairsForm() {
  $('#view-pair-form').slideDown(350);
  $('#view-pair-form').css("display", "block");
};

function showSelectPairsForm() {
  $('#select-pair-form').slideDown(350);
  $('#select-pair-form').css("display", "block");
};

function displayNextAssignedPair() {
  $('#cluster-day')

};
