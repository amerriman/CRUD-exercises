process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Foo = require("../server/models/foo");

var should = chai.should();
chai.use(chaiHttp);



//HOOK
Exercise.collection.drop();

  beforeEach(function(done){
    var newExercise = new Exercise({
      name: "",
      description: "",
      tags: [""]
    });
    newExercise.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Exercise.collection.drop();
    done();
  });
