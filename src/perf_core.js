cv = require("./opencv.js");
config = require("./config.js");
common = require("./common.js");

(function() {

  var Kernels = (function() {
    var image_rows = config.image_size.width;
    var image_cols = config.image_size.width;
    var TYPES = common.types;
    // Iterations will be considered only if config.duration property is set to null
    var Kernels = {
      compare: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        //TODO operations: [Number(cv.CMP_EQ), Number(cv.CMP_GE)],
        operations: [0, 2],
        body: function(type, callback, is_timed, iterations, operation) {

          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = cv.Mat.eye(image_rows, image_cols, type),
          mat3 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.compare, [mat, mat2, mat3, operation], config['duration']);
            callback(["compare", operation, common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.compare, [mat, mat2, mat3, operation], iterations);
            callback(["compare", operation, common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
          mat3.delete();
        }
      },
      and: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = cv.Mat.eye(image_rows, image_cols, type),
          mat3 = new cv.Mat(),
          mat4 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.bitwise_and, [mat, mat2, mat3, mat4], config['duration']);
            callback(["and", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.bitwise_and, [mat, mat2, mat3, mat4], iterations);
            callback(["and", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
          mat3.delete();
          mat4.delete();
        }
      },
      not: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = new cv.Mat(),
          mat3 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.bitwise_not, [mat, mat2, mat3], config['duration']);
            callback(["not", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.bitwise_not, [mat, mat2, mat3], iterations);
            callback(["not", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
          mat3.delete();
        }
      },
      add_weighted: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {

          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = new cv.Mat(image_rows, image_cols, type),
          dst = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.addWeighted, [mat, 0.4, mat2, 0.6, 0, dst], config['duration']);
            callback(["add_weighted", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.addWeighted, [mat, 0.4, mat2, 0.6, 0, dst], iterations);
            callback(["add_weighted", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
          dst.delete();
        }
      },
      invert: {
        types: [TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {

          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = new cv.Mat();
          if (is_timed) {
            var iterations = common.loop_template_timed(cv.invert, [mat, mat2], config['duration']);
            callback(["invert", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.invert, [mat, mat2], iterations);
            callback(["invert", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
        }
      },
      normalize: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        //TODO operations : [cv.NORM_INF, cv.NORM_L1, cv.NORM_L2],
        operations : [1, 2, 4],
        body: function(type, callback, is_timed, iterations, operation) {
          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = new cv.Mat(),
          alpha = 1,
          beta = 0;

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.normalize, [mat, mat2, alpha, beta, operation], config['duration']);
            callback(["normalize", operation, common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.normalize, [mat, mat2, alpha, beta, operation], iterations);
            callback(["normalize", operation, common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
        }
      },
      max: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = cv.Mat.eye(image_rows, image_cols, type),
          mat3 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.max, [mat, mat2, mat3], config['duration']);
            callback(["max", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.max, [mat, mat2, mat3], iterations);
            callback(["max", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
          mat3.delete();
        }
      },
      add: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = cv.Mat.eye(image_rows, image_cols, type),
          mat3 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.add, [mat, mat2, mat3], config['duration']);
            callback(["add", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.add, [mat, mat2, mat3], iterations);
            callback(["add", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
          mat3.delete();
        }
      },
      in_range: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var mat = cv.Mat.ones(image_rows, image_cols, type),
          mat2 = cv.Mat.eye(image_rows, image_cols, type),
          mat3 = cv.Mat.eye(image_rows, image_cols, type),
          mat4 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.inRange, [mat, mat2, mat3, mat4], config['duration']);
            callback(["in_range", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.inRange, [mat, mat2, mat3, mat4], iterations);
            callback(["in_range", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
          mat3.delete();
          mat4.delete();
        }
      },
      mean: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var source = new cv.Mat(image_rows, image_cols, type);

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.mean,  [source], config['duration']);
            callback(["mean", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.mean,  [source], iterations);
            callback(["mean", common.type_dict[type], "took", delay, "."].join(" "));
          }

          source.delete();
        }
      },
      norm: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var source = new cv.Mat(image_rows, image_cols, type);

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.norm, [source, 4], config['duration']);
            callback(["norm", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.norm, [source, 4], iterations);
            callback(["norm", common.type_dict[type], "took", delay, "."].join(" "));
          }

        }
      },
      mean_std_dev: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var source = new cv.Mat(image_rows, image_cols, type),
          mean = new cv.Mat(),
          stdDev = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.meanStdDev, [source, mean, stdDev], config['duration']);
            callback(["mean_Std_dev", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.meanStdDev, [source, mean, stdDev], iterations);
            callback(["mean_Std_dev", common.type_dict[type], "took", delay, "."].join(" "));
          }

          source.delete();
          mean.delete();
          stdDev.delete();
        }
      },
      integral: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var mat = new cv.Mat(image_rows, image_cols, type);
          var sum = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.integral, [mat, sum, -1], config['duration']);
            callback(["integral", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.integral, [mat, sum, -1], iterations);
            callback(["integral", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          sum.delete();
        }
      },
      absdiff: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var mat1 = cv.Mat.ones(image_rows, image_cols, type);
          var mat2 = cv.Mat.ones(image_rows, image_cols, type);
          var mat3 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.absdiff, [mat1, mat2, mat3], config['duration']);
            callback(["absdiff", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.absdiff, [mat1, mat2, mat3], iterations);
            callback(["absdiff", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat1.delete();
          mat2.delete();
          mat3.delete();
        },
      }
    }

    return Kernels;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Kernels;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return Kernels;
      });
    }
    else {
      window.Kernels = Kernels;
    }
  }

})();
