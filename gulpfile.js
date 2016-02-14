// sQuery gulpfile

// Requires
var gulp   = require('gulp');

var squeryfile = 'sQuery.js';
var testfile = 'sQueryTests.js';
var liveQueryFile = 'liveQuery.js';

// Paths
var dirs = {
  src: '',
  // Copy sQuery into zen sketch plugin bundle in order to test sQuery methods
  test: 'test/',
  live: 'liveQuery/',
  dst: '/sketchplugins/zen.sketchplugin/Contents/Sketch/sQuery',
  testdst: '/sketchplugins/zen.sketchplugin/Contents/Sketch/sQuery/test',
  livedst: '/sketchplugins/zen.sketchplugin/Contents/Sketch/sQuery/liveQuery'
};

// Watch
gulp.task('watch', function(){
  gulp.watch(dirs.src + '**/*', ['copy']);
});

// Copy into sketch plugin folder
gulp.task('copy', function() {
  console.log("Copy "+squeryfile+" in " + dirs.dst);
  gulp.src(['plugins', 'test', 'liveQuery', squeryfile], {cwd: dirs.src})
  .pipe(gulp.dest(dirs.dst));

  console.log("Copy " + dirs.live + liveQueryFile + " in " + dirs.livedst);
  gulp.src([liveQueryFile], {cwd: dirs.live})
  .pipe(gulp.dest(dirs.livedst));

  console.log("Copy "+ dirs.test + testfile + " in " + dirs.testdst);
  gulp.src([testfile], {cwd: dirs.test})
  .pipe(gulp.dest(dirs.testdst));

  gulp.src(['plugins/**/*'], {cwd: dirs.src})
  .pipe(gulp.dest(dirs.dst+"/plugins"));
});

// Default task
gulp.task('default', ['copy','watch']);
