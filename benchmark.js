// Refer to commons.js to see available types
// Iterations will be considered only if config.duration property is set to null
var config = {
  tests: {
    'basic_arith': {
      'run': true,
      'functions': ['add', 'absdiff', 'compare', 'max'],
      'iterations': 10000
    },
    'bitwise': {
      'run': true,
      'functions': ['not', 'and'],
      'iterations': 2000
    },
    'filters' : {
      'run': true,
      'functions': ['blur', 'gaussian_blur', 'median_blur', 'filter2d'],
      'iterations': 2000
    },
    'stats' : {
      'run': true,
      'functions': ['integral', 'mean', 'norm', 'mean_std_dev', 'histogram'],
      'iterations': 10000
    },
    'color_conversion': {
      'run': true,
      'functions': ['rgb_to_gray', 'rgb_to_yuv', 'yuv_to_rgb' ],
      'iterations': 2000
    },
    'transform' : {
      'run': true,
      'functions': ['pyr_down', 'image_warp'],
      'iterations': 2000
    },
    'apps_canny' : {
      'run': true,
      'functions': ['canny'],
      'iterations': 50
    },
    'object_detection': {
      'run': true,
      'functions': ['haar_detect', 'hog_compute'],
      'iterations': 100
    },
    'features' : {
      'run': true,
      'functions': ['orb', 'harris_corners'],
      'iterations': 100
    },
    'morph' : {
      'run': true,
      'functions': ['erode'],
      'iterations': 2000
    }
  },
  //'duration': null
  'duration' : 1000 // Benchmark duration in ms
}

function run_test(test, callback) {
  if (config.tests[test] == null || !config.tests[test].run)
    return;
  var is_timed =(config.duration != null);
  //Run tests for each function and for each type
  config.tests[test].functions.forEach(function(foo) {
    kernels[foo].types.forEach(function(type) {
      console.log('testing ' + ' ' + foo + ' ' + type );
      kernels[foo].body(type, callback, is_timed, config.tests[test].iterations);
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
