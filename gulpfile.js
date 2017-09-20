const gulp = require('gulp')
const { promisify } = require('util')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const less = require('gulp-less')
const path = require('path')
const mkpath = require('mkpath')
const webpack = require('webpack')
const gulpCopy = require('gulp-copy')

/**
 * CREATE FOLDERS
 */
async function createFolders () {
  const promiseMkpath = promisify(mkpath)

  return Promise.all([promiseMkpath('dist/style'), promiseMkpath('dist/script')])
}

/**
 * CLEAN FUNCTIONS
 */
async function cleanDist () {
  return del('dist')
}

async function cleanTmp () {
  return del('tmp')
}

/**
 * BUILD FUNCTIONS
 */
function html () {
  return gulp
        .src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
}

function script (callback) {
  webpack({
    entry: ['babel-polyfill', './src/script/index.js'],
    output: {
      path: path.join(__dirname, 'dist/script'),
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx{0,1}$/,
          loader: 'babel-loader',
          include: path.resolve('src'),
          query: {
            presets: ['latest', 'react', 'stage-2']
          }
        }
      ]
    },
    target: 'electron',
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['src', 'node_modules']
    }
  }, (err, stats) => callback(err))
}

function style () {
  return gulp
        .src(['src/style/style.less'])
        .pipe(less({
          paths: ['src/style']
        }))
        .pipe(gulp.dest('dist/style'))
}

function assets (){
  return gulp.src(['src/assets/**/**'])
    .pipe(gulpCopy('dist/assets/', {prefix: 2}))
}

/**
 * CREATE TASKS
 */
gulp.task('create-folders', createFolders)
gulp.task('clean-tmp', cleanTmp)
gulp.task('clean-dist', cleanDist)
gulp.task('clean', gulp.parallel('clean-tmp', 'clean-dist'))
gulp.task('html', html)
gulp.task('style', style)
gulp.task('script', script)
gulp.task('assets', assets)

const build = gulp.series('clean', 'create-folders', 'script', gulp.parallel('html', 'style'), 'assets', 'clean-tmp')

gulp.task('watch', () => { return gulp.watch(['**', '!dist', '!tmp'], build) })
gulp.task('build', build)
