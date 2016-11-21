"use strict"

const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const gulpZip = require("gulp-zip");
const packager = require("electron-packager");

const config = JSON.parse(fs.readFileSync("package.json"));

const options = {
    dir: ".",
    name: "Alduin",
    out: "dist",
    overwrite: true,
    prune: true,
    "app-version": config.version
};

function createPackage(opts, done){
    packager(options, (err, paths) => {
        if(err) console.log(err);
        else zipPackages();
        done();
    });
}

function zipPackages(){
    const rootPaths = fs.readdirSync("dist");
    for(let i = 0; i < rootPaths.length; ++i){
        gulp.src(path.join("dist", rootPaths[i], "**"))
            .pipe(gulpZip(rootPaths[i] + ".zip"))
            .pipe(gulp.dest("dist"));
    }
}

gulp.task("dist:win", done => {
    options.arch = "x64";
    options.platform = "win32";
    options.icon = "./build/icon.ico";

    createPackage(options, done);
});

gulp.task("dist:osx", done => {
    options.arch = "x64";
    options.platform = "darwin";
    options.icon = "./build/icon.icns";

    createPackage(options, done);
});

gulp.task("dist:linux", done => {
    options.arch = "x64";
    options.platform = "linux";

    createPackage(options, done);
});