var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var preset =  require('babel-preset-es2015');
var watchify = require('watchify');

gulp.task('styles', function(){
	gulp
		.src('assets/scss/index.scss')
		.pipe(sass())
		.pipe(rename('app.css'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('images', function(){
	gulp
		.src('assets/images/*')
		.pipe(gulp.dest('public/images'));
});

function compile(watch){
	var bundle = browserify('./src/index.js');
	if(watch){
		bundle = watchify(bundle);
		bundle.on('update', function(){
			console.log("--> Bundling...");
			rebundle();
		});
	}
	function rebundle(){
		bundle
			.transform(babel, {presets: ["es2015"], plugins: ['syntax-async-functions', 'transform-regenerator']})
	    	.bundle()
	    	.on('error', function(err){console.log(err); this.emit('end'); })
	    	.pipe(source('index.js'))
	    	.pipe(rename('app.js'))
	    	.pipe(gulp.dest('public/js'));
	}
	rebundle();
}

gulp.task('build', function(){
	return compile();
});

gulp.task('watch', function(){
	return compile(true);
});

gulp.task('default',['styles', 'images', 'build']);