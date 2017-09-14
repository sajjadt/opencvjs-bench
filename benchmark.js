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
  type_dict[cv.CV_8UC1] =  'CV_8UC1';
  type_dict[cv.CV_8SC1] =  'CV_8SC1';
  type_dict[cv.CV_8UC3] =  'CV_8UC3';
  type_dict[cv.CV_8UC4] =  'CV_8UC4';
  type_dict[cv.CV_16UC1] =  'CV_16UC1';
  type_dict[cv.CV_16SC1] =  'CV_16SC1';
  type_dict[cv.CV_32SC1] =  'CV_32SC1';
  type_dict[cv.CV_32FC1] =  'CV_32FC1';
}

function run_test(test, callback) {
  if (config.tests[test] == null || !config.tests[test].run)
    return;
  var is_timed = (config.duration != null);

  // Run tests for every function/type/operation combinations
  config.tests[test].functions.forEach(function(foo) {
    kernels[foo].types.forEach(function(type) {
      if ('undefined' !== typeof kernels[foo].operations && kernels[foo].operations != null) {
        kernels[foo].operations.forEach(function(operation) {
          kernels[foo].body(type, callback, is_timed, config.tests[test].iterations, operation);
        });
      }
      else {
        kernels[foo].body(type, callback, is_timed, config.tests[test].iterations);
      }
    });
  });
}

function* run_tests() {
  console.log("Start runnting tests....");
  for (var key in config.tests) {
    console.log("Processing test entry " + key);
    run_test(key, yield);
  }
}
