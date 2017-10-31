var config = require("./config.js");
var cv = require("./opencv.js")

var core_kernels = require("./perf_core.js");
var imgproc_kernels = require("./perf_imgproc.js");
var common = require("./common.js");

// Preparing the list of perf tests
var kernels = {};
Object.assign(kernels, core_kernels);
Object.assign(kernels, imgproc_kernels);

(function() {

  var Benchmark = (function() {
    // Iterations will be considered only if config.duration property is set to null
    var Benchmark = {
      run_test: function(kernels_foo, params) {

        var callback = params.update;
        var sequence = params.sequence;

        // Sequence
        if ('undefined' != typeof sequence) {
          kernels_foo.allocate(sequence.pixel_type, sequence.height, sequence.width);
          var io_delay = 0;
          var process_delay = 0;

          sequence.video.on('frame', function(frameIdx, data) {
            if (frameIdx %20 == 0)
              console.log("processsing frame", frameIdx);
            io_delay += kernels_foo.from_yuv_data(data, sequence.height, sequence.width);
            process_delay += common.loop_template_itrations(kernels_foo.callable(), 1);
            if (frameIdx == sequence.num_frames - 1) {
              kernels_foo.deallocate();
              callback([kernels_foo.name, "took", process_delay].join(" "));
            }
          });
        } else {
          var is_timed = (config.duration != null && 'undefined' == typeof params.sequence);
          // Fixed input
          // For every type, operation
          var kernel_func = kernels_foo.callable().func;
          var kernel_params = kernels_foo.callable().params;

          kernels_foo.types.forEach(function(type) {
            if ("operation" in kernels_foo) {
              kernels_foo.operations.forEach(function(operation) {
                kernels_foo.allocate(type, params.image_rows, params.image_cols);
                if (is_timed) {
                  var iterations = common.loop_template_timed(kernels_foo.callable(), params['duration']);
                  callback([kernels_foo.name, common.type_dict[type], "did", iterations, "iterations."].join(" "));
                } else {
                  var delay = common.loop_template_itrations(kernels_foo.callable(), params['iterations']);
                  callback([kernels_foo.name, common.type_dict[type], "took", delay, "to process", params['iterations'], "frames."].join(" "));
                }
                kernels[foo].deallocate();
              });
            } else {
              kernels_foo.allocate(type, params.image_rows, params.image_cols);
              if (is_timed) {
                var iterations = common.loop_template_timed(kernels_foo.callable(), params['duration']);
                callback([kernels_foo.name, common.type_dict[type], "did", iterations, "iterations."].join(" "));
              } else {
                var delay = common.loop_template_itrations(kernels_foo.callable(), params['iterations']);
                callback([kernels_foo.name, common.type_dict[type], "took", delay, "to process", params['iterations'], "frames."].join(" "));
              }
              kernels_foo.deallocate();
            }

          });
        }
      },
      run_tests: function*(params) {
        console.log("Start runnting tests....");
        for (var key in config.tests) {
          console.log("Processing test entry " + key);

          if (config.tests[key] == null || !config.tests[key].run)
            continue;

          for (var i = 0; i < config.tests[key].functions.length; i++) {
            var func = config.tests[key].functions[i];
            if (func in kernels) {
              params['iterations'] = config.tests[key]['iterations'];
              if (common.types.UCharC1 in kernels[func].types)
                this.run_test(kernels[func], params, yield);
              else
                console.log(func, ' does not support processing u8 pixels!');
            } else {
              console.log(func, ' impelementation is not provided!');
            }
          };
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
