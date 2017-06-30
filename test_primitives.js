var img_dim = 800;

kernels = {
  // Operations: 0, 1, 2, 3
  //
  compare: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    //operations: [0],
    //body: function(type,callback, is_timed, iterations) {
    body: function(type, callback, is_timed, iterations) {
      operation = 0;

      var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
      mat2 = cv.Mat.eye(img_dim, img_dim, Number(type)),
      mat3 = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.compare, [mat, mat2, mat3, operation], config['duration']);
        callback(["compare",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.compare, [mat, mat2, mat3, operation], iterations);
        callback(["compare",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
      mat3.delete();
    }
  },
  and: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    //operations: [0],
    //body: function(type,callback, is_timed, iterations) {
    body: function(type, callback, is_timed, iterations) {
      operation = 0;

      var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
      mat2 = cv.Mat.eye(img_dim, img_dim, Number(type)),
      mat3 = new cv.Mat(),
      mat4 = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.bitwise_and, [mat, mat2, mat3, mat4], config['duration']);
        callback(["and",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.bitwise_and, [mat, mat2, mat3, mat4], iterations);
        callback(["and",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
      mat3.delete();
      mat4.delete();
    }
  },
  not: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    //operations: [0],
    //body: function(type,callback, is_timed, iterations) {
    body: function(type, callback, is_timed, iterations) {
      operation = 0;

      var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
      mat2 = new cv.Mat(),
      mat3 = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.bitwise_not, [mat, mat2, mat3], config['duration']);
        callback(["not",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.bitwise_not, [mat, mat2, mat3], iterations);
        callback(["not",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
      mat3.delete();
    }
  },
  add_weighted: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null ,
    body: function(type, callback, is_timed, iterations) {

      var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
      mat2 = new cv.Mat(img_dim, img_dim, Number(type)),
      dst = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.addWeighted, [mat, 0.4, mat2, 0.6, 0, dst, -1], config['duration']);
        callback(["add_weighted",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.addWeighted, [mat, 0.4, mat2, 0.6, 0, dst, -1], iterations);
        callback(["add_weighted",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
      dst.delete();
   }
  } ,
  invert: {
    types: [cv.CV_32FC1],
    operations: null ,
    body: function(type, callback, is_timed, iterations) {

      var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
      mat2 = new cv.Mat();
      if (is_timed) {
        var iterations = loop_template_timed(cv.invert, [mat, mat2, 0], config['duration']);
        callback(["invert",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.invert, [mat, mat2, 0], iterations);
        callback(["invert",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
    }
  },

  normalize: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null ,
    body: function(type, callback, is_timed, iterations) {

      var mat = cv.Mat.ones(img_dim, img_dim, type),
      mat2 = new cv.Mat(),
      nomat = new cv.Mat();
      var norm_type = 2;

      if (is_timed) {
        var iterations = loop_template_timed(cv.compare,  [mat, mat2, 1, 0, norm_type, -1, nomat], config['duration']);
        callback(["normalize",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.compare,  [mat, mat2, 1, 0, norm_type, -1, nomat], iterations);
        callback(["normalize",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
      nomat.delete();
    }
  },

  max: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
      mat2 = cv.Mat.eye(img_dim, img_dim, Number(type)),
      mat3 = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.max, [mat, mat2, mat3], config['duration']);
        callback(["max",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.max, [mat, mat2, mat3], iterations);
        callback(["max",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
      mat3.delete();
    }
  },

  add: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var mat = cv.Mat.ones(img_dim, img_dim, type),
      mat2 = cv.Mat.eye(img_dim, img_dim, type),
      mat3 = new cv.Mat(),
      nomat = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.add, [mat, mat2, mat3, nomat, -1], config['duration']);
        callback(["add",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.add, [mat, mat2, mat3, nomat, -1], iterations);
        callback(["add",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
      mat3.delete();
    }
  },

  in_range: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var mat = cv.Mat.ones(img_dim, img_dim, type),
      mat2 = cv.Mat.eye(img_dim, img_dim, type),
      mat3 = cv.Mat.eye(img_dim, img_dim, type),
      mat4 = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.inRange, [mat, mat2, mat3, mat4], config['duration']);
        callback(["in_range",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.inRange, [mat, mat2, mat3, mat4], iterations);
        callback(["in_range",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
      mat3.delete();
      mat4.delete();
    }
  },
  // },
  // dot: function(type, callback, is_timed, iterations) {
  //   var mat = cv.Mat.ones(img_dim, img_dim, type),
  //   mat2 = cv.Mat.eye(img_dim, img_dim, type);
  //
  //   // var iterations = loop_template_timed(
  //   // x = x + mat.dot(mat2);
  //   var iterations = 0;
  //   //callback("Dot: CV_8UC1: PROBLAMATAIC " , iterations);
  //
  //   mat.delete();
  //   mat2.delete();
  // },
  erode: {
    types : [cv.CV_8UC1, cv.CV_16SC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var mat1 = cv.Mat.ones(img_dim, img_dim, type);
      var mat2 = new cv.Mat();
      let size = 3;

      let element = cv.getStructuringElement(cv.MorphShapes.MORPH_RECT.value,
        [2*size + 1, 2*size+1 ],
        [size, size] );

      if (is_timed) {
        var iterations = loop_template_timed(cv.erode, [mat1, mat2, element, [-1, -1], 1, cv.BORDER_CONSTANT, cv.Scalar.all(Number.MAX_VALUE)], config['duration']);
        callback(["erode",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.erode, [mat1, mat2, element, [-1, -1], 1, cv.BORDER_CONSTANT, cv.Scalar.all(Number.MAX_VALUE)], iterations);
        callback(["erode",type_dict[type], "took", delay, "."].join(" "));
      }

      mat1.delete();
      mat2.delete();
    }
  },
  sobel: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var source = new cv.Mat(3200, 2400, type),
      dest = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.Sobel, [source, dest, -1, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT], config['duration']);
        callback(["Sobel",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.Sobel, [source, dest, -1, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT], iterations);
        callback(["Sobel",type_dict[type], "took", delay, "."].join(" "));
      }

      source.delete();
      dest.delete();
    }
  },
  threshold: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var source = new cv.Mat(img_dim, img_dim, type),
      dest = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.threshold, [source, dest, THRESHOLD, THRESHOLD_MAX, cv.ThresholdTypes.THRESH_BINARY.value], config['duration']);
        callback(["threshold",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.threshold, [source, dest, THRESHOLD, THRESHOLD_MAX, cv.ThresholdTypes.THRESH_BINARY.value], iterations);
        callback(["threshold",type_dict[type], "took", delay, "."].join(" "));
      }

      source.delete();
      dest.delete();
    }
  },
  mean: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var source = new cv.Mat(img_dim, img_dim, type),
          noMat = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.mean,  [source, noMat], config['duration']);
        callback(["mean",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.mean,  [source, noMat], iterations);
        callback(["mean",type_dict[type], "took", delay, "."].join(" "));
      }

      source.delete();
      noMat.delete();
    }
  },
  norm: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var source = new cv.Mat(img_dim, img_dim, type),
          noMat = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.norm, [source, 4, noMat], config['duration']);
        callback(["norm",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.norm, [source, 4, noMat], iterations);
        callback(["norm",type_dict[type], "took", delay, "."].join(" "));
      }

    }
  },
  mean_std_dev: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
      var source = new cv.Mat(img_dim, img_dim, type),
          mean = new cv.Mat(),
          stdDev = new cv.Mat(),
          noMat = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.meanStdDev,  [source, mean, stdDev, noMat], config['duration']);
        callback(["mean_Std_dev",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.meanStdDev,  [source, mean, stdDev, noMat], iterations);
        callback(["mean_Std_dev",type_dict[type], "took", delay, "."].join(" "));
      }

      source.delete();
      mean.delete();
      stdDev.delete();
      noMat.delete();
    }
  },
  integral: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
    var mat = cv.Mat.eye([img_dim, img_dim], type);
    var sum = new cv.Mat();

    if (is_timed) {
      var iterations = loop_template_timed(cv.integral,  [mat, sum, -1], config['duration']);
      callback(["integral",type_dict[type], "did", iterations, "iteartions."].join(" "));
    } else {
      var delay = loop_template_itrations(cv.integral,  [mat, sum, -1], iterations);
      callback(["integral",type_dict[type], "took", delay, "."].join(" "));
    }

    mat.delete();
    sum.delete();
    }
  },
  absdiff: {
    types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
    var mat1 = cv.Mat.ones(img_dim, img_dim, type);
    var mat2 = cv.Mat.ones(img_dim, img_dim, type);
    var mat3 = new cv.Mat();

    if (is_timed) {
      var iterations = loop_template_timed(cv.absdiff, [mat1, mat2, mat3], config['duration']);
      callback(["absdiff",type_dict[type], "did", iterations, "iteartions."].join(" "));
    } else {
      var delay = loop_template_itrations(cv.absdiff, [mat1, mat2, mat3], iterations);
      callback(["absdiff",type_dict[type], "took", delay, "."].join(" "));
    }

    mat1.delete();
    mat2.delete();
    mat3.delete();
    },
  },
  blur: {
    // types : [cv.CV_8UC1, cv.CV_16SC1],
    types : [cv.CV_8UC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
    var mat1 = cv.Mat.ones(img_dim, img_dim, type);
    var mat2 = new cv.Mat();

    if (is_timed) {
      var iterations = loop_template_timed(cv.blur, [mat1, mat2, [5, 5],  [-1, -1], cv.BORDER_DEFAULT], config['duration']);
      callback(["blur",type_dict[type], "did", iterations, "iteartions."].join(" "));
    } else {
      var delay = loop_template_itrations(cv.blur, [mat1, mat2, [5, 5],  [-1, -1], cv.BORDER_DEFAULT], iterations);
      callback(["blur",type_dict[type], "took", delay, "."].join(" "));
    }

    mat1.delete();
    mat2.delete();
    },
  },
  gaussian_blur: {
    types : [cv.CV_8UC1, cv.CV_16SC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
    var mat1 = cv.Mat.ones(img_dim, img_dim, type);
    var mat2 = new cv.Mat();

    if (is_timed) {
      var iterations = loop_template_timed(cv.GaussianBlur, [mat1, mat2, [5, 5], 0, 0, cv.BORDER_DEFAULT], config['duration'], config['duration']);
      callback(["gaussian_blur", type_dict[type], "5x5", "did", iterations, "iteartions."].join(" "));
    } else {
      var delay = loop_template_itrations(cv.GaussianBlur, [mat1, mat2, [5, 5], 0, 0, cv.BORDER_DEFAULT], config['duration'], iterations);
      callback(["gaussian_blur", type_dict[type], "5x5", "took", delay, "."].join(" "));
    }

    mat1.delete();
    mat2.delete();
    }
  },
  median_blur: {
    types : [cv.CV_8UC1, cv.CV_16SC1],
    operations: null,
    body: function(type, callback, is_timed, iterations) {
    var mat1 = cv.Mat.ones(img_dim, img_dim, type);
    var mat2 = new cv.Mat();

    if (is_timed) {
      var iterations = loop_template_timed(cv.medianBlur, [mat1, mat2, 5], config['duration']);
      callback(["median_blur",type_dict[type], "5x5","did", iterations, "iteartions."].join(" "));
    } else {
      var delay = loop_template_itrations(cv.medianBlur, [mat1, mat2, 5], iterations);
      callback(["median_blur",type_dict[type], "5x5","took", delay, "."].join(" "));
    }

    mat1.delete();
    mat2.delete();
    }
  },
  rgb_to_gray: {
  types : [cv.CV_8UC3],
  operations: [],
  body: function(type, callback, is_timed, iterations) {
    operation = 0;

    var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
    mat2 = new cv.Mat();

    if (is_timed) {
      var iterations = loop_template_timed(cv.cvtColor, [mat, mat2, 11, 0], config['duration']);
      callback(["rgba_to_gray",type_dict[type], "did", iterations, "iteartions."].join(" "));
    } else {
      var delay = loop_template_itrations(cv.cvtColor, [mat, mat2, 11, 0], iterations);
      callback(["rgba_to_gray",type_dict[type], "took", delay, "."].join(" "));
    }

    mat.delete();
    mat2.delete();
    }
  },
  rgb_to_yuv: {
    types : [cv.CV_8UC3],
    operations: [],
    body: function(type, callback, is_timed, iterations) {
      operation = 0;

      var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
      mat2 = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.cvtColor, [mat, mat2, 83, 0], config['duration']);
        callback(["rgb_to_yuv",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.cvtColor,[mat, mat2, 83, 0], iterations);
        callback(["rgb_to_yuv",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
    }
  },
  yuv_to_rgb: {
    types : [cv.CV_8UC3],
    operations: [],
    body: function(type, callback, is_timed, iterations) {
      operation = 0;

      var mat = cv.Mat.ones(img_dim, img_dim, Number(type)),
      mat2 = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.cvtColor, [mat, mat2, 85, 0], config['duration']);
        callback(["yuv_to_rgb",type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.cvtColor, [mat, mat2, 85, 0], iterations);
        callback(["yuv_to_rgb",type_dict[type], "took", delay, "."].join(" "));
      }

      mat.delete();
      mat2.delete();
    }
  },
  histogram: {
    types : [cv.CV_8UC1],
    operations: null,
    body: function(type, callback, is_timed) {
    var mat = cv.Mat.eye([img_dim, img_dim], type);
    var sum = new cv.Mat();


    var source = new cv.MatVector();
    var channels = new cv.IntVector();
    var histSize = new cv.IntVector();
    var ranges = new cv.FloatVector();

    //source.push_back(vec0);
    source.push_back(mat);
    channels.push_back(0);
    histSize.push_back(256);
    ranges.push_back(0); ranges.push_back(256);

    let hist = new cv.Mat();
    let mask = new cv.Mat();
    let binSize = cv._malloc(4);
    let binView = new Int32Array(cv.HEAP8.buffer, binSize);
    binView[0] = 10;

    if (is_timed) {
      var iterations = loop_template_timed(cv.calcHist, [source, channels, mask, hist, histSize, ranges, false], config['duration']);
      callback(["calcHist", type_dict[type], "did", iterations, "iteartions."].join(" "));
    } else {
      var delay = loop_template_itrations(cv.calcHist, [source, channels, mask, hist, histSize, ranges, false], iterations);
      callback(["calcHist", type_dict[type], "took", delay, "."].join(" "));
    }

    mat.delete();
    sum.delete();
    }
  },
  pyr_down: {
   types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
   operations: null,
   body: function(type, callback, is_timed) {
     var mat1 = cv.Mat.ones(img_dim, img_dim, type);
     var mat2 = new cv.Mat();
     var size = [0,0];

     if (is_timed) {
       var iterations = loop_template_timed(cv.pyrDown, [mat1, mat2, size, cv.BORDER_DEFAULT], config['duration']);
       callback(["pyr_down", type_dict[type], "did", iterations, "iteartions."].join(" "));
     } else {
       var delay = loop_template_itrations(cv.pyrDown, [mat1, mat2, size, cv.BORDER_DEFAULT], iterations);
       callback(["pyr_down", type_dict[type], "took", delay, "."].join(" "));
     }

     mat1.delete();
     mat2.delete();
   }
 },
 image_warp: {
   types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
   operations: null,
   body: function(type, callback, is_timed) {
     var mat1 = cv.Mat.ones(img_dim, img_dim, type),
         mat2 = new cv.Mat(),
         matrix = new cv.Mat(3, 3, cv.CV_32FC1),
         scalar = new cv.Scalar();

     if (is_timed) {
       var iterations = loop_template_timed(cv.warpPerspective,
         [mat1, mat2, matrix,  [img_dim/2, img_dim/2], 1, cv.BORDER_CONSTANT, scalar], config['duration']);
       callback(["wrap_perspecitve", type_dict[type], "did", iterations, "iteartions."].join(" "));
     } else {
       var delay = loop_template_itrations(cv.warpPerspective,
         [mat1, mat2, matrix,  [img_dim/2, img_dim/2], 1, cv.BORDER_CONSTANT, scalar], iterations);
       callback(["wrap_perspecitve", type_dict[type], "took", delay, "."].join(" "));
     }

     mat1.delete();
     mat2.delete();
   }
 },
 canny: {
   types : [cv.CV_8UC1],
   operations: null,
   body: function(type, callback, is_timed) {
     var mat = cv.Mat.ones(img_dim, img_dim, type),
         edges = new cv.Mat();

     if (is_timed) {
       var iterations = loop_template_timed(cv.Canny,
         [mat, edges, 0.5, 1.5, 3, false], config['duration']);
       callback(["Canny", type_dict[type], "did", iterations, "iteartions."].join(" "));
     } else {
       var delay = loop_template_itrations(cv.Canny,
         [mat, edges, 0.5, 1.5, 3, false], iterations);
       callback(["Canny", type_dict[type], "took", delay, "."].join(" "));
     }

     mat.delete();
     edges.delete();
   }
 },
 hog_compute: {
   types: [cv.CV_8UC1],
   operations: null,
   body: function(type, callback, is_timed) {
     callback("Skipping HOG");
     return;
     var mat = cv.Mat.ones(img_dim, img_dim, type),
         d = new cv.HOGDescriptor(),
         descriptorsValues = new cv.FloatVector(),
         locations = new cv.PointVector();

     if (is_timed) {
       var iterations = loop_template_timed(d.compute,
         [mat, descriptorsValues, [0,0], [0,0], locations], config['duration']);
       callback(["HOG.Compute", type_dict[type], "did", iterations, "iteartions."].join(" "));
     } else {
       var delay = loop_template_itrations(d.compute,
         [mat, descriptorsValues, [0,0], [0,0], locations], iterations);
       callback(["HOG.Compute", type_dict[type], "took", delay, "."].join(" "));
     }

     mat.delete();
     descriptorsValues.clear();
     descriptorsValues.delete();
   }
 },
 haar_detect: {
   types : [cv.CV_8UC1],
   operations: null,
   body: function(type, callback, is_timed) {
     callback("Skipping HAAR");
     return;
     var mat = cv.Mat.ones(img_dim, img_dim, type),
         d = new cv.HOGDescriptor(),
         descriptorsValues = new cv.FloatVector(),
         locations = new cv.PointVector();

     var face_cascade = new cv.CascadeClassifier();
     var faces = new cv.RectVector();
     face_cascade.load('../../test/data/haarcascade_frontalface_default.xml');
     var s1 = [0, 0];
     var s2 = [0, 0];


     if (is_timed) {
       var iterations = loop_template_timed(face_cascade.detectMultiScale, [mat, faces, 1.1, 3, 0, s1, s2], config['duration']);
       callback(["HAAR.detect", type_dict[type], "did", iterations, "iteartions."].join(" "));
     } else {
       var delay = loop_template_itrations(face_cascade.detectMultiScale, [mat, faces, 1.1, 3, 0, s1, s2], iterations);
       callback(["HAAR.detect", type_dict[type], "took", delay, "."].join(" "));
     }

     mat.delete();
     descriptorsValues.clear();
     descriptorsValues.delete();
   }
 },
 filter2d: {
   types : [cv.CV_8UC1, cv.CV_16SC1, cv.CV_32FC1],
   operations: null,
   body: function(type, callback, is_timed) {
     var source = new cv.Mat(img_dim, img_dim, type);
     var dest = new cv.Mat();

     var ind = 3;
     var kernel_size = 7;

     kernel = cv.Mat.ones(kernel_size, kernel_size, type);
     var anchor = [-1, -1],
     delta = 0,
     ddepth = -1;

     if (is_timed) {
       var iterations = loop_template_timed(cv.filter2D,
         [source, dest, ddepth, kernel, [-1, -1], delta, cv.BORDER_DEFAULT], config['duration']);
       callback(["filter2d.7x7", type_dict[type], "did", iterations, "iteartions."].join(" "));
     } else {
       var delay = loop_template_itrations(cv.filter2D,
         [source, dest, ddepth, kernel, [-1, -1], delta, cv.BORDER_DEFAULT], iterations);
       callback(["filter2d.7x7", type_dict[type], "took", delay, "."].join(" "));
     }
     source.delete();
     dest.delete();
     kernel.delete();
   }
 },
 harris_corners: {
    types : [cv.CV_8UC1],
    operations: null,
    body: function(type, callback, is_timed) {
      var source = new cv.Mat(img_dim, img_dim, type),
          dest = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.cornerHarris,
         [source, dest, 5, 7, 0.1, cv.BORDER_DEFAULT]);
         callback(["harris_corners", type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.cornerHarris,
         [source, dest, 5, 7, 0.1, cv.BORDER_DEFAULT], iterations);
         callback(["harris_corners", type_dict[type], "took", delay, "."].join(" "));
       }

       source.delete();
       dest.delete();
   }
 },
 orb: {
    types : [cv.CV_8UC1],
    operations: null,
    body: function(type, callback, is_timed) {
      callback("Skipping ORB");
      return;
      var source = new cv.Mat(img_dim, img_dim, type),
          dest = new cv.Mat();

      if (is_timed) {
        var iterations = loop_template_timed(cv.cornerHarris,
         [source, dest, 5, 7, 0.1, cv.BORDER_DEFAULT]);
         callback(["ORB", type_dict[type], "did", iterations, "iteartions."].join(" "));
      } else {
        var delay = loop_template_itrations(cv.cornerHarris,
         [source, dest, 5, 7, 0.1, cv.BORDER_DEFAULT], iterations);
         callback(["ORB", type_dict[type], "took", delay, "."].join(" "));
       }

       source.delete();
       dest.delete();
   }
 }
};

console.log('prim kernels added');
