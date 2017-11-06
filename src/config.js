(function() {
  var Config = (function() {
    // Iterations will be considered only if config.duration property is set to null
    var Config = {

      tests: {
        // Core
        'basic_arith': {
          'run': true,
          'functions': ['add', 'absdiff', 'compare', 'max'],
          'iterations': 1000
        },
        'bitwise': {
          'run': true,
          'functions': ['not', 'and'],
          'iterations': 1000
        },
        'stats' : {
          'run': true,
          'functions': ['integral', 'mean', 'norm', 'mean_std_dev', 'histogram', 'normalize'],
          'iterations': 1000
        },
        // Image processing
        'filters' : {
          'run': true,
          'functions': ['median_blur', 'filter2d', 'blur', 'gaussian_blur'],
          'iterations': 50
        },
        'color_conversion': {
          'run': true,
          'functions': ['rgb_to_gray', 'rgb_to_yuv', 'yuv_to_rgb' ],
          'iterations': 500
        },
        'transform' : {
          'run': true,
          'functions': ['pyr_down', 'pyr_up', 'warp_affine'],
          'iterations': 1000
        },
        'morph' : {
          'run': true,
          'functions': ['erode'],
          'iterations': 1000
        },
        'apps' : {
          'run': true,
          'functions': ['canny'],
          'iterations': 50
        },
        // Object detection
        'object_detection': {
          'run': true,
          'functions': ['haar'],
          'iterations': 50
        },

        'video' : {
          'run': false,
          'functions': ['optical_flow', 'mean_shift'],
          'iterations': 500
        }
      },
      // Default values
      image_size: {
        width: 400,
        height: 200
      },
      // Benchmarking duration in milliseconds
      // If set to null, iteration properties will be used instead.
      duration : null
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
