"use strict";
const gulp = require('gulp'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    hash = require('gulp-hash-filename'),
    rename  = require('gulp-rename'),
    replace = require('gulp-replace'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css');

const arrJs = [
                'public/js/main.js',
                'public/js/admin.js',
                'public/js/MooTools-Core-1.6.0-compressed.js',
                'public/js/MooTools-More-1.6.0-compressed.js',
            ],
    arrCss = [
        'public/css/style.css',
        'public/css/main.css',
        'public/css/admin.css',
    ],
    viewPath = 'views/layout.pug',
    distPath = 'public/dist/',
    format = '{name}.{hash:10}{ext}';

let hashJs,hashCss;

gulp.task('clean-js',() =>{
     del.sync(distPath + '*.js');
});

gulp.task('js', ['clean-js'],  () => {
     return gulp.src(arrJs)
        .pipe(concat('app.js'))
        .pipe(uglify()).on('error',function(err){
            console.log('compress error');
            console.log(err);
            process.exit(1);
        })
        .pipe(hash({format}))
        .pipe(rename( path => {
            hashJs = path.basename + path.extname;
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task('clean-css',()=>{
     del.sync(distPath + '*.css');
});

gulp.task('css',['clean-css'],() => {
    return gulp.src(arrCss)
        .pipe(concat('app.css'))
        .pipe(cleanCSS())
        .pipe(hash({format}))
        .pipe(rename( path => {
            hashCss = path.basename + path.extname;
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task('default', ['js','css'] , () => {
    gulp.src(viewPath)
        .pipe(replace(/app.*\.js/,hashJs))
        .pipe(replace(/app.*\.css/,hashCss))
        .pipe(gulp.dest('views'));
});