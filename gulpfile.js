var gulp = require('gulp');
//var debug = require('gulp-debug');
var react = require('gulp-react');
var browserify = require('gulp-browserify');

gulp.task('default', ['scripts'], function () { });

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('./public/javascripts/public/main.js')
        //.pipe(debug({verbose: true}))
        .pipe(browserify({
            debug: true,
            transform: ['reactify'],
            extensions: ['.jsx']
        }))
        .pipe(gulp.dest('./public/javascripts_bundled/'));

    gulp.src('./public/javascripts/app/client-app.js')
        .pipe(gulp.dest('./public/javascripts_bundled/'));
});

gulp.task('watch', function(){
    gulp.watch('./public/javascripts/**/*.*', ['scripts']);
    //gulp.watch('./client_scripts/**/*.jsx', ['jsx']);
});