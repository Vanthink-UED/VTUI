var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var path = require('path');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var path2 = {
    'css':['./dist/*.css'],
    'js':['./public/js/**/*.js','!./js/city.min.js','!./js/lib/jquery.validVal-customValidations.js']
};

gulp.task('less', function () {
  return gulp.src(['./less/vtui.less'])
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            gutil.beep();
            this.emit('end');
        }))
       .pipe(less())

    //.pipe(minifycss())
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify', function () {
    gulp.src('./dist/vtui.css')
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'))
    ;
});



gulp.task('watch',function(){
    gulp.watch('./less/**/*.less', function(){
        gulp.run('less');
        gulp.run('minify');
    });

});

gulp.task('default',['watch']);
