const gulp = require('gulp'); //using the gulp module
const babel = require('gulp-babel'); //using gulp babel
const browserify = require('gulp-browserify'); //using browserify

const browser = require('browser-sync').create(); // create a browser sync instance.

const Server = require('karma').Server;

const paths = {
    src:      'src/**/*.js',
    dest:     'build/',
    specSrc:  'src/tests/*Spec.js',
    specDest: 'build/tests',
    spec:     'build/tests/*Spec.js'
};

gulp.task('browserSync', function() {
    browser.init({
        server: {
            baseDir: "app"
        }
    });
});



function build(src, dst) {
    var pipe = gulp.src(src)
    .pipe(babel({
            presets: ['es2015']
        })), dest = gulp.dest(dst);
    return pipe.pipe(dest);
}

gulp.task('build-src', function() {
    return build(paths.src, paths.dest);
});

gulp.task('build-test', function() {
    return build(paths.specSrc, paths.specDest);
});

// Run the unit tests without any coverage calculations
gulp.task('test', ['build-src', 'build-test'], function(cb) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
        ,singleRun: true
    }, cb).start();
});

gulp.task('bundle', function() {
	return gulp.src('src/js/bundle.js')
			.pipe(browserify({ debug: true }))
			.pipe(gulp.dest('build/js'))
})

gulp.task('watch', ['browserSync'], function (){
  gulp.watch('src/js/**/*.js', browser.reload);
  gulp.watch('lib/js/**/*.js', browser.reload);
  gulp.watch('lib/css/**/*.css', browser.reload);
  gulp.watch('app/**/*.html', browser.reload);
  
})

gulp.task('build', ['build-src', 'build-test', 'bundle']);

gulp.task('default', ['build', 'test', 'browserSync']);

