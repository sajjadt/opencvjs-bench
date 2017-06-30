const THRESHOLD = 127;
const THRESHOLD_MAX = 210;

var type_dict = {};

var loop_template_timed = function(foo, args, time_budget) {
  var iterations = 0;
  var start_time = performance.now();
  while (performance.now() - start_time < time_budget) {
    iterations += 1;
    foo.apply(this, args);
  }
  return iterations;
};

var loop_template_itrations = function(foo, args, iterations) {
  var start_time = performance.now();
  for (var i=0; i < iterations; i+=1) {
    foo.apply(this, args);
  }
  return performance.now() - start_time;
};

var setup_type_dict = function() {
  console.log("Setting up type_dictionary");

  type_dict[cv.CV_8UC1] =  'cv.CV_8UC1';
  type_dict[cv.CV_16SC1] =  'cv.CV_16SC1';
  type_dict[cv.CV_32FC1] =  'cv.CV_32FC1';

  console.log(JSON.stringify(type_dict));
}
