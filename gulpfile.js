// sQuery gulpfile

// Requires
var gulp   = require('gulp');

// Paths
var dirs = {
  src: '',
  // Copy sQuery into zen sketch plugin bundle in order to test sQuery methods
  dst: '/sketchplugins/zen.sketchplugin/Contents/Sketch/sQuery',
};

// Watch
gulp.task('watch', function(){
  gulp.watch(dirs.src + '**/*', ['copy']);
});

// Copy into sketch plugin folder
gulp.task('copy', function() {
  console.log("Copy sQuery in " + dirs.dst);
  gulp.src(['plugins', 'sQuery.js'], {cwd: dirs.src})
  .pipe(gulp.dest(dirs.dst));
  gulp.src(['plugins/**/*'], {cwd: dirs.src})
  .pipe(gulp.dest(dirs.dst+"/plugins"));
});

// Default task
gulp.task('default', ['copy','watch']);
