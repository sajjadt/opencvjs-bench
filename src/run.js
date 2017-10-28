var config = require("./config.js");
var bench = require("./benchmark.js")
var common = require("./common.js");


var update = function(text) {
  console.log(text);
}

var foo = function(iterator) {
  if(!iterator.next(update).done)
    setTimeout(foo, 10, iterator);
  else {
    console.log("Done..");
  }
}

common.setup_type_dict();
var iterator = bench.run_tests();
foo(iterator);
