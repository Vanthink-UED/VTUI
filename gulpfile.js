var gulp = require('gulp');
//var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var path = require('path');
var gutil = require('gulp-util');
var path2 = {
    'css':['./dist/*.css'],
    'js':['./public/js/**/*.js','!./js/city.min.js','!./js/lib/jquery.validVal-customValidations.js']
};

gulp.task('less', function () {
  return gulp.src(['./public/less/style.less'])
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            gutil.beep();
            this.emit('end');
        }))
       .pipe(less())

    .pipe(minifycss())
    .pipe(gulp.dest('./css'));
});



gulp.task('watch',function(){
    gulp.watch('./less/**/*.less', function(){
        gulp.run('less');
    });
        //gulp.watch(path['css'],['minifycss']);
        //gulp.watch(path['js'],['uglifyjs']);

});

gulp.task('default',['watch']);
