var gulp   = require('gulp')
var babel  = require('gulp-babel')
var rjs    = require('requirejs')
var fs     = require('fs')
var mkdirp = require('mkdirp')
var del    = require('del')
var runseq = require('run-sequence')

var pluginName = 'extplug/meh-icons'

gulp.task('clean-lib', function (cb) {
  del('lib', cb)
})

gulp.task('babel', function () {
  return gulp.src('src/**/*')
    .pipe(babel({ modules: 'ignore' }))
    .pipe(gulp.dest('lib/'))
})

gulp.task('rjs', function (done) {
  // these paths are defined at runtime, so the r.js optimizer can't find them
  var paths = {
    // plug files, define()d by plug-modules
    plug: 'empty:',
    // extplug defines
    extplug: 'empty:',
    // plug.dj language files
    lang: 'empty:',
    // libraries used by plug.dj
    backbone: 'empty:',
    jquery: 'empty:',
    underscore: 'empty:',
    // libraries used by extplug
    meld: 'empty:',
    'plug-modules': 'empty:'
  }

  // location of the files for this plugin
  paths[pluginName] = 'lib/'

  rjs.optimize({
    baseUrl: './',
    name: pluginName + '/main',
    paths: paths,
    optimize: 'none',
    out: function (text) {
      mkdirp('build', function (e) {
        if (e) done(e)
        else   fs.writeFile('build/meh-icons.js', text, done)
      })
    }
  })
})

gulp.task('build', function () {
  return runseq('clean-lib', 'babel', 'rjs')
})
