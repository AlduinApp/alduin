const gulp = require('gulp')
const fs = require('fs')
const { promisify } = require('util')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const less = require('gulp-less')
const path = require('path')
const mkpath = require('mkpath')
const webpack = require('webpack')

/**
 * CREATE FOLDERS
 */
async function createFolders() {
    const promiseMkpath = promisify(mkpath)

    return await Promise.all([promiseMkpath('dist/style'), promiseMkpath('dist/script')])
}

/**
 * CLEAN FUNCTIONS
 */
async function clean() {
    await Promise.all([await cleanDist(), await cleanTmp()])
}

async function cleanDist() {
    return del('dist')
}

async function cleanTmp() {
    return del('tmp')
}

/**
 * BUILD FUNCTIONS
 */
function html() {
    return gulp
        .src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
}

function script(callback) {
    webpack({
        entry: './src/script/index.js',
        output: {
            path: path.join(__dirname, 'dist/script'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx$/,
                    loader: 'babel-loader',
                    include: path.resolve('src'),
                    query: {
                        presets: ['latest', 'react']
                    }
                }
            ]
        },
        target: "electron",
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: ['src', 'node_modules']
        }
    }, (err, stats) => callback())
}

function style() {
    return gulp
        .src(['src/style/style.less'])
        .pipe(less({
            paths: ['src/style']
        }))
        .pipe(gulp.dest('dist/style'))
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

const build = gulp.series('clean', 'create-folders', 'script', gulp.parallel('html', 'style'), 'clean-tmp')

gulp.task('watch', () => { return gulp.watch(['**', '!dist', '!tmp'], build) })
gulp.task('build', build)