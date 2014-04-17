var frame = require('raf-queue');
var assert = require('assert');

describe('raf-queue', function () {
  var i;

  function increment() {
    i++;
  }

  beforeEach(function () {
    frame.clear();
    i = 0;
  });

  it('should push items onto the queue', function () {
    frame(increment);
  });

  it('should not update on this frame', function () {
    frame(increment);
    assert(i === 0);
  });

  it('should return a job id', function () {
    var id = frame(increment);
    assert(typeof id === 'number');
  });

  it('should run them in order', function (done) {
    frame(increment);
    frame(function(){
      assert(i === 1);
      done();
    });
  });

  it('should clear any queued jobs', function (done) {
    frame(increment);
    frame.clear();
    frame.defer(function(){
      assert(i === 0);
      done();
    });
  });

  it('should defer a function', function (done) {
    frame(increment);
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
    var one = frame(increment);
    var two = frame(increment);
    var three = frame(increment);
    frame.cancel(one);
    frame.defer(function(){
      assert(i === 2);
      done();
    });
  });

  it('should add a function once', function (done) {
    frame.once(increment);
    frame.once(increment);
    frame.once(increment);
    assert(frame.queued() === 1);
    frame.defer(function(){
      assert(i === 1);
      done();
    });
  });

});