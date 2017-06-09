// $('#new-pair-form').css("display", "block");


$(document).ready(function() {
  // debugger;
  var date = $('.today').data('date');
  createTable(date);

  $('.clickadyclick').on('click', showSelectPairsForm);
  $('.clackadyclock').on('click', showViewPairsForm);
  $('#prev-date').on('click', function() {
    date = previousDay(date);
    createTable(date);
  });
  $('#next-date').on('click', function() {
    date = nextDay(date);
    createTable(date);
  });
  $('#assign-matches').on('click', assignPairsForDates);

  $('#display-matches').on('click', function(event) {
    event.preventDefault();
    createTable($('input[id=form-1]').val());
  });
});

function previousDay(date) {
  date = new Date(date);
  date -= 86400000;
  date = new Date(date);
  return date;
}

function nextDay(date) {
  date = new Date(date);
  date = date.valueOf() + 86400000;
  date = new Date(date);
  return date;
}

function assignPairsForDates(event) {
  event.preventDefault();

  var dates = $('input[id=form-2]').val();

  $.ajax({
    type: 'POST',
    url: '/clusters/assign_by_dates',
    data: JSON.stringify({
      dates: dates
    }),
    contentType: 'application/json',
    dataType: 'json'
  })
  .done()

};


function createTableRow(pair_id) {
  $.ajax({
    type: 'POST',
    url: '/users/get_by_pair',
    data: JSON.stringify({
      id: pair_id
    }),
    contentType: 'application/json',
    dataType: 'json'
  })
  .done(function(data) {
    var first_user = $('<td></td>')
      .html(data[0].email);

    var second_user = $('<td></td>')
      .html(data[1].email);

    var tableRow = $('<tr class="pair-row">')
      .attr('data-id', pair_id)
      .append(first_user)
      .append(second_user)
      .append($('</tr>'));

    $('#pairs-for-day').append(tableRow);
  })
}

function createTable(date) {

  $('#table-header').text("Pairs for: " + date);
  $('.pair-row').remove();

  $.ajax({
    type: 'POST',
    url: '/pairs/get_by_date',
    data: JSON.stringify({
      day: date
    }),
    contentType: 'application/json',
    dataType: 'json'
  })
  .done(function (data) {
    for(var i=0; i < Object.keys(data).length; i++) {
      createTableRow(data[i].id);
    }
  })
}

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
