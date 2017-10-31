var config = require("./config.js");
var bench = require("./benchmark.js")
var common = require("./common.js");
var sequence = require('./sequence.js');

var cv = require('./opencv.js');
var fs = require('fs');

var assets_dir = "../../opencvjs-experiments/raw/videos/";
var input_file = assets_dir + 'david.webm'

var update = function(text) {
  console.log(text);
}

var foo = function(generator) {
  // Call and check if done
  if(!generator.next({update, sequence}).done) {
    sequence.video.on('end', function() {
      console.log("Finished.... doing next iteration...");
      // next iteration
      sequence.video.stop(function(){
        setTimeout(foo, 10, generator);
      });

    });
    console.log("START START START");
    sequence.start();
  } else {
    console.log("All done..");
  }
}

sequence.init();
sequence.load_video(input_file);

common.setup_type_dict();
var generator = bench.run_tests();
foo(generator);
