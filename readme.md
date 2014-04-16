# raf-queue

Batch jobs to fire in the next frame using requestAnimationFrame.

## Installation

with component:

```
component install anthonyshort/raf-queue
```

with browserify and friends:

```
npm install raf-queue
```

## Usage

```js
var frame = require('raf-queue');

// Add jobs to the job, returns an id
var job = frame.add(increment);

// Remove jobs from the queue
frame.remove(job);

// Fires after the jobs from the next frame are done
frame.defer(function(){
  console.log('job done!');
});
```