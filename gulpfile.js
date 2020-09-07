"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var svgmin =  require('gulp-svgmin'); 
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/sprite/*.svg")
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("svg", function () {
  return gulp.src("source/img/icon/*.svg")
  .pipe(svgmin())
  .pipe(gulp.dest("source/img/icon"));
});

gulp.task("scripts", function() {
  return gulp.src("source/js/*.js")
      .pipe(concat("main.js"))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest("build/js"));
});

gulp.task("js:copy", function() {
return gulp.src("source/js/libs/*.js")
      .pipe(gulp.dest("build/js"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/css/normalize.css",
  "source/img/**",
  "source/handler/**",
  "source/*.ico"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
 });

 gulp.task("clean", function () {
  return del("build");
 });

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html"));
  gulp.watch("source/js/main.js", gulp.series("scripts", "refresh"));
  gulp.watch("source/js/libs/*.js", gulp.series("js:copy"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
  });

gulp.task("start", gulp.series("css", "server"));

gulp.task("build", gulp.series(
  "clean",
  "images",
  "webp",
  "copy",
  "css",
  "scripts",
  "js:copy",
  "sprite",
  "html"
  ));
