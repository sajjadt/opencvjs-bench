cv = require("./opencv.js");
config = require("./config.js");
common = require("./common.js");

var TYPES = common.types;

(function() {
  var Kernels = (function() {
    // Iterations will be considered only if config.duration property is set to null
    var Kernels = {
      haar: {
        name: 'cv.haardetect',
        types: [TYPES.UCharC1],
        init: function() {
          cv.FS_createLazyFile('/', 'haarcascade_frontalface_default.xml',
            '../assets/haarcascade_frontalface_default.xml', true, false);
        },
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.outVect = new cv.RectVector();
          // Loading classifier with the frontal face model
          this.cascade = new cv.CascadeClassifier();
          this.cascade.load('haarcascade_frontalface_default.xml');
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
          return {'func': this.cascade.detectMultiScale,
                  'params': [this.mat, this.outVect],
                  'this_arg': this.cascade};
        },
        deallocate: function () {
          this.mat.delete();
          this.outVect.delete();
          this.cascade.delete();
        }
      },
      hog: {
        name: 'cv.hogcascade',
        types: [TYPES.UCharC1],
        init: function() {
        },
        allocate: function(type, image_rows, image_cols) {
          this.mat = cv.Mat.ones(image_rows, image_cols, type);
          this.outVect = new cv.RectVector();
          this.outWVect = new cv.DoubleVector();
          this.cascade = new cv.HOGDescriptor();
          // TODO: construct Mat from std::vector
          this.cascade.setSVMDetector(cv.HOGDescriptor.getDefaultPeopleDetector());
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
          console.log(this.mat.type());
          return {'func': this.cascade.detectMultiScale,
                  'params': [this.mat, this.outVect, this.outWVect],
                  'this_arg': this.cascade};
        },
        deallocate: function () {
          this.mat.delete();
          this.outVect.delete();
          this.outWVect.delete();
          this.cascade.delete();
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
