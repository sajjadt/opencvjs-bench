var config = require("./config.js");
var bench = require("./benchmark.js")
var common = require("./common.js");


var update = function(text) {
  console.log(text);
}

var image_rows = config.image_size.height;
var image_cols = config.image_size.width;
var duration = config.duration;

var foo = function(iterator) {
  if(!iterator.next().done)
    setTimeout(foo, 10, iterator);
  else {
    console.log("Done..");
  }
}

common.setup_type_dict();
var iterator = bench.run_tests(
  {'update': update,
  'image_rows': image_rows,
  'image_cols': image_cols,
  'duration': duration,
  'iterations': 0});

foo(iterator);
