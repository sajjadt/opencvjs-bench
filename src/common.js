(function() {
  var Common = (function() {
    // Iterations will be considered only if config.duration property is set to null
    var Common = {

      // Workaround for issue of cv types registering as NANs on browsers
      types: {
        UCharC1: 0,
        ShortC1: 3,
        IntC1: 4,
        FloatC1: 5,
        UCharC3: 16,
        UCharC4: 24
      },
      type_dict: {},
      setup_type_dict: function() {
        this.type_dict[cv.CV_8UC1] =  'CV_8UC1';
        this.type_dict[cv.CV_8SC1] =  'CV_8SC1';
        this.type_dict[cv.CV_8UC3] =  'CV_8UC3';
        this.type_dict[cv.CV_8UC4] =  'CV_8UC4';
        this.type_dict[cv.CV_16UC1] =  'CV_16UC1';
        this.type_dict[cv.CV_16SC1] =  'CV_16SC1';
        this.type_dict[cv.CV_32SC1] =  'CV_32SC1';
        this.type_dict[cv.CV_32FC1] =  'CV_32FC1';
      },
      color_formats: {
        YUV420: 0,
        RGB24: 1,
        RGB32: 2
      },

      // Kernel call templates
      loop_template_timed: function(func_call, time_budget) {
        var iterations = 0;
        var start_time = Date.now();
        while (Date.now() - start_time < time_budget) {
          iterations += 1;
          func_call["func"].apply(this, func_call["params"]);
        }
        return iterations;
      },
      loop_template_itrations: function(func_call, iterations) {
        var start_time = Date.now();
        for (var i=0; i < iterations; i+=1) {
          func_call["func"].apply(this, func_call["params"]);
        }
        return Date.now() - start_time;
      }
    };

    return Common;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Common;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return Common;
      });
    }
    else {
      window.Common = Common;
    }
  }

})();
