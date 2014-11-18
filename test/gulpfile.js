var brec = require('brec'),
    gulp = require('gulp'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('sass/main.scss')
    .pipe(sass({
      includePaths: [brec.sass]
    }))
    .pipe(prefix())
    .pipe(gulp.dest('css'))
});

gulp.task('connect', function () {
  var connect = require('connect');

  var app = connect()
    .use(require('serve-static')('./'))

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('build', ['styles']);
