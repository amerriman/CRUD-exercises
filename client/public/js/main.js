$(document).on('ready', function() {

});

//get all the data from the form
$('form').on('submit', function(e){
  e.preventDefault();

  $('#message').html('');

  var payload = {
    name: $('#name').val(),
    description: $('#description').val(),
    tags: $('#tags').val()
  };
console.log(payload)
  $.post('/api/exercises', payload, function(data){
    $('#message').html('Exercise created!');
    $('#name').val("");
    $('#description').val("");
    $('#tags').val("");
  });

  listExercises();

});


function listExercises(){
  $('#exercise-list').html("");
  $.get('/api/exercises', function(data){
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $('#exercise-list').append("<tr>"+"<td>"+data[i].name+"</td><td>"+data[i].description+"</td><td>"+data[i].tags+"</td>" + '<td><a class="btn btn-danger btn-xs delete-button" id="'+data[i]._id+'" role="button">Delete</a>'+ '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="'+data[i]._id+'" role="button">Edit</a></td>'+
        "</tr>");
    }
  });
}
