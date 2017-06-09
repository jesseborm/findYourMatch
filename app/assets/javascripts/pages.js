
var today = jsDateToIso(new Date());

$(document).ready(function() {
  var date = today;
  createTable(date);

  // $('.pick-a-date').('click', getDates);

  $('.view-btn').on('click', showViewPairsForm);
  $('.select-btn').on('click', showSelectPairsForm);
  $('#prev-date').on('click', function() {
    date = previousDay(date);
    createTable(date);
  });
  $('#next-date').on('click', function() {
    date = nextDay(date);
    createTable(date);
  });
  $('#assign-matches').on('click', function(event) {
    event.preventDefault();

    var dates = $('input[id=form-2]').val();

    assignPairsForDates(dates);
  });

  $('#display-matches').on('click', function(event) {
    event.preventDefault();
    var input = $('input[id=form-1]').val();
    if (input !== '') {
      date = new Date(input);
      createTable(date);
    }
    $('#view-pair-form').slideUp(350);
    $('input[id=form-1]').val(null);
  });
});


function getDates() {
  $.ajax({
    type: 'GET',
    url: '/clusters/preselected_dates',
    dataType: 'json'
  })
  .done(function(data) {
    // debugger;
    return data;
  })
};


function previousDay(date) {
  date = new Date(date);
  date -= 86400000;
  date = jsDateToIso(new Date(date));
  return date;
}

function nextDay(date) {
  date = new Date(date);
  date = date.valueOf() + 86400000;
  date = jsDateToIso(new Date(date));
  return date;
}

function assignPairsForDates(dates) {
  $('#select-pair-form').slideUp(350);
  $('input[id=form-2]').val(null);

  $.ajax({
    type: 'POST',
    url: '/clusters/assign_by_dates',
    data: JSON.stringify({
      dates: dates
    }),
    contentType: 'application/json',
    dataType: 'json'
  })
  .done(function(data) {
    if (data.length === 1) {
      createTable(data[0]);
    }
  })
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

  prettyDate = beautyDate(date);

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
  var text = $('<h3 class="pair-row"></h3').text("No matches for this day");
  var button = $('<button type="button" class="btn btn-primary gen-for-date pair-row"></button>')
    .text('Generate matches for this day').attr('data-date', date);
  $('#pairs-for-day').append(text).append(button);

  $('.gen-for-date').on('click', function() {
    date = ($('.gen-for-date').data('date'));
    assignPairsForDates(date);
  });
}

function showViewPairsForm() {
  $('#view-pair-form').slideDown(350);
  $('#view-pair-form').css("display", "block");
  $('#select-pair-form').slideUp(350);
};

function showSelectPairsForm() {
  $('#select-pair-form').slideDown(350);
  $('#select-pair-form').css("display", "block");
  $('#view-pair-form').slideUp(350);
};

function beautyDate(date) {
  date = new Date(date);
  var wday = date.getDay();
  var mday = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  var wdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  wday = wdays[wday];

  var tdy = new Date();
  if (tdy.getDate() === mday && tdy.getMonth() === month && tdy.getFullYear() === year) {
    prettyDate = "today";
  } else if (tdy.getDate() === mday - 1 && tdy.getMonth() === month && tdy.getFullYear() === year) {
    prettyDate = "tomorrow";
  } else if (tdy.getDate() === mday + 1 && tdy.getMonth() === month && tdy.getFullYear() === year) {
    prettyDate = "yesterday";
  }  else {
    prettyDate = wday + ", " + mday + "-" + (month + 1) + "-" + year;
  }
  return prettyDate;
}

function jsDateToIso(jsDate) {
  return jsDate.toISOString().substr(0, 10);
}
