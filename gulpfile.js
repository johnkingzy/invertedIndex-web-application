const gulp = require('gulp');

const babel = require('gulp-babel');

const browser = require('browser-sync');

const Server = require('karma').Server;

const paths = {
  src: 'src/**/*.js',
  dest: 'build/',
  specSrc: 'src/**/*.spec.js',
  specDest: 'build/',
  jsonSrc: 'src/**/*.json',
  jsonDest: 'build/'
};

gulp.task('browserSync', () => {
  browser.init({
    server: {
      baseDir: './'
    }
  });
});

const build = (src, dst) =>
  gulp.src(src)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(dst));

const bundle = (src, dst) =>
  gulp.src(src)
  .pipe(gulp.dest(dst));

gulp.task('build-src', () => build(paths.src, paths.dest));

gulp.task('build-test', () => build(paths.specSrc, paths.specDest));

gulp.task('build-json', () => bundle(paths.jsonSrc, paths.jsonDest));

// Run the unit tests without any coverage calculations
gulp.task('test', ['build-json', 'build-src', 'build-test'], (cb) => {
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, cb).start();
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/js/**/*.js', browser.reload);
  gulp.watch('lib/js/**/*.js', browser.reload);
  gulp.watch('lib/css/**/*.css', browser.reload);
  gulp.watch('*.html', browser.reload);
});

gulp.task('build', ['build-json', 'build-src', 'build-test']);

gulp.task('default', ['build', 'test', 'watch']);

