# !/bin/sh
python $EMSCRIPTEN/tools/file_packager.py assets.data --preload assets@/ --js-output=fs.js
