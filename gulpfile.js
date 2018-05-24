'use strict';

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const notify       = require('gulp-notify');
const csso         = require('gulp-csso');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const glob         = require('glob');                 // パターンマッチでパスを取得
const del          = require('del');                  // 指定ファイル削除
const exec         = require('child_process').exec;   // node からシェルコマンドを実行
const sequence     = require('run-sequence');         // タスクの逐次処理


/* Sass コンパイル設定
 * ---------------------------------------------------------------------- */
const AUTOPREFIXER_BROWSERS = [
    'last 2 versions',
    'ie >= 11',
    'iOS >= 9',
    'android >= 4.4'
];
const PROCESSORS = [
    autoprefixer({ browsers : AUTOPREFIXER_BROWSERS })
];
const SASS_OPTIONS = {
    outputStyle : 'expanded'
};


/*
 * Sass コンパイル
 * ------------------------------------------------ */
gulp.task('sass', () => {
    return gulp
        .src('./sass/style.scss')
        .pipe(sass(SASS_OPTIONS).on('error', notify.onError( error => { return error.message; } )))
        .pipe(postcss(PROCESSORS))
        .pipe(gulp.dest('./css/'));
});


/*
 * ファイルの削除
 * ------------------------------------------------ */
gulp.task('clean.css', () => {
    return del('./css/');
});
gulp.task('clean.pdf', () => {
    return del('./file/pdf/');
});