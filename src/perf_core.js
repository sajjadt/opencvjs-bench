cv = require("./opencv.js");
config = require("./config.js");
common = require("./common.js");

var TYPES = common.types;

(function() {
  var Kernels = (function() {
    // Iterations will be considered only if config.duration property is set to null
    var Kernels = {
      add: {
        name: 'cv.add',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = cv.Mat.eye(image_rows, image_cols, type);
          this.mat3 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          cv.cvtColor(yuvMat, this.mat2, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.add, 'params': [this.mat, this.mat2, this.mat3]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
          this.mat3.delete();
        }
      },
      not: {
        name: 'cv.bitwise_not',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
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
          return {'func': cv.bitwise_not, 'params': [this.mat, this.mat2]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
        }
      },
      compare: {
        name: 'cv.compare',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        //operations: [Number(cv.CMP_EQ), Number(cv.CMP_GE)],
        operations: [0, 2],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = cv.Mat.eye(image_rows, image_cols, type);
          this.mat3 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          cv.cvtColor(yuvMat, this.mat2, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function(operation = 0) {
          return {'func': cv.compare, 'params': [this.mat, this.mat2, this.mat3, operation]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
          this.mat3.delete();;
        }
      },
      and: {
        name: 'cv.bitwise_and',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = cv.Mat.eye(image_rows, image_cols, type);
          this.mat3 = new cv.Mat();
        },
        callable: function() {
          return {'func': cv.bitwise_and, 'params': [this.mat, this.mat2, this.mat3]};
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          cv.cvtColor(yuvMat, this.mat2, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
          this.mat3.delete();
        }
      },
      add_weighted: {
        name: 'cv.addWeighted',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat(image_rows, image_cols, type);
          this.dst = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          cv.cvtColor(yuvMat, this.mat2, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.addWeighted, 'params': [this.mat, 0.4, this.mat2, 0.6, 0, this.dst]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
          this.dst.delete();
        }

      },
      invert: {
        name: 'cv.invert',
        types: [TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();
        },
        callable: function() {
          return {'func': cv.invert, 'params': [this.mat, this.mat2]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
        }
      },
      normalize: {
        name: 'cv.normalize',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        //TODO operations : [cv.NORM_INF, cv.NORM_L1, cv.NORM_L2],
        operations : [1, 2, 4],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = new cv.Mat();
          this.alpha = 1;
          this.beta = 0;
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
        callable: function(operation=4) {
          return {'func': cv.normalize, 'params': [this.mat, this.mat2, this.alpha, this.beta, operation]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
        }
      },
      max: {
        name: 'cv.max',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = cv.Mat.eye(image_rows, image_cols, type);
          this.mat3 = new cv.Mat();
        },
        callable: function() {
          return {'func': cv.max, 'params': [this.mat, this.mat2, this.mat3]};
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          cv.cvtColor(yuvMat, this.mat2, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
          this.mat3.delete();
        }
      },
      in_range: {
        name: 'cv.inRange',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = cv.Mat.eye(image_rows, image_cols, type);
          this.mat3 = cv.Mat.eye(image_rows, image_cols, type);
          this.mat4 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat, cv.COLOR_YUV2GRAY_I420);
          cv.cvtColor(yuvMat, this.mat2, cv.COLOR_YUV2GRAY_I420);
          cv.cvtColor(yuvMat, this.mat3, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.inRange, 'params': [this.mat, this.mat2, this.mat3, this.mat4]};
        },
        deallocate: function () {
          this.mat.delete();
          this.mat2.delete();
          this.mat3.delete();
          this.mat4.delete();
        }
      },
      mean: {
        name: 'cv.mean',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.source = cv.Mat.ones(image_rows, image_cols, type);
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
          return {'func': cv.mean, 'params': [this.source]};
        },
        deallocate: function () {
          this.source.delete();
        }
      },
      norm: {
        name: 'cv.norm',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.source = cv.Mat.ones(image_rows, image_cols, type);
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
          return {'func': cv.norm, 'params': [this.source, 4]};
        },
        deallocate: function () {
          this.source.delete();
        }
      },
      mean_std_dev: {
        name: 'cv.meanStdDev',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.source = new cv.Mat(image_rows, image_cols, type);
          this.mean = new cv.Mat();
          this.stdDev = new cv.Mat();
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
          return {'func': cv.meanStdDev, 'params': [this.source, this.mean, this.stdDev]};
        },
        deallocate: function () {
          this.source.delete();
          this.mean.delete();
          this.stdDev.delete();
        }
      },
      integral: {
        name: 'cv.integral',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat = new cv.Mat(image_rows, image_cols, type);
          this.sum = new cv.Mat();
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
          return {'func': cv.integral, 'params': [this.mat, this.sum, -1]};
        },
        deallocate: function () {
          this.mat.delete();
          this.sum.delete();
        }
      },
      absdiff: {
        name: 'cv.absdiff',
        types: [TYPES.UCharC1, TYPES.ShortC1, TYPES.FloatC1],
        allocate: function(type, image_rows, image_cols) {
          this.mat1 = cv.Mat.ones(image_rows, image_cols, type);
          this.mat2 = cv.Mat.ones(image_rows, image_cols, type);
          this.mat3 = new cv.Mat();
        },
        from_yuv_data: function(data, image_rows, image_cols) {
          var t1 = Date.now();
          var yuvMat = new cv.Mat(image_rows+image_rows/2, image_cols, TYPES.UCharC1);
          yuvMat.data.set(data);
          // TODO other color formats
          cv.cvtColor(yuvMat, this.mat1, cv.COLOR_YUV2GRAY_I420);
          cv.cvtColor(yuvMat, this.mat2, cv.COLOR_YUV2GRAY_I420);
          yuvMat.delete();
          return Date.now() - t1;
        },
        callable: function() {
          return {'func': cv.absdiff, 'params': [this.mat1, this.mat2, this.mat3]};
        },
        deallocate: function () {
          this.mat1.delete();
          this.mat2.delete();
          this.mat3.delete();
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
