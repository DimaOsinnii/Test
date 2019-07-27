const {watch, src, dest, task, series, parallel} = require('gulp');
const sass = require('gulp-sass');
const sourcepams = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const pipeline = require('readable-stream').pipeline;
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const  bable = require('gulp-babel');


function addStyles(paths, outputFilename) {
    return pipeline(
        src(paths),
        sourcepams.init(),
        sass(),
        concat(outputFilename),
        autoprefixer('last 10 versions', 'ie 9'),
        cleanCSS(),
        sourcepams.write('./'),
        dest('./build/css'),
        browserSync.stream()
    )
}
function styles() {
    return addStyles([
        './app/styles/index.sass',
        './node_modules/normalize.css/normalize.css'
    ],'main.css')
}

function scripts() {
    return pipeline(
        src(['./app/scripts/*.js']),
        sourcepams.init(),
        uglify(),
        bable({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }),
        concat('main.js'),
        sourcepams.write('./'),
        dest('./build/js'),
        browserSync.stream()
    )
}

function clean() {
    return del(['build/*'])
}

function watcher() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    watch('.app/styles/**/*.less', styles);
    watch('./app/**/*.js', scripts);
    watch("/*.html").on('change', browserSync.reload);
}

task('styles', styles);
task('scripts', scripts);
task('del', clean);
task('watch', watcher);
task('build', series(clean, parallel(styles, scripts)));
task('dev', series('build', watcher));