import * as less from "less";

import * as fs from "fs";
import * as path from "path";

const lessPluginCleanCSS = require("less-plugin-clean-css");

export namespace ThemeCompiler {
    const themeRoot: string = path.join(__dirname, "app", "style", "theme");
    const compiledThemeRoot: string = path.join(__dirname, "app", "style", "css");;
    const themesFilenames = [];

    export function loadThemes() {
        return new Promise((resolve, reject) => {
            fs.readdirSync(themeRoot).filter(elemName => {
                return !fs.lstatSync(path.join(themeRoot, elemName)).isDirectory();
            }).forEach(elemName => {
                themesFilenames[themesFilenames.length] = elemName;
            });
            resolve();
        });        
    }

    function compileTheme(filename: string) {
        return new Promise((resolve, reject) => {
            (less.render(fs.readFileSync(path.join(themeRoot, filename)).toString("utf-8"), {
                plugins: [new lessPluginCleanCSS({ advanced: true })],
                paths:  [path.join(__dirname, "app", "style")]
            } as any) as any).then(output => {
                fs.writeFile(path.join(compiledThemeRoot, filename.replace("less", "css")), output.css, err => {
                    if (err) return reject(err);
                    resolve();
                });
            }).catch(reject);
        });
    }

    export function compileThemes() {
        return new Promise((resolve, reject) => {
            Promise.all(themesFilenames.map(filename => compileTheme(filename)))
                .then(resolve)
                .catch(reject);
        });
    }
}
