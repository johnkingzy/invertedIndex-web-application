const gulp = require('gulp'); //using the gulp module

const bs = require('browser-sync').create(); // create a browser sync instance.

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        },
        ws: true //enables websockets
    });
});

