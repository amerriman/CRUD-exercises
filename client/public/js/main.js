$(document).on('ready', function() {

});

//get all the data from the form
$('form').on('submit', function(e){
  e.preventDefault();

  $('#message').html('');

  var payload = {
    exercise: $('#exercise').val(),
    description: $('#description').val(),
    tags: $('#tags').val()
  };

  $.post('/exercises', payload, function(data){
    $('#message').html('Exercise created!');
    $('#exercise').val("");
    $('#description').val("");
    $('#tags').val("");
  });

});


