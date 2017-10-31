var Demux = require('node-demux');


(function() {
  var Sequence = (function() {
    // Iterations will be considered only if config.duration property is set to null

    var Sequence = {
      height: 0,
      width: 0,
      video: null,
      pixel_type: 0, // refer to common.js to see the list of available types
      color_format: 0,
      num_frames :0,
      init: function() {
        Sequence.video = new Demux();
        Sequence.video.on('metadata', Sequence.update_video_metadata);
        Sequence.video.on('error', function(err) {
          console.log(err);
        });

      },
      start: function() {
        Sequence.video.play();
      },
      load_video: function (path) {
        Sequence.video.load(path);
      },
      update_video_metadata: function(metadata) {
          //console.log(metadata);
          Sequence.height = metadata.height;
          Sequence.width = metadata.width;
          // TODO
          Sequence.color_format = common.color_formats.YUV420;
          Sequence.pixel_type = common.types.UCharC1;
          Sequence.num_frames = metadata.num_frames;

      }
    };

    return Sequence;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Sequence;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return Sequence;
      });
    }
    else {
      window.Sequence = Sequence;
    }
  }

})();
