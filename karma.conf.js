module.exports = function (config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
   
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    },
    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/ecf'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    autoWatch: false,
    singleRun: true,
    logLevel: config.LOG_INFO
  });
};
