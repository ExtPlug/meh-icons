var gulp   = require('gulp')
var babel  = require('gulp-babel')
var rjs    = require('requirejs')
var fs     = require('fs')

gulp.task('babel', function () {
  return gulp.src('src/**/*')
    .pipe(babel({ modules: 'ignore' }))
    .pipe(gulp.dest('lib/'))
})

gulp.task('rjs', [ 'babel' ], function (done) {
  rjs.optimize({
    baseUrl: './',
    name: 'extplug/meh-icons/main',
    paths: {
      // plug-modules defines, these are defined at runtime
      // so the r.js optimizer can't find them
      plug: 'empty:',
      'extplug/meh-icons': 'lib/',
      extplug: 'empty:',
      lang: 'empty:',
      backbone: 'empty:',
      jquery: 'empty:',
      underscore: 'empty:',
      meld: 'empty:',
      'plug-modules': 'empty:'
    },
    optimize: 'none',
    out: function (text) {
      fs.writeFile('build/meh-icons.js', text, done)
    }
  })
})

gulp.task('build', [ 'rjs' ])
