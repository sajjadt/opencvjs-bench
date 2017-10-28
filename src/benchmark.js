config = require("./config.js");
cv = require("./opencv.js")

core_kernels = require("./perf_core.js");
imgproc_kernels = require("./perf_imgproc.js");

// Preparing the list of perf tests
var kernels = {};
Object.assign(kernels, core_kernels);
Object.assign(kernels, imgproc_kernels);


(function() {

  var Benchmark = (function() {

    // Iterations will be considered only if config.duration property is set to null
    var Benchmark = {
      run_test: function(test, callback) {
        if (config.tests[test] == null || !config.tests[test].run)
          return;

        var is_timed = (config.duration != null);

        // Run tests for every function/type/operation combinations
        config.tests[test].functions.forEach(function(foo) {

          if (!(foo in kernels)) {
            console.log(foo, " not found");
            return;
          }

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
      },

      run_tests: function*() {
        console.log("Start runnting tests....");
        for (var key in config.tests) {
          console.log("Processing test entry " + key);
          this.run_test(key, yield);
        }
      }
    };

    return Benchmark;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Benchmark;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return Benchmark;
      });
    }
    else {
      window.Benchmark = Benchmark;
    }
  }

})();
