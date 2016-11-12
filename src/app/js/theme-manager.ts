import * as less from "less";
import * as fs from "fs";
import * as path from "path";

namespace ThemeManager {

    const themeRoot: string = "./src/app/style/theme";
    const themesPaths = [];

    function buildThemes(){
        fs.readdirSync(themeRoot).filter(elemName => {
            return !fs.lstatSync(path.join(themeRoot, elemName)).isDirectory();
        })
    }
}
