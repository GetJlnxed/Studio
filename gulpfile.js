const gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  pipeline = require('readable-stream').pipeline,
  autoprefixer = require('gulp-autoprefixer'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  zip = require('gulp-zip'),
  terser = require('gulp-terser'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync');


// Cleaning

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('clean', async function () {
  return del.sync('dist');
});



// browserSync

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./app"
  }
  });
});



// JS

gulp.task('cleanJS', async function () {
  return del.sync('app/js/*.min.js')
})

gulp.task('minJS', function () {
  return pipeline(
    gulp.src('app/js/raw/*.js'),
    terser(),
    rename(function (path) {
      path.extname = ".min.js";
    }),
    gulp.dest('app/js'),
    browserSync.reload({
      stream: true
    })
  );
});

gulp.task('formatJS', gulp.parallel('cleanJS', 'minJS'));



// CSS

gulp.task('cleanCSS', async function () {
  return del.sync('app/css/*.min.css')
})

gulp.task('minCSS', function () {
  return pipeline(
    gulp.src('app/css/raw/*.css'),
    cleanCSS(),
    rename(function (path) {
      path.extname = ".min.css";
    }),
    autoprefixer({
      cascade: false
    }),
    gulp.dest('app/css'),
    browserSync.reload({
      stream: true
    })
  );
});

gulp.task('formatCSS', gulp.parallel('cleanCSS', 'minCSS'));



// HTML

gulp.task('HTML', function () {
  return pipeline(
    gulp.src('app/*.html'),
    browserSync.reload({
      stream: true
    })
  );
});



// IMG

gulp.task('img', function () {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      // .pipe(imagemin({ // Сжатие без кеширования
      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })) /**/ )
    .pipe(gulp.dest('dist/img'));
});



// Prebuild

gulp.task('prebuild', async function () {

  var buildJS = gulp.src('app/js/**.min.js')
    .pipe(gulp.dest('dist/js'))

  var buildCSS = gulp.src('app/css/**.min.css')
    .pipe(gulp.dest('dist/css'))

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

  var buildDoc = gulp.src('app/doc/**/*')
    .pipe(gulp.dest('dist/doc'))

  var buildLibs = gulp.src('app/js/libs/**/*', {
      allowEmpty: true
    })
    .pipe(gulp.dest('dist/js/libs'))

  var buildHTMLs = gulp.src('app/**.html')
    .pipe(gulp.dest('dist'))

  var buildPHP = gulp.src('app/php/**/*')
    .pipe(gulp.dest('dist/php'))

  var buildOther = gulp.src(['app/robots.txt', 'app/sitemap.xml', 'app/browserconfig.xml', 'app/humans.txt', 'app/LICENSE.txt', 'app/site.webmanifest'], {
      allowEmpty: true
    })
    .pipe(gulp.dest('dist'))

  var buildHtacces = gulp.src('app/.*')
    .pipe(gulp.dest('dist'))
});

gulp.task('zip', () =>
  gulp.src('dist/**/*')
  .pipe(zip('build.zip'))
  .pipe(gulp.dest('dist'))
);



// watch

gulp.task('watch', function () {
  gulp.watch('app/js/raw/*.js', gulp.parallel('formatJS'));
  gulp.watch('app/css/raw/*.css', gulp.parallel('formatCSS'));
});



// default

gulp.task('default', gulp.parallel('browserSync', 'watch'));



// build

gulp.task('build', gulp.series('clean', 'formatCSS', 'formatJS', 'img', 'prebuild', 'zip'));
