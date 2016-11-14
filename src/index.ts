import { app, BrowserWindow, webContents, shell } from "electron";

import { ThemeCompiler } from "./theme-compiler";

let win;

function createWindow() {
    ThemeCompiler.loadThemes()
        .then(ThemeCompiler.compileThemes)
        .then(() => {
            win = new BrowserWindow({ width: 800, height: 600, minWidth: 650, minHeight: 500 });

            win.loadURL(`${__dirname}/app/view/index.html`);

            win.on("closed", () => {
                win = null;
            });
            webContents.getFocusedWebContents().on("will-navigate", handleRedirect);
        })
        .catch(err => console.error("Error while compiling themes.", err));

}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

function handleRedirect(e, url) {
    if (url != webContents.getFocusedWebContents().getURL()) {
        e.preventDefault();
        shell.openExternal(url);
    }
}
