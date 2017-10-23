var gulp = require('gulp'); //load gulp first!!

// Now that we've installed the uglify package we can require it:
var uglify = require('gulp-uglify'), //comma for using multiple variables
    rename = require('gulp-rename'), //done with var and close with ;
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyError = require('gulp-prettyerror');

gulp.task('sass', function() {
  gulp.src('./sass/style.scss')
      .pipe(prettyError()) //Error Handling
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
  }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});



gulp.task('scripts', ['lint'], function() {
  // place code for your default task here
  gulp.src('./js/*.js') // What files do we want gulp to consume?
      .pipe(uglify()) // Call the uglify function on these files
      .pipe(rename({ extname: '.min.min.js' })) // Rename the uglified file
      .pipe(gulp.dest('./build/js')) // Where do we put the result?

});

gulp.task('lint', () => {  // JS 6 90 => is function()
  // ESLint ignores files with "node_modules" paths. 
  // So, it's best to have gulp ignore the directory as well. 
  // Also, Be sure to return the stream from the task; 
  // Otherwise, the task may end before the stream has finished. 
  return gulp.src(['./js/*.js','!node_modules/**'])
      // eslint() attaches the lint output to the "eslint" property 
      // of the file object so it can be used by other modules. 
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console. 
      // Alternatively use eslint.formatEach() (see Docs). 
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on 
      // lint error, return the stream and pipe to failAfterError last. 
      .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch('sass/*scss', ['sass']);
  gulp.watch('./js/*.js', ['scripts']);
});  // if file in js changes, run the scripts task to uglify it.

gulp.task('browser-Sync', function() {
     browserSync.init({
       server: {
         proxy: "./"
       }
     }); 

//gulp.task('say_hello', function(){
//  console.log('Hello!');
//});
    
gulp.watch(['*.html', 'build/css/*,css', 'build.js/*.js']).on('change', browserSync.reload);  
}); //watch for changes in css/js/html files and run the browser reload




// Modify our default task method by passing an array of task names
gulp.task('default', ['watch', 'browser-Sync']);

