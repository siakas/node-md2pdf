const markdownpdf = require('markdown-pdf');    //
const fs          = require('fs');              //
const path        = require('path');            //
const mkdirp      = require('mkdirp');          // ディレクトリ作成
const filelist    = require('node-filelist');   //
const log         = require('log-util');        //
  let _filelist   = [];

function createDistDir () {
    mkdirp('./file/pdf', (err) => {
        readDir();
    });
}

function readDir () {
    filelist.read(['./file/markdown'], { 'ext' : 'md' }, (results) => {
        _filelist = results;
        // console.log(_filelist);
        doTask();
    });
}

function doTask () {
    if (_filelist && _filelist.length > 0) {
        const filePath = _filelist.shift();
        const pdfPath  = ('file/pdf/' + path.basename(filePath.path)).replace(path.extname(filePath.path), '.pdf');
        convertPDF(filePath.path, pdfPath);
    }
}

function convertPDF (markdownPath, pdfPath) {
    markdownpdf({
        cssPath     : 'css/style.css',
        paperFormat : 'A4',
        renderDelay : 5000,
        paperBorder : '2ch'
    }).from(markdownPath).to(pdfPath, () => {
        log.info(' => ' + pdfPath);
        doTask();
    });
}

function main () {
    createDistDir();
}

main();