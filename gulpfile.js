const gulp = require('gulp')
const fs = require('fs')
const babel = require('gulp-babel')
const del = require('del')

gulp.task('clean', async () => {
    await del('dist')
})

gulp.task('build', ['clean'],() => {
    return gulp
        .src(['src/**/*.js', 'src/**/*.jsx'])
        .pipe(babel({ presets: ['react', 'latest'] }))
        .pipe(gulp.dest('dist'))
})