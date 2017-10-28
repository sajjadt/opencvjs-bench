# opencvjs-bench
This is a benchmark for OpenCV.js. Currently several primitive functions from core and image processing modules are included. An online version can be accessed by navigating to [this URL](https://sajjadt.github.io/opencvjs-bench/run.html).

# Usage
 run.html with a browser supporting ASM.js/WebAssembly. To switch between ASM.js/WASM simply repalce the opencv.js file in the root directory.


## Node.js
Execute run.js script.
```sh
cd src
nodejs run.js
```

## Browser
First, we need to build the project for browsers using Webpack.
```sh
npm i webpack
webpack
```
Navigate to ```run.html``` with a browser that supports either ASM.js or WebAssembly.

To switch between ASM.js/WASM simply repalce the opencv.js file in the root directory with the respective build. To enable/disable some of the tests, to change input image dimensions, or to adjust the test duration, please modify ```config.js```.
It is also possible to run tests for certain number of iterations, ---instead of having fixed number of iterations--- by setting ```config.duration``` property to ```null```, and setting ```iterations``` property of kernels accordingly.
