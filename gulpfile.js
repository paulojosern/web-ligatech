"use strict";

var gulp = require("gulp");
var babel = require("gulp-babel");
// var minify = require("gulp-babel-minify");
var sass = require("gulp-sass");
var cssmin = require("gulp-cssnano");
var pug = require("gulp-pug");
// var minify = require("gulp-minify");
var browserSync = require("browser-sync").create();

sass.compiler = require("node-sass");

gulp.task("serve", ["sassmin", "pug", "minjs"], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./src/views/**/*.pug", ["pug"]);
  gulp.watch("./src/sass/**/*.scss", ["sassmin"]);
  gulp.watch("./src/js/**/*.js", ["minjs"]);
  gulp.watch("./index.html").on("change", browserSync.reload);
});

gulp.task("minjs", () => {
  return gulp
    .src(["./src/js/*.js"])
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(gulp.dest("./js"))
    .pipe(browserSync.stream());
});

// gulp.task("minjs", function() {
//   return gulp
//     .src(["./src/js/*.js"])
//     .pipe(
//       babel({
//         presets: ["@babel/env"]
//       }),
//       minify({
//         ext: {
//           min: "-min.js"
//         },
//         ignoreFiles: ["-min.js", ".min.js", "min.js"]
//       })
//     )
//     .pipe(gulp.dest("./js"))
//     .pipe(browserSync.stream());
// });

// gulp.task("minjs", function() {
//   return gulp
//     .src(["./src/js/*.js"])
//     .pipe(
//       minify({
//         mangle: {
//           keepClassName: true
//         }
//       })
//     )
//     .pipe(gulp.dest("./js"))
//     .pipe(browserSync.stream());
// });

// gulp.task("minjs", function() {
//   return (
//     gulp.src(["./src/js/*.js"]).pipe(
//       minify({
//         ext: {
//           min: "-min.js"
//         },
//         ignoreFiles: ["-min.js", ".min.js", "min.js"]
//       })
//     ),
//     babel({
//       presets: ["@babel/env"]
//     })
//       .pipe(gulp.dest("./js"))
//       .pipe(browserSync.stream())
//   );
// });

gulp.task("sassmin", function() {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("pug", function() {
  return gulp
    .src("./src/views/*.pug")
    .pipe(
      pug({
        doctype: "html",
        pretty: true
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
