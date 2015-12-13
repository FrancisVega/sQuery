'use strict';

//
// ZEN Sketch Plugin Repo
// 2015
//

// Gulp itself
var gulp   = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
// Directorios del proyecto
//
var dirs = {
    src: '',
    dst: '/sketchplugins/ZEN',
};

// Watch
//
gulp.task('watch', function(){
    gulp.watch(dirs.src + 'ZEN/**/*', ['copy']);
});


// Copia los plugins en la carpeta de plugins de sketch mediante el softlink
// /sketchplugins
//
gulp.task('copy', function() {
    // Archivos en el raiz
    gulp.src(['ZEN/**/*'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dst));
});

gulp.task('lint', function() {
  return gulp.src(dirs.src + 'ZEN/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// --------------------------------------------------------------------------{{{
// TAREAS GULP
gulp.task('default', ['watch']);
gulp.task('build', function(callback) {
    runSequence(
        'copy',
        callback);
});
// }}}
