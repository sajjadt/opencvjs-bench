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

      erode: {
        types: [TYPES.UCharC1, TYPES.ShortC1],
        body: function(type, callback, is_timed, iterations) {
          var mat1 = cv.Mat.ones(image_rows, image_cols, Number(type));
          var mat2 = new cv.Mat();
          let size = 3;

          let element = cv.getStructuringElement(cv.MORPH_RECT, {width: 2*size + 1, height: 2*size+1});
          if (is_timed) {
            var iterations = common.loop_template_timed(cv.erode, [mat1, mat2, element], config['duration']);
            callback(["erode", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.erode, [mat1, mat2, element], iterations);
            callback(["erode", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat1.delete();
          mat2.delete();
        }
      },
      sobel: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed, iterations) {
          var source = new cv.Mat(3200, 2400, Number(type)),
          dest = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.Sobel, [source, dest, -1, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT], config['duration']);
            callback(["Sobel", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.Sobel, [source, dest, -1, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT], iterations);
            callback(["Sobel", common.type_dict[type], "took", delay, "."].join(" "));
          }

          source.delete();
          dest.delete();
        }
      },
      threshold: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        //operations: [cv.THRESH_BINARY, cv.THRESH_TRUNC],
        operations: [0, 2],
        body: function(type, callback, is_timed, iterations, opeartion) {
          const THRESHOLD = 127;
          const THRESHOLD_MAX = 210;

          var source = new cv.Mat(image_rows, image_cols, Number(type)),
          dest = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.threshold, [source, dest, THRESHOLD, THRESHOLD_MAX, Number(operation)], config['duration']);
            callback(["threshold", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.threshold, [source, dest, THRESHOLD, THRESHOLD_MAX, Number(operation)], iterations);
            callback(["threshold", common.type_dict[type], "took", delay, "."].join(" "));
          }

          source.delete();
          dest.delete();
        }
      },
      blur: {
        types: [TYPES.UCharC1],
        operations: null,
        body: function(type, callback, is_timed, iterations) {
          var mat1 = cv.Mat.ones(image_rows, image_cols, Number(type));
          var mat2 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.blur, [mat1, mat2, {width:5, height:5}], config['duration']);
            callback(["blur", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.blur, [mat1, mat2, {width:5, height:5}], iterations);
            callback(["blur", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat1.delete();
          mat2.delete();
        },
      },
      gaussian_blur: {
        types: [TYPES.UCharC1, TYPES.ShortC1],
        operations: null,
        body: function(type, callback, is_timed, iterations) {
          var mat1 = cv.Mat.ones(image_rows, image_cols, Number(type)),
          mat2 = new cv.Mat(),
          size = {width:5, height:5},
          sigmaX = 0.1;

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.GaussianBlur, [mat1, mat2, size, sigmaX], config['duration'], config['duration']);
            callback(["gaussian_blur", common.type_dict[type], "5x5", "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.GaussianBlur, [mat1, mat2, size, sigmaX], config['duration'], iterations);
            callback(["gaussian_blur", common.type_dict[type], "5x5", "took", delay, "."].join(" "));
          }

          mat1.delete();
          mat2.delete();
        }
      },
      median_blur: {
        types: [TYPES.UCharC1, TYPES.ShortC1],
        operations: null,
        body: function(type, callback, is_timed, iterations) {
          var mat1 = cv.Mat.ones(image_rows, image_cols, Number(type));
          var mat2 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.medianBlur, [mat1, mat2, 5], config['duration']);
            callback(["median_blur", common.type_dict[type], "5x5", "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.medianBlur, [mat1, mat2, 5], iterations);
            callback(["median_blur", common.type_dict[type], "5x5", "took", delay, "."].join(" "));
          }

          mat1.delete();
          mat2.delete();
        }
      },
      rgb_to_gray: {
        types: [TYPES.UCharC3],
        body: function(type, callback, is_timed, iterations) {
          var mat = cv.Mat.ones(image_rows, image_cols, Number(type)),
          mat2 = new cv.Mat();
          if (is_timed) {
            var iterations = common.loop_template_timed(cv.cvtColor, [mat, mat2, 11, 0], config['duration']);
            callback(["rgba_to_gray", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.cvtColor, [mat, mat2, 11, 0], iterations);
            callback(["rgba_to_gray", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
        }
      },
      rgb_to_yuv: {
        types: [TYPES.UCharC3],
        body: function(type, callback, is_timed, iterations) {
          var mat = cv.Mat.ones(image_rows, image_cols, Number(type)),
          mat2 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.cvtColor, [mat, mat2, 83, 0], config['duration']);
            callback(["rgb_to_yuv", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.cvtColor,[mat, mat2, 83, 0], iterations);
            callback(["rgb_to_yuv", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
        }
      },
      yuv_to_rgb: {
        types: [TYPES.UCharC3],
        body: function(type, callback, is_timed, iterations) {
          var mat = cv.Mat.ones(image_rows, image_cols, Number(type)),
          mat2 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.cvtColor, [mat, mat2, 85, 0], config['duration']);
            callback(["yuv_to_rgb", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.cvtColor, [mat, mat2, 85, 0], iterations);
            callback(["yuv_to_rgb", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          mat2.delete();
        }
      },
      histogram: {
        types: [TYPES.UCharC1],
        body: function(type, callback, is_timed) {
          var mat = new cv.Mat(image_rows, image_cols, Number(type));
          var sum = new cv.Mat();

          var source = new cv.MatVector();
          var channels = [0];
          var histSize = [256];
          var ranges = [0, 255];

          source.push_back(mat);

          let hist = new cv.Mat();
          let mask = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.calcHist, [source, channels, mask, hist, histSize, ranges], config['duration']);
            callback(["calcHist", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.calcHist, [source, channels, mask, hist, histSize, ranges], iterations);
            callback(["calcHist", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          sum.delete();
        }
      },
      pyr_down: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed) {
          var mat1 = cv.Mat.ones(image_rows, image_cols, Number(type));
          var mat2 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.pyrDown, [mat1, mat2], config['duration']);
            callback(["pyr_down", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.pyrDown, [mat1, mat2], iterations);
            callback(["pyr_down", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat1.delete();
          mat2.delete();
        }
      },
      pyr_up: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed) {
          var mat1 = cv.Mat.ones(image_rows, image_cols, Number(type));
          var mat2 = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.pyrUp, [mat1, mat2], config['duration']);
            callback(["pyr_up", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.pyrUp, [mat1, mat2], iterations);
            callback(["pyr_up", common.type_dict[type], "took", delay, "."].join(" "));
          }
          mat1.delete();
          mat2.delete();
        }
      },
      warp_affine: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed) {
          var src = cv.Mat.ones(image_rows, image_cols, Number(type)),
          dst = new cv.Mat(),
          matrix = new cv.Mat(3, 3, TYPES.FloatC1),
          dsize = new cv.Size(src.rows, src.cols),
          center = new cv.Point(src.cols / 2, src.rows / 2);

          let M = cv.getRotationMatrix2D(center, 45, 1);

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.warpAffine,
              [src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar()], config['duration']);
              callback(["warp_affine", common.type_dict[type], "did", iterations, "iterations."].join(" "));
            } else {
              var delay = common.loop_template_itrations(cv.warpAffine,
                [src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar()], iterations);
                callback(["warp_affine", common.type_dict[type], "took", delay, "."].join(" "));
              }
              src.delete();
              dst.delete();
            }
      },
      canny: {
        types: [TYPES.UCharC1],
        body: function(type, callback, is_timed) {
          var mat = cv.Mat.ones(image_rows, image_cols, Number(type)),
          edges = new cv.Mat();

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.Canny,
            [mat, edges, 0.5, 1.5, 3], config['duration']);
            callback(["Canny", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
          var delay = common.loop_template_itrations(cv.Canny,
            [mat, edges, 0.5, 1.5, 3], iterations);
            callback(["Canny", common.type_dict[type], "took", delay, "."].join(" "));
          }

          mat.delete();
          edges.delete();
        }
      },
      filter2d: {
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        body: function(type, callback, is_timed) {
          var source = new cv.Mat(image_rows, image_cols, Number(type));
          var dest = new cv.Mat();

          var ind = 3;
          var kernel_size = 7;

          kernel = cv.Mat.ones(kernel_size, kernel_size, Number(type));
          var anchor = [-1, -1],
          delta = 0,
          ddepth = -1;

          if (is_timed) {
            var iterations = common.loop_template_timed(cv.filter2D, [source, dest, ddepth, kernel], config['duration']);
            callback(["filter2d.7x7", common.type_dict[type], "did", iterations, "iterations."].join(" "));
          } else {
            var delay = common.loop_template_itrations(cv.filter2D, [source, dest, ddepth, kernel], iterations);
            callback(["filter2d.7x7", common.type_dict[type], "took", delay, "."].join(" "));
          }
          source.delete();
          dest.delete();
          kernel.delete();
        }
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
