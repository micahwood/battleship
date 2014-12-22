var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var jshint = require('gulp-jshint')
var refresh = require('gulp-livereload')

gulp.task('lint', function() {
    gulp.src('./**/*.js')
        .pipe(jshint())
})

gulp.task('serve', function () {
    // refresh.listen();
    nodemon({ script: 'server.js' })
        .on('change', 'lint')
    // gulp.src('./server.js')
    //     .pipe(refresh())
});

gulp.task('watch', function() {
    gulp.watch(['./**/*.js'])
})


gulp.task('develop', ['lint', 'serve'])
