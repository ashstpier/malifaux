var gulp 					= require('gulp'),
	fs							= require('fs'),
	s3							= require('gulp-s3')
	express					= require('express'),
	gulpBowerFiles  = require('gulp-bower-files'),
	coffee 					= require('gulp-coffee'),
	gutil 					= require('gutil'),
	watch						= require('gulp-watch'),
	flatten					= require('gulp-flatten')
  bodyParser      = require('body-parser')
	;

gulp.task('default', function() {
	console.log("Default isn't implemented");
});

gulp.task("vendor", function() {
    gulpBowerFiles().pipe(gulp.dest("./public/vendor"));
});

gulp.task('express', function() {
	express = require('express')
	app = express()

  app.use(bodyParser());
  app.use(express.static(__dirname + "/public"));
  app.use(express.static(__dirname + '/private'));
  
  var router = express.Router();

  router.get('/', function(req, res) {
    res.json( { message: 'hooray! welcome to our api!' } );
  });

  router.route('/reports')
    .post(function(req, res) {
      res.json( { } );      
    })

    .get(function(req, res) {
      res.json( [{ "key" : "23213-213213-213-1213", "layout" : [], "name" : "Hello World" }] );
    });

  router.route('/reports/:key')
    .get(function(req, res) {
      res.json( { "key" : "23213-213213-213-1213", "layout" : [], "name" : "Hello World" } );
    })

    .put(function(req, res) {
      res.json( [{ "key" : "23213-213213-213-1213", "layout" : [], "name" : "Hello World" }] );
    })

    .delete(function(req, res) {
      res.json({ message: 'Ok' });
    });

  app.use(router);
	app.listen(9000);
});

gulp.task('server', ["express", "coffee", "jit"], function() { } );

gulp.task('coffee', function() {
  gulp.src('./public/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(flatten())
    .pipe(gulp.dest('./public/js'))

  gulp.src('./public/widgets/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(flatten())
    .pipe(gulp.dest('./public/js'))
});

gulp.task('jit-app', function() {
	gulp.src('./public/coffee/*.coffee', { read: false })
		.pipe(watch())
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(flatten())
		.pipe(gulp.dest('./public/js'))
});

gulp.task('jit-widgets', function() {
	gulp.src('./public/widgets/**/*.coffee', { read: false })
		.pipe(watch())
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(flatten())
		.pipe(gulp.dest('./public/js'))
});

gulp.task('jit', ['jit-app', 'jit-widgets'], function() { });

gulp.task('deploy', function() {
	var aws = JSON.parse(fs.readFileSync('./aws.json'));
	var options = {};
	gulp.src('./public/**/*.{js,coffee,map,ico,html,css,png,jpg,gif}', {read: true})
		.pipe(s3(aws, options));
});
