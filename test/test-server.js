process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Exercise = require("../server/models/exercise");

var should = chai.should();
chai.use(chaiHttp);



//HOOK
describe('Exercises', function() {

Exercise.collection.drop();

  beforeEach(function(done){
    var newExercise = new Exercise({
      name: "CSS primer",
      description: "Learn CSS",
      tags: ["CSS"]
    });
    newExercise.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Exercise.collection.drop();
    done();
  });


it('should list ALL exercises on /api/exercises GET', function(done) {
  chai.request(server)
    .get('/api/exercises')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      console.log(res.body, "resbody get all")
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('description');
      res.body[0].should.have.property('tags');
      res.body[0].name.should.equal('CSS primer');
      res.body[0].description.should.equal('Learn CSS');
      res.body[0].tags[0].should.equal('CSS');

      done();
    });
});


it('should list a SINGLE exercise on /api/exercise/<id> GET', function(done) {
    var newExercise = new Exercise({
    name: 'HTML',
    description: 'Build a Webpage',
    tags: ['HTML']
    });
    newExercise.save(function(err, data) {
      chai.request(server)
        .get('/api/exercise/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          console.log(res.body, "resbody get single")
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('tags');
          res.body.name.should.equal('HTML');
          res.body.description.should.equal('Build a Webpage');
          res.body.tags[0].should.equal('HTML');
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });


it('should add a SINGLE exercise on /api/exercises POST', function(done){
    chai.request(server)
    .post('/api/exercises')
    .send({'name': 'CardFlip', 'description': 'Learn CSS', 'tags': ['CSS']})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('description');
      res.body.SUCCESS.should.have.property('tags');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('CardFlip');
      res.body.SUCCESS.description.should.equal('Learn CSS');
      res.body.SUCCESS.tags[0].should.equal('CSS');
      done();
    });
});


it('should update a SINGLE exercise on /api/exercise/<id> PUT', function(done) {
  chai.request(server)
    .get('/api/exercises')
    .end(function(err, res){
      chai.request(server)
        .put('/api/exercise/'+res.body[0]._id)
        .send({'name': 'CSS Card Flip'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          response.body.UPDATED.should.have.property('name');
          response.body.UPDATED.should.have.property('_id');
          response.body.UPDATED.name.should.equal('CSS Card Flip');
          done();
      });
    });
});


it('should delete a SINGLE exercise on /api/exercise/<id> DELETE', function(done) {
  chai.request(server)
    .get('/api/exercises')
    .end(function(err, res){
      chai.request(server)
        .delete('/api/exercise/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('name');
          response.body.REMOVED.should.have.property('_id');
          response.body.REMOVED.name.should.equal("CSS primer");
          done();
      });
    });
});


});
