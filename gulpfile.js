var gulp 			= require('gulp'),
	fs				= require('fs'),
	s3				= require('gulp-s3')
	express			= require('express'),
	gulpBowerFiles  = require('gulp-bower-files')
	;

gulp.task('default', function() {
	console.log("Default isn't implemented");
});

gulp.task("vendor", function() {
    gulpBowerFiles().pipe(gulp.dest("./public/vendor"));
});

gulp.task('server', function() {
	express = require('express')
	app = express()
	app.use(express.static(__dirname + '/public'))
	app.use(express.static(__dirname + '/private'))
	app.listen(9000);
});

gulp.task('deploy', function() {
	var aws = JSON.parse(fs.readFileSync('./aws.json'));
	var options = {};
	gulp.src('./public/**/*.{js,coffee,map,ico,html,css,png,jpg,gif}', {read: true})
		.pipe(s3(aws, options));
});
