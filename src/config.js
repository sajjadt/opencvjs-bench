(function() {
  var Config = (function() {
    // Iterations will be considered only if config.duration property is set to null
    var Config = {
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
          'functions': ['median_blur', 'filter2d', 'blur', 'gaussian_blur'],
          'iterations': 2000
        },
        'stats' : {
          'run': true,
          'functions': ['integral', 'mean', 'norm', 'mean_std_dev', 'histogram', 'normalize'],
          'iterations': 10000
        },
        'color_conversion': {
          'run': true,
          'functions': ['rgb_to_gray', 'rgb_to_yuv', 'yuv_to_rgb' ],
          'iterations': 2000
        },
        'transform' : {
          'run': true,
          'functions': ['pyr_down', 'pyr_up', 'warp_affine'],
          'iterations': 2000
        },
        'apps' : {
          'run': true,
          'functions': ['canny'],
          'iterations': 50
        },
        'object_detection': {
          'run': true,
          'functions': ['haar_detect', 'hog_compute'],
          'iterations': 100
        },
        'morph' : {
          'run': true,
          'functions': ['erode'],
          'iterations': 2000
        },
        'video' : {
          'run': false,
          'functions': ['optical_flow', 'mean_shift'],
          'iterations': 2000
        }
      },
      image_size: {
        width: 400,
        height: 200
      },
      // Benchmarking duration in milliseconds
      // If set to null, iteration properties will be used instead.
      duration : 500
    }

    return Config;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Config;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return Config;
      });
    }
    else {
      window.Config = Config;
    }
  }

})();
