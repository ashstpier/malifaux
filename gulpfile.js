var gulp 			= require('gulp'),
	fs				= require('fs'),
	s3				= require('gulp-s3')
	gulpBowerFiles  = require('gulp-bower-files')
	;

gulp.task('default', function() {
	console.log("Default isn't implemented");
});

gulp.task("vendor", function() {
    gulpBowerFiles().pipe(gulp.dest("./public/vendor"));
});

gulp.task('deploy', function() {
	var aws = JSON.parse(fs.readFileSync('./aws.json'));
	var options = {};
	gulp.src('./public/**/*.{js,coffee,map,ico,html,css,png,jpg,gif}', {read: true})
		.pipe(s3(aws, options));
});
