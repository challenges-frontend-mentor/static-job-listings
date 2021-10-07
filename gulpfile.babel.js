//javascript
const gulp = require("gulp")

//PUG
const pug = require("gulp-pug")

//SASS
const sass = require("gulp-sass")
sass.compiler = require("sass");
//commoms

const production = false

//task

gulp.task("views", () =>{
  return gulp.src("./src/views/pages/*.pug")
  .pipe(pug({
    pretty: production ? false : true
  }))
  .pipe(gulp.dest("./public"))
})

gulp.task("sass", () =>{
  return gulp.src("./src/scss/style.scss")
  .pipe(sass({
    outputStyle: "expanded" // chance for "compressed" para codigo comprimido
  }))
  .pipe(gulp.dest("./public/css"))
})

gulp.task("default", () =>{
  gulp.watch("./src/views/**/*.pug", gulp.series("views"))
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass"))
})