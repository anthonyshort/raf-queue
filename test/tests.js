var frame = require('../');
var assert = require('assert');

describe('frame-queue', function () {
  var i;

  function increment() {
    i++;
  }

  beforeEach(function () {
    frame.clear();
    i = 0;
  });

  it('should push items onto the queue', function () {
    frame.add(increment);
  });

  it('should not update on this frame', function () {
    frame.add(increment);
    assert(i === 0);
  });

  it('should return a job id', function () {
    var id = frame.add(increment);
    assert(id === 0);
  });

  it('should run them in order', function (done) {
    frame.add(increment);
    frame.add(function(){
      assert(i === 1);
      done();
    });
  });

  it('should clear any queued jobs', function (done) {
    frame.add(increment);
    frame.clear();
    frame.defer(function(){
      assert(i === 0);
      done();
    });
  });

  it('should defer a function', function (done) {
    frame.add(increment);
    frame.defer(function(){
      assert(i === 1);
      done();
    });
  });

  it('should only call the deferred function one', function (done) {
    frame.defer(function(){
      i++;
      frame.defer(function(){
        assert(i === 1);
        done();
      });
    });
  });

  it('should remove a job', function (done) {
    var one = frame.add(increment);
    var two = frame.add(increment);
    var three = frame.add(increment);
    frame.remove(one);
    frame.defer(function(){
      assert(i === 2);
      done();
    });
  });

});