cv = require("./opencv.js");
config = require("./config.js");
common = require("./common.js");

var TYPES = common.types;

(function() {

  var Kernels = (function() {
    // Iterations will be considered only if config.duration property is set to null
    var Kernels = {
      erode: {
        types: [TYPES.UCharC1, TYPES.ShortC1],
        name: 'cv.erode',
        allocate: function(type, image_rows, image_cols) {
          this.mat1 = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();

          var size = 3;
          this.element = cv.getStructuringElement(cv.MORPH_RECT, {width: 2*size + 1, height: 2*size+1});
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat1, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.erode, 'params': [this.mat1, this.mat2, this.element]};
        },
        deallocate: function () {
          this.mat1.delete();
          this.mat2.delete();
          this.element.delete();
        }
      },
      sobel: {
        name: 'cv.Sobel',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.source = new cv.Mat(image_rows, image_cols, type);
          this.dest = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.source, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.Sobel, 'params': [this.source, this.dest, -1, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT]};
        },
        deallocate: function () {
          this.source.delete();
          this.dest.delete();
        }
      },
      threshold: {
        name: 'cv.threshold',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        //operations: [cv.THRESH_BINARY, cv.THRESH_TRUNC],
        operations: [0, 2],
        allocate: function(type, image_rows, image_cols) {
          this.source = new cv.Mat(image_rows, image_cols, type);
          this.dest = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.source, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function(opeartion = 2) {
          const THRESHOLD = 127;
          const THRESHOLD_MAX = 210;
          return {'func': cv.threshold, 'params': [this.source, this.dest, THRESHOLD, THRESHOLD_MAX, Number(operation)]};
        },
        deallocate: function () {
          this.source.delete();
          this.dest.delete();
        }
      },
      blur: {
        name: 'cv.blur',
        types: [TYPES.UCharC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat1 = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat1, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.blur, 'params': [this.mat1, this.mat2, {width:5, height:5}]};
        },
        deallocate: function () {
          this.mat1.delete();
          this.mat2.delete();
        }
      },
      gaussian_blur: {
        name: 'cv.GaussianBlur',
        types: [TYPES.UCharC1, TYPES.ShortC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat1 = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat1, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          var size = {width:5, height:5};
          var sigmaX = 0.1;
          return {'func': cv.GaussianBlur, 'params': [this.mat1, this.mat2, size, sigmaX]};
        },
        deallocate: function () {
          this.mat1.delete();
          this.mat2.delete();
        }
      },
      median_blur: {
        name: 'cv.medianBlur',
        types: [TYPES.UCharC1, TYPES.ShortC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat1 = cv.Mat.ones(image_rows, image_cols, type),
          this.mat2 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat1, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.medianBlur, 'params': [this.mat1, this.mat2, 5]};
        },
        deallocate: function () {
          this.mat1.delete();
          this.mat2.delete();
        }
      },
      rgb_to_gray: {
        name: 'cv.cvtColo-RGB2GRAY',
        types: [TYPES.UCharC3],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type),
          this.mat2 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.cvtColor, 'params': [this.mat, this.mat2, 11, 0]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
        }
      },
      rgb_to_yuv: {
        name: 'cv.cvtColo-RGB2YUV',
        types: [TYPES.UCharC3],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.cvtColor, 'params': [this.mat, this.mat2, 83, 0]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
        }
      },
      yuv_to_rgb: {
        name: 'cv.cvtColor.YUV2RGB',
        types: [TYPES.UCharC3],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.cvtColor, 'params': [this.mat, this.mat2, 85, 0]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
        }
      },
      histogram: {
        name: 'cv.calcHist',
        types: [TYPES.UCharC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat = new cv.Mat(image_rows, image_cols, type);
          this.sum = new cv.Mat();
          this.source = new cv.MatVector();
          this.source.push_back(this.mat);
          this.hist = new cv.Mat();
          this.mask = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          this.source.clear();
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          this.source.push_back(this.mat);
          return Date.now() - t1;
        },
        callable: function() {
          var channels = [0];
          var histSize = [256];
          var ranges = [0, 255];
          return {'func': cv.calcHist, 'params': [this.source, channels, this.mask, this.hist, histSize, ranges]};
        },
        deallocate: function () {
          this.mat.delete();
          this.sum.delete();
          this.source.delete();
        }
      },
      pyr_down: {
        name: 'cv.pyrDown',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat1 = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat1, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.pyrDown, 'params': [this.mat1, this.mat2]};
        },
        deallocate: function () {
          this.mat1.delete();
          this.mat2.delete();
        }
      },
      pyr_up: {
        name: 'cv.pyrUp',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat1 = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat1, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.pyrUp, 'params': [this.mat1, this.mat2]};
        },
        deallocate: function () {
          this.mat1.delete();
          this.mat2.delete();
        }
      },
      warp_affine: {
        name: 'cv.warpAffine',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.src = cv.Mat.ones(image_rows, image_cols, type);
          this.dst = new cv.Mat();
          this.matrix = new cv.Mat(3, 3, TYPES.FloatC1);
          this.dsize = new cv.Size(image_rows, image_cols);

          var center = new cv.Point(image_rows / 2, image_rows / 2);
          this.M = cv.getRotationMatrix2D(center, 45, 1);
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.src, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.warpAffine, 'params': [this.src, this.dst, this.M, this.dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar()]};
        },
        deallocate: function () {
          this.src.delete();
          this.dst.delete();
        }
      },
      canny: {
        types: [TYPES.UCharC1],
        name : 'cv.Canny',
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.edges = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.Canny, 'params': [this.mat, this.edges, 0.5, 1.5, 3]};
        },
        deallocate: function () {
          this.mat.delete();
          this.edges.delete();
        }
      },
      filter2d: {
        name: 'cv.filter2D',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.source = new cv.Mat(image_rows, image_cols, type);
          this.dest = new cv.Mat();
          var kernel_size = 7;
          this.kernel = cv.Mat.ones(kernel_size, kernel_size, type);
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.source, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.filter2D, 'params': [this.source, this.dest, -1, this.kernel]};
        },
        deallocate: function () {
          this.source.delete();
          this.dest.delete();
          this.kernel.delete();
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
