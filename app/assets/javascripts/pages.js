// $('#new-pair-form').css("display", "block");

var today = new Date();

$(document).ready(function() {
  // debugger;
  var date = today;
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

  prettyDate = formatDate(date);

  $('#table-header').text("Pairs for: " + prettyDate);
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
    if (data.length === 0) {
      noMatches(date);
    } else {
      for(var i=0; i < Object.keys(data).length; i++) {
        createTableRow(data[i].id);
      }
    }
  })
}

function noMatches(date) {
  var text = $('<h3></h3').text("No matches for this day");
  var button = $('<button type="button" class="btn btn-primary gen-for-date"></button>')
    .text('Generate matches for this day');
  $('#pairs-for-day').append(text).append(button);
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

function formatDate(date) {
  date = new Date(date);
  var wday = date.getDay();
  var mday = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var wdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  wday = wdays[wday-1];
  if (today.getDate() === mday && today.getMonth() === month && today.getFullYear() === year) {
    prettyDate = "today";
  } else if (today.getDate() === mday - 1 && today.getMonth() === month && today.getFullYear() === year) {
    prettyDate = "tomorrow";
  } else if (today.getDate() === mday + 1 && today.getMonth() === month && today.getFullYear() === year) {
    prettyDate = "yesterday";
  }  else {
    prettyDate = wday + ", " + mday + "-" + month + "-" + year;
  }
  return prettyDate;
}
