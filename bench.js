
const THRESHOLD = 127;
const THRESHOLD_MAX = 210;


var tests = {

  haar_classify: function(count) {
    // HAAR
    var img_gray = new cv.Mat(160, 800, cv.CV_8UC1);
    var face_cascade = new cv.CascadeClassifier();
    var faces = new cv.RectVector();
    face_cascade.load('../../test/data/haarcascade_frontalface_default.xml');
    var s1 = [0, 0];
    var s2 = [0, 0];

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    face_cascade.detectMultiScale(img_gray, faces, 1.1, 3, 0, s1, s2);
    var end = performance.now();

    console.log("Classify: CV_8UC1: " , end-start);

  },
  hog: function(count) {
    // HAAR
    var img_gray = new cv.Mat(160, 800, cv.CV_8UC1);
    var d = new cv.HOGDescriptor();
    var descriptorsValues = new cv.FloatVector();
    var locations = new cv.PointVector();


    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    d.compute( img_gray, descriptorsValues, [0,0], [0,0], locations);
    var end = performance.now();

    console.log("HOg Compute: CV_8UC1: " , end-start);

  },
  // compare
  compare_8u_eq: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_8UC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_8UC1),
    mat3 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.compare(mat, mat2, mat3, 0);
    var end = performance.now();

    console.log("CMP EQ: CV_8UC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  compare_8u_leq: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_8UC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_8UC1),
    mat3 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.compare(mat, mat2, mat3, 4);
    var end = performance.now();

    console.log("CMP LEQ: CV_8UC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  compare_16s_leq: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_16SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_16SC1),
    mat3 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.compare(mat, mat2, mat3, 4);
    var end = performance.now();

    console.log("CMP LEQ: CV_16SC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  compare_32f_leq: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_32FC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_32FC1),
    mat3 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.compare(mat, mat2, mat3, 4);
    var end = performance.now();

    console.log("CMP LEQ: CV_32FC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },

  normalize: function(count, type) {
    var mat = cv.Mat.ones(1600, 1600, type),
    mat2 = new cv.Mat(),
    nomat = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.normalize(mat, mat2, 1, 0, type, -1, nomat);
    var end = performance.now();

    console.log("Normalize L2, ", type, " :" , end-start);

    mat.delete();
    mat2.delete();
    nomat.delete();
  },


  addWeighted: function(count, type) {
    var mat = cv.Mat.ones(1600, 1600, type),
    mat2 = new cv.Mat(1600, 1600, type),
    dst = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.addWeighted(mat, 0.4, mat2, 0.6, 0, dst, -1);
    var end = performance.now();

    console.log("addWeighted ", type, " :" , end-start);

    mat.delete();
    mat2.delete();
    dst.delete();
  },

  invert: function(count, type) {
    var mat = cv.Mat.ones(1600, 1600, type),
    mat2 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.invert(mat, mat2, 0);
    var end = performance.now();

    console.log("invert  ", type, " :" , end-start);

    mat.delete();
    mat2.delete();
  },
  /////////////////////////////////////////
  //             Dot product
  //
  /////////////////////////////////////////
  min_8u: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_8UC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_8UC1),
    mat3 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.min(mat, mat2, mat3);
    var end = performance.now();

    console.log("Min: CV_8UC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  min_16s: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_16SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_16SC1),
    mat3 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.min(mat, mat2, mat3);
    var end = performance.now();

    console.log("Min: CV_16SC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  min_32f: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_32FC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_32FC1),
    mat3 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.min(mat, mat2, mat3);
    var end = performance.now();

    console.log("Min: CV_32FC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  add_8u: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_8UC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_8UC1),
    mat3 = new cv.Mat(),
    nomat = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.add(mat, mat2, mat3, nomat, -1);
    var end = performance.now();

    console.log("add: CV_8UC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  add_16s: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_16SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_16SC1),
    mat3 = new cv.Mat(),
    nomat = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.add(mat, mat2, mat3, nomat, -1);
    var end = performance.now();

    console.log("add: CV_16SC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  add_32f: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_32FC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_32FC1),
    mat3 = new cv.Mat(),
    nomat = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.add(mat, mat2, mat3, nomat, -1);
    var end = performance.now();

    console.log("add: CV_32FC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  inRange_8u: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_8UC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_8UC1),
    mat3 = cv.Mat.eye(1600, 1600, cv.CV_8UC1),
    mat4 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.inRange(mat, mat2, mat3, mat4);
    var end = performance.now();

    console.log("InRange: CV_8UC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
    mat4.delete();
  },
  inRange_8s: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_8SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_8SC1),
    mat3 = cv.Mat.eye(1600, 1600, cv.CV_8SC1),
    mat4 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.inRange(mat, mat2, mat3, mat4);
    var end = performance.now();

    console.log("InRange: CV_8SC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
    mat4.delete();
  },
  inRange_16s: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_16SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_16SC1),
    mat3 = cv.Mat.eye(1600, 1600, cv.CV_16SC1),
    mat4 = new cv.Mat();

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.inRange(mat, mat2, mat3, mat4);
    var end = performance.now();

    console.log("InRange: CV_16SC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
    mat4.delete();
  },
  dot_8u: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_8UC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_8UC1);

    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    x = x + mat.dot(mat2);
    var end = performance.now();

    console.log("Dot: CV_8UC1: " , end-start);

    mat.delete();
    mat2.delete();
  },
  // Dot product
  dot_16s: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_16SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_16SC1);
    var x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    x = x + mat.dot(mat2);
    var end = performance.now();

    console.log("Dot: CV_16SC1: " , end-start);

    mat.delete();
    mat2.delete();
  },
  // Dot product
  dot_32f: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_32FC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_32FC1),
    x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    x = x + mat.dot(mat2);
    var end = performance.now();

    console.log("Dot: CV_32FC1: " , end-start);

    mat.delete();
    mat2.delete();
  },
  // Dot product
  dot_32s: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_32SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_32SC1),
    x = 0;

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    x = x + mat.dot(mat2);
    var end = performance.now();

    console.log("Dot: CV_32SC1: " , end-start);

    mat.delete();
    mat2.delete();
  },
  // Matmul
  matmul_16s: function() {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_16SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_16SC1),
    mat3 = new cv.Mat();


    var start = performance.now();
    for(i =0 ;i < count; i=i+1) {
      mat3 = mat.mul(mat2, -5);
      mat3.delete();
    }
    var end = performance.now();

    console.log("Elem-mul: CV_16SC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  // Matmul
  matmul_32s: function(){
    var mat = cv.Mat.ones(1600, 1600, cv.CV_16SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_16SC1),
    mat3 = new cv.Mat();


    var start = performance.now();
    for(i =0 ;i < count; i=i+1) {
      //  mat3 = mat.mul(mat2, -5);
      //  mat3.delete();
    }
    var end = performance.now();

    console.log("Elem-mul: CV_16SC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
  },
  // Add
  add_8u: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_8UC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_8UC1),
    mat3 = new cv.Mat(),
    none = new cv.Mat();

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.add(mat, mat2, mat3, none, -1);

    var end = performance.now();
    console.log("Add: CV_8UC1: " , end-start);

    // console.log(mat.data())
    // console.log(mat2.data())
    // console.log(mat3.data())
    mat.delete();
    mat2.delete();
    mat3.delete();
    none.delete();
  },
  add_32f: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_32FC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_32FC1),
    mat3 = new cv.Mat(),
    none = new cv.Mat();

    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.add(mat, mat2, mat3, none, -1);

    var end = performance.now();
    console.log("Add: CV_32FC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
    none.delete();
  },
  // Add
  add_32s: function(count) {
    var mat = cv.Mat.ones(1600, 1600, cv.CV_32SC1),
    mat2 = cv.Mat.eye(1600, 1600, cv.CV_32SC1),
    mat3 = new cv.Mat(),
    none = new cv.Mat();


    var start = performance.now();
    for(i =0 ;i < count*30; i=i+1) {
      cv.add(mat, mat2, mat3, none, -1);
    }
    var end = performance.now();

    console.log("Add: CV_32SC1: " , end-start);

    mat.delete();
    mat2.delete();
    mat3.delete();
    none.delete();
  },
  /////////////////////////////////////////
  //          Blur
  //
  /////////////////////////////////////////
  gblur_8u: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_8UC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.GaussianBlur(mat1, mat2, [5, 5], 0, 0, cv.BORDER_DEFAULT);
    var end = performance.now();

    console.log("Gaussian Blur 5x5: CV_8UC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },
  blur_8u: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_8UC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.blur(mat1, mat2, [3, 3], [-1, -1], cv.BORDER_DEFAULT);
    var end = performance.now();

    console.log("Blur 3x3: CV_8UC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },
  blur_8u2: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_8UC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.blur(mat1, mat2, [5, 5], [-1, -1], cv.BORDER_DEFAULT);
    var end = performance.now();

    console.log("Blur 5x5: CV_8UC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },
  blur_16s: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_16SC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.blur(mat1, mat2, [5, 5], [-1, -1], cv.BORDER_DEFAULT);
    var end = performance.now();

    console.log("Blur 5x5: CV_16SC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },
  blur_32s: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_32FC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.blur(mat1, mat2, [5, 5], [-1, -1], cv.BORDER_DEFAULT);
    var end = performance.now();

    console.log("Blur 5x5: CV_32FC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },

  /////////////////////////////////////////
  //          Median Blur
  //
  /////////////////////////////////////////
  median_blur_8u3x3: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_8UC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.medianBlur(mat1, mat2, 3);
    var end = performance.now();

    console.log("Median Blur 3x3: CV_8UC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },
  median_blur_8u7x7: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_8UC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.medianBlur(mat1, mat2, 7);
    var end = performance.now();

    console.log("Median Blur 3x3: CV_8UC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },
  median_blur_16u: function(count) {
    var mat1 = cv.Mat.ones(16000, 1600, cv.CV_16SC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.medianBlur(mat1, mat2, 3);
    var end = performance.now();

    console.log("Median Blur 3x3: CV_16SC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },
  median_blur_32f: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_32FC1);
    var mat2 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.medianBlur(mat1, mat2, 7);
    var end = performance.now();

    console.log("Median Blur 3x3: CV_32FC1: " , end-start);
    mat1.delete();
    mat2.delete();
  },
  /////////////////////////////////////////
  //          Absdiff
  //
  /////////////////////////////////////////
  absdiff: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_8UC1);
    var mat2 = cv.Mat.ones(1600, 1600, cv.CV_8UC1);
    var mat3 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.absdiff(mat1, mat2, mat3);
    var end = performance.now();

    console.log("absdiff: CV_8UC1: " , end-start);
    mat1.delete();
    mat2.delete();
    mat3.delete();
  },
  absdiff_16s: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_16SC1);
    var mat2 = cv.Mat.ones(1600, 1600, cv.CV_16SC1);
    var mat3 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.absdiff(mat1, mat2, mat3);
    var end = performance.now();

    console.log("absdiff: CV_16SC1: " , end-start);
    mat1.delete();
    mat2.delete();
    mat3.delete();
  },
  absdiff_32f: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_32FC1);
    var mat2 = cv.Mat.ones(1600, 1600, cv.CV_32FC1);
    var mat3 = new cv.Mat();
    var start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.absdiff(mat1, mat2, mat3);
    var end = performance.now();

    console.log("absdiff: CV_32FC1: " , end-start);
    mat1.delete();
    mat2.delete();
    mat3.delete();
  },
  /////////////////////////////////////////
  //          Integral
  //
  /////////////////////////////////////////
  integral_8s: function(count) {
    var mat = cv.Mat.eye([1600, 1600], cv.CV_8UC1);
    var sum = new cv.Mat();

    start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.integral(mat, sum, -1);
    end = performance.now();
    console.log("Integral: CV_8SC1: " , end-start);
    mat.delete();
    sum.delete();
  },
  integral_16s: function(count) {
    var mat = cv.Mat.eye([1600, 1600], cv.CV_16SC1);
    var sum = new cv.Mat();

    start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.integral(mat, sum, -1);
    end = performance.now();
    console.log("Integral: CV_16SC1: " , end-start);
    mat.delete();
    sum.delete();
  },
  integral_32f: function(count) {
    var mat = cv.Mat.eye([1600, 1600], cv.CV_32FC1);
    var sum = new cv.Mat();

    start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.integral(mat, sum, -1);
    end = performance.now();
    console.log("Integral: CV_32FC1: " , end-start);
    mat.delete();
    sum.delete();
  },
  /////////////////////////////////////////
  //          Corner
  //
  /////////////////////////////////////////
  corner: function(count) {
    var mat = cv.Mat.eye([1600, 1600], cv.CV_8UC1);
    var mat_out = new cv.Mat();

    start = performance.now();
    for(i =0 ;i < count; i=i+1)
    cv.cornerHarris(mat, mat_out, 5, 7, 0.1, cv.BORDER_DEFAULT);
    end = performance.now();

    console.log("Corner: CV_8UC4 Scalar code: " , end-start);
    mat.delete();
    mat_out.delete();
  },
  /////////////////////////////////////////
  //          Threshold
  //
  /////////////////////////////////////////
  //
  thresh: function(count) {
    var source = new cv.Mat(1600, 800, cv.CV_8UC1),
    dest = new cv.Mat();
    start = performance.now();
    for(i =0; i < count*10 ;i =i+1)
    cv.threshold(source, dest, THRESHOLD, THRESHOLD_MAX, cv.ThresholdTypes.THRESH_BINARY.value);
    end = performance.now();
    console.log("Thresh (Binary): CV_8UC1: " , end-start);
  },
  thresh_32f: function(count) {
    var source = new cv.Mat(1600, 1600, cv.CV_32FC1),
    dest = new cv.Mat();
    start = performance.now();
    for(i =0; i < count*10 ;i =i+1)
    cv.threshold(source, dest, THRESHOLD, THRESHOLD_MAX, cv.ThresholdTypes.THRESH_BINARY.value);
    end = performance.now();
    console.log("Thresh (Binary): CV_32FC1: " , end-start);
  },
  thresh_16s: function(count) {
    var source = new cv.Mat(1600, 1600, cv.CV_16SC1),
    dest = new cv.Mat();
    start = performance.now();
    for(i =0; i < count*10 ;i =i+1)
    cv.threshold(source, dest, THRESHOLD, THRESHOLD_MAX, cv.ThresholdTypes.THRESH_BINARY.value);
    end = performance.now();
    console.log("Thresh (Binary): CV_16SC1: " , end-start);
  },

  /////////////////////////////////////////
  //          Canny
  //
  /////////////////////////////////////////
  canny: function(count) {
    var source = new cv.Mat(1600, 1600, cv.CV_8UC1),
    dest = new cv.Mat();
    start = performance.now();
    for(i =0; i < count ;i =i+1)
    cv.Canny(source, dest, THRESHOLD, THRESHOLD_MAX, 3, false);
    end = performance.now();
    console.log("Canny on grayscale: " , end-start);
    source.delete();
    dest.delete();
  },


  sobel_8u: function(count) {
    var source = new cv.Mat(3200, 2400, cv.CV_8UC1),
    dest = new cv.Mat();
    start = performance.now();
    for(i =0; i < count ;i =i+1)
    cv.Sobel(source, dest, cv.CV_16S, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
    end = performance.now();
    console.log("Sobel on grayscale: " , end-start);
    source.delete();
    dest.delete();
  },



  /////////////////////////////////////////
  //          Histogram
  //
  /////////////////////////////////////////
  hist: function(count) {
    var aa = 1;
    var source = new cv.MatVector();
    var channels = new cv.IntVector();
    var histSize = new cv.IntVector();
    var ranges = new cv.FloatVector();

    //var vec0 = new cv.Mat.zeros([20, 20], cv.CV_8UC1);
    var vec1 = new cv.Mat.ones([1600, 1600], cv.CV_8UC1);
    //source.push_back(vec0);
    source.push_back(vec1);
    channels.push_back(0);
    histSize.push_back(256);
    ranges.push_back(0); ranges.push_back(256);

    let hist = new cv.Mat();
    let mask = new cv.Mat();
    let binSize = cv._malloc(4);
    let binView = new Int32Array(cv.HEAP8.buffer, binSize);
    // Or, let binView = cv.HEAP32.subarray(binSize >> 2);
    binView[0] = 10;

    var start = performance.now();
    for(i =0; i < count ;i =i+1)
    cv.calcHist(source, channels, mask, hist, histSize, ranges, false);
    var end = performance.now();
    console.log("Histogram on grayscale: " , end-start);
  },
  /////////////////////////////////////////
  //          Color Convert RGB 2 Gray
  //
  /////////////////////////////////////////
  rgb2gray_32f: function(count) {
    var source = new cv.Mat(1600, 1600, cv.CV_32FC3);
    var dest = new cv.Mat();
    var start = performance.now();
    for(i =0; i < count ;i =i+1)
    cv.cvtColor(source, dest, cv.ColorConversionCodes.COLOR_RGB2GRAY.value, 0);
    var end = performance.now();
    console.log("RGB (Float) to Grayscale: " , end-start);
    source.delete();
    dest.delete();
  },
  rgb2gray_8u: function(count) {
    var source = new cv.Mat(1600, 1600, cv.CV_8UC3);
    var dest = new cv.Mat();
    var start = performance.now();
    for(i =0; i < count ;i =i+1)
    cv.cvtColor(source, dest, cv.ColorConversionCodes.COLOR_RGB2GRAY.value, 0);
    var end = performance.now();
    console.log("RGB (Byte) to Grayscale: " , end-start);
    source.delete();
    dest.delete();
  },
  rgb2yuv_32f: function(count) {
    var source = new cv.Mat(1600, 1600, cv.CV_32FC3);
    var dest = new cv.Mat();
    var start = performance.now();
    for(i =0; i < count ;i =i+1)
    cv.cvtColor(source, dest, cv.ColorConversionCodes.COLOR_RGB2YUV.value, 0);
    var end = performance.now();
    console.log("RGB (Float) to Grayscale: " , end-start);
    source.delete();
    dest.delete();
  },
  rgb2yuv_8u: function(count) {
    var source = new cv.Mat(1600, 1600, cv.CV_8UC3);
    var dest = new cv.Mat();
    var start = performance.now();
    for(i =0; i < count ;i =i+1)
    cv.cvtColor(source, dest, cv.ColorConversionCodes.COLOR_RGB2YUV.value, 0);
    var end = performance.now();
    console.log("RGB (Byte) to Grayscale: " , end-start);
    source.delete();
    dest.delete();
  },
  /////////////////////////////////////////
  //          filter2D and sepFilter2D
  //
  /////////////////////////////////////////
  // 5x5
  filter2D_32f_5: function() {
    var source = new cv.Mat(1600, 1600, cv.CV_32FC3);
    var dest = new cv.Mat();

    var ind = 3;
    var kernel_size = 5;

    kernel = cv.Mat.ones(kernel_size, kernel_size, cv.CV_32FC1);
    var anchor = [-1, -1],
    delta = 0,
    ddepth = -1;

    var start = performance.now();
    for(i =0; i < count ;i =i+1) {
      cv.filter2D(source, dest, ddepth, kernel, [-1, -1], delta, cv.BORDER_DEFAULT);
    }
    var end = performance.now();
    console.log("filter2D to Grayscale: " , end-start);
  },
  // 7x7
  filter2D_32f_7: function() {
    var source = new cv.Mat(1600, 1600, cv.CV_32FC3);
    var dest = new cv.Mat();

    var ind = 3;
    var kernel_size = 7;

    kernel = cv.Mat.ones(kernel_size, kernel_size, cv.CV_32FC1);
    var anchor = [-1, -1],
    delta = 0,
    ddepth = -1;

    var start = performance.now();
    for(i =0; i < count ;i =i+1) {
      cv.filter2D(source, dest, ddepth, kernel, [-1, -1], delta, cv.BORDER_DEFAULT);
    }
    var end = performance.now();
    console.log("filter2D to Grayscale: " , end-start);
  },

  erode_8u: function(count) {
    var mat1 = cv.Mat.ones(1600, 1600, cv.CV_8UC1);
    var mat2 = new cv.Mat();
    var start = performance.now();

    let size = 3;

    let element = cv.getStructuringElement(cv.MorphShapes.MORPH_RECT.value,
      [2*size + 1, 2*size+1 ],
      [size, size] );

      for(i =0 ;i < count; i=i+1)
      cv.erode(mat1, mat2, element, [-1, -1], 1, cv.BORDER_CONSTANT, cv.Scalar.all(Number.MAX_VALUE) );
      var end = performance.now();

      console.log("Median Blur 3x3: CV_32FC1: " , end-start);
      mat1.delete();
      mat2.delete();
    },
    // erode_16s: function(count) {
    //     var mat1 = cv.Mat.ones(1600, 1600, cv.CV_16SC1);
    //     var mat2 = new cv.Mat();
    //     var start = performance.now();
    //     for(i =0 ;i < count; i=i+1)
    //        cv.erode(mat1, mat2, [-1, -1], 1, cv.BORDER_CONSTANT, cv.Scalar.all(Number.MAX_VALUE));
    //     var end = performance.now();
    //
    //     console.log("Median Blur 3x3: CV_32FC1: " , end-start);
    //     mat1.delete();
    //     mat2.delete();
    //   },
  }
  run_tests = function() {

    // In Range
    tests.inRange_8u(500);
    tests.inRange_8s(500);
    tests.inRange_16s(500);
    //
    // Compare
    tests.compare_8u_eq(500);
    tests.compare_8u_leq(500);
    // tests.compare_16s_leq(500);
    // tests.compare_32f_leq(500);

    // Min/Max
    tests.min_8u(150);
    // tests.min_16s(1500);
    // tests.min_32f(1500);

    // Add
    tests.add_8u(150);
    // tests.add_16s(1500);
    // tests.add_32f(1500);

    // THRESHOLD
    tests.thresh(200);
    tests.thresh_16s(200);
    // tests.thresh_32f(200);

    // Integral
    tests.integral_8s(800);
    tests.integral_16s(800);
    // tests.integral_32f(800);
    //
    //
    // tests.dot_8u(100);
    // tests.corner(20);
    // tests.canny(50);

    // Sobel
    //tests.sobel_8u(300);

    // Gaussian Blur
    // tests.gblur_8u(100);

    // Blur
    // tests.blur_8u(300);
    // tests.blur_8u2(300);
    // tests.blur_16s(300);
    // tests.blur_32s(300);

    // Median Blur
    // tests.median_blur_8u3x3(4);
    // tests.median_blur_8u7x7(4);
    // tests.median_blur_16u(4);

    // Erode
    // tests.erode_8u(100);

    // Dilate
    // tests.rgb2gray_8u(500);
    // tests.rgb2gray_32f(800);
    // tests.rgb2yuv_8u(500);
    // tests.rgb2yuv_32f(800);

    // HAAR - HOG
    // tests.haar_classify(10);
    // tests.hog(100);
    // tests.hist(100);


    tests.absdiff(400);
    tests.absdiff_16s(400);
    tests.absdiff_32f(400);
    //
    tests.normalize(400, cv.CV_8SC1);
    //
    //
    // tests.invert(200, cv.CV_32FC1);
    //
    //
    //
    // tests.addWeighted(500, cv.CV_32FC1);

    // tests.invert_16s(100);
    // tests.invert_32f(100);



  }
