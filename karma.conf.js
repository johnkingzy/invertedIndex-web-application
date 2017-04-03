// Karma configuration
// Generated on Wed Mar 22 2017 10:35:40 GMT+0100 (WAT)

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-browserify'
    ],

    // list of files / patterns to load in the browser
    files: [
      'build/js/invertindex.js',
      'build/tests/*.js',
    ],

    browserify: {
      // don't forget to register the extensions
      extensions: ['.js', '.json']
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'build/tests/*.js': ['browserify'],
      'build/js/invertindex.js': ['coverage'],
      'src/tests/*.js': ['coverage'],
      'src/js/invertindex.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values
    logLevel: config.LOG_INFO,


    // enable
    // disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
