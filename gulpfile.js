const gulp = require('gulp'); // using the gulp module
const babel = require('gulp-babel'); // using gulp babel
const browser = require('browser-sync'); // browser sync instance

const Server = require('karma').Server;

const paths = {
  src: 'src/**/*.js',
  dest: 'build/',
  specSrc: 'src/tests/',
  specDest: 'build/tests',
  spec: 'build/tests/'
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

gulp.task('build-src', () => build(paths.src, paths.dest));

gulp.task('build-test', () => build(paths.specSrc, paths.specDest));

// Run the unit tests without any coverage calculations
gulp.task('test', ['build-src', 'build-test'], (cb) => {
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, cb).start();
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/js/**/*.js', browser.reload);
  gulp.watch('lib/js/**/*.js', browser.reload);
  gulp.watch('lib/css/**/*.css', browser.reload);
  gulp.watch('**/*.html', browser.reload);
});

gulp.task('build', ['build-src', 'build-test']);

gulp.task('default', ['build', 'test', 'browserSync']);

