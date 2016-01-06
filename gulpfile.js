// sQuery gulpfile

// Requires
var gulp   = require('gulp');

var squeryfile = 'sQuery.js';
var testfile = 'sQueryTests.js';

// Paths
var dirs = {
  src: '',
  // Copy sQuery into zen sketch plugin bundle in order to test sQuery methods
  test: 'test/',
  dst: '/sketchplugins/zen.sketchplugin/Contents/Sketch/sQuery',
  testdst: '/sketchplugins/zen.sketchplugin/Contents/Sketch/sQuery/test',
};

// Watch
gulp.task('watch', function(){
  gulp.watch(dirs.src + '**/*', ['copy']);
});

// Copy into sketch plugin folder
gulp.task('copy', function() {
  console.log("Copy "+squeryfile+" in " + dirs.dst);
  gulp.src(['plugins', 'test', squeryfile], {cwd: dirs.src})
  .pipe(gulp.dest(dirs.dst));

  console.log("Copy "+ dirs.test + testfile + " in " + dirs.testdst);
  gulp.src([testfile], {cwd: dirs.test})
  .pipe(gulp.dest(dirs.testdst));

  gulp.src(['plugins/**/*'], {cwd: dirs.src})
  .pipe(gulp.dest(dirs.dst+"/plugins"));
});

// Default task
gulp.task('default', ['copy','watch']);
