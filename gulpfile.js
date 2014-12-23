var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var lint = require('gulp-jshint')
var refresh = require('gulp-livereload')

var paths = {
    scripts: [
        './client/js/*.js',
        './client/js/models/*.js',
        './client/js/routes/*.js',
        './client/js/views/*.js',
    ],
    styles: [
        './client/css/**/*.css'
    ],
    server: {

    }
}

gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        .pipe(lint())
        .pipe(lint.reporter('jshint-stylish'));
})

gulp.task('lint', function() {
    gulp.src('./**/*.js')
        .pipe(lint())
        .pipe(lint.reporter('jshint-stylish'));
})

gulp.task('serve', function () {
    // refresh.listen();
    nodemon({ script: 'server.js' })
        // .on('change', ['lint'])
    // gulp.src('./server.js')
    //     .pipe(refresh())
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts'])
})


gulp.task('develop', ['watch'])
