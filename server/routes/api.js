var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');


router.get('/exercises', function(req, res, next) {
  Exercise.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


router.get('/exercise/:id', function(req, res, next) {
  Exercise.findById(req.params.id, function (err, data){
     if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


router.post('/exercises', function(req, res, next) {
  newExercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags
  });
  console.log(newExercise);
  newExercise.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({"SUCCESS": data});
    }
  });
});


router.put('/exercise/:id', function(req, res, next) {
  var update = {
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags
  };
  var options = {new: true};
  Exercise.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'UPDATED' : data});
    }
  });
});


router.delete('/exercise/:id', function (req, res, next) {
  Exercise.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      res.json ({'message': err});
    } else {
      res.json({'REMOVED' :data});
    }
  });
});


module.exports = router;
