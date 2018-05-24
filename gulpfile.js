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

/*
 * ファイルの削除
 * ------------------------------------------------ */
gulp.task('clean.pdf', () => {
    return del('./file/pdf/');
});