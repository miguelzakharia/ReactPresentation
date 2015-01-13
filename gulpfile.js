'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./src/main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('[' + updateStart + '] Change detected. Updating...');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('bundle.js'))
        // This is where you add uglifying etc.
        .pipe(gulp.dest('./build/'));
        console.log('[' + Date.now() + '] Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('css', function () {
    gulp.watch('styles/**/*.css', function () {
        return gulp.src('styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/'));
    });
});

// start server
gulp.task('browser-sync', function() {
    //See 'http://www.browsersync.io/docs/options/' for more options.
    browserSync({
        server: {
            baseDir: "./"
        },
        files: ["build/**"], //Reloads browsers when a change in this directory is detected.
        startPath: "/"
        //port: 8080 //Defaults to 3000.
    });
});

//Don't really need this because I'm telling browserSync to watch the build folder in its config.
gulp.task('browser-reload', function(){
    browserSync.reload;
});

gulp.task('default', ['browserify', 'browser-sync'], function(){
    // gulp.watch('./build/bundle.js', ['browser-reload']);
});