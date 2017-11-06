var config = require("./config.js");
var bench = require("./benchmark.js")
var common = require("./common.js");


var update = function(text) {
  console.log(text);
}

var image_rows = config.image_size.height;
var image_cols = config.image_size.width;
var duration = config.duration;

var foo = function(generator) {
  if(!generator.next().done)
    setTimeout(foo, 10, generator);
  else {
    console.log("Done..");
  }
}

common.setup_type_dict();
var generator = bench.run_tests(
  {'update': update,
  'image_rows': image_rows,
  'image_cols': image_cols,
  'duration': duration,
  'iterations': 0});

foo(generator);
