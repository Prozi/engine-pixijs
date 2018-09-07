module.exports = function (config) {

  process.env.CHROME_BIN = require('puppeteer').executablePath()

  config.set({
    browsers: ['ChromeHeadless'],
    colors: true,
    client: {
      clearContext: false
    },
    failOnEmptyTestSuite: false,
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html', subdir: 'html' }
      ],
    },
    frameworks: [
      'jasmine',
    ],
    files: [
      'test/*.js',
    ],
    preprocessors: {
      'test/*.js': ['webpack', 'sourcemap'],
    },
    reporters: config.coverage ? ['progress', 'coverage'] : ['progress', 'kjhtml'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map'
    }
  })
}
