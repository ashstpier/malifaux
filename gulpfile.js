var gulp          = require('gulp'),
  fs              = require('fs'),
  s3              = require('gulp-s3')
  sort            = require('gulp-sort')
  express         = require('express'),
  gulpBowerFiles  = require('gulp-bower-files'),
  coffee          = require('gulp-coffee'),
  gutil           = require('gutil'),
  watch           = require('gulp-watch'),
  flatten         = require('gulp-flatten')
  bodyParser      = require('body-parser'),
  secret          = require( 'secret' ),
  _               = require('underscore'),
  argv            = require('yargs').argv,
  concat          = require('gulp-concat');

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

gulp.task('default', function() {
  console.log("Default isn't implemented");
});

gulp.task('sideload', function() {
  if (argv.template) {
    fs.readFile(argv.template, 'utf8', function (err, body) {
      if (err) { return console.log(err); }
      var data = JSON.parse(body)
      secret.set(data.key, data)
    });
  }
});

gulp.task("vendor", function() {
    gulpBowerFiles().pipe(gulp.dest("./public/vendor"));
});

gulp.task('express', function() {
  express = require('express')
  app = express()

  app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
  app.use(bodyParser.json({extended: true, limit: '50mb'}));
  app.use(express.static(__dirname + "/public"));
  app.use(express.static(__dirname + '/private'));

  var router = express.Router();

  router.route('/reports')
    .get(function(req, res) {
      storage = secret.getAll()
      templates = _.map(storage, function(v, k) { return v; })
      res.send( templates );
    });

  router.route('/reports/:key')
    .get(function(req, res) { res.json(secret.get(req.params.key)); })
    .put(function(req, res) { res.json(secret.set(req.params.key, req.body)); })
    .delete(function(req, res) { res.json(secret.remove(req.params.key)); });

  app.use(router);
  app.listen(9000);
});

gulp.task('server', ["express", "css", "coffee", "jit"], function() { } );

gulp.task('css', function() {
  gulp.src('./public/widgets/**/*.css')
    .pipe(concat('widgets.css'))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('coffee', ['app', 'widgets'], function() {});

gulp.task('app', function() {
  gulp.src('./public/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(sort())
    .pipe(flatten())
    .pipe(gulp.dest('./public/js'))
});

gulp.task('widgets', function() {
  gulp.src('./public/widgets/**/*.coffee')
    .pipe(coffee().on('error', gutil.log))
    .pipe(flatten())
    .pipe(sort())
    .pipe(concat('widgets.js'))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('jit-app', function() {
  gulp.watch('./public/coffee/*.coffee', ['app']);
});

gulp.task('jit-widgets', function() {
  gulp.watch('./public/widgets/**/*.coffee', ['widgets']);
});

gulp.task('jit-css', function() {
  gulp.watch('./public/widgets/**/*.css', ['css']);
})

gulp.task('jit', ['jit-app', 'jit-widgets', 'jit-css'], function() { });

gulp.task('deploy', function() {
  var aws = JSON.parse(fs.readFileSync('./aws.json'));
  var options = {};
  gulp.src('./public/**/*.{js,map,ico,html,css,png,jpg,gif,svg,eot,svg,ttf,woff}', {read: true})
    .pipe(s3(aws, options));
});