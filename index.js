var raf = require('component-raf');
var queue = [];
var job;

exports.add = function (fn, cxt) {
  var length = queue.push(fn.bind(cxt));
  if(!job) job = raf(flush);
  return length - 1;
};

exports.remove = function (index) {
  queue.splice(index, 1);
};

exports.clear = function() {
  queue = [];
  if(job) raf.cancel(job);
  job = null;
};

exports.defer = function(fn) {
  raf(raf.bind(null, fn));
};

function flush() {
  while(queue.length) queue.shift()();
  job = null;
}