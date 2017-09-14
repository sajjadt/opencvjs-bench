# opencvjs-bench
This is a benchmark for OpenCV.js. Currently many primitive functions from core, image processing and video are supported.

## Usage
Simply launch run.html with a browser supporting ASM.js/WebAssembly. To switch between ASM.js/WASM simply repalce the opencv.js file in the root directory.

To enable/disable tests, change input image dimensions, and adjust the test time, please modify ```config.js```. It is also possible to run tests for certain number of iterations, by setting ```config.duration``` property to ```null```, and setting ```iterations``` property of kernels to  accordingly.
