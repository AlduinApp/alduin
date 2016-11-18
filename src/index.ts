import { app, BrowserWindow, webContents, shell } from "electron";

import { ThemeCompiler } from "./theme-compiler";

let win;

function createWindow() {
    ThemeCompiler.existsDefaultTheme()
        .then(ThemeCompiler.loadThemes)
        .then(ThemeCompiler.compileThemes)
        .then(() => {
            win = new BrowserWindow({ width: 800, height: 600, minWidth: 650, minHeight: 500, icon: `${__dirname}/app/img/icon.png` });

            win.loadURL(`${__dirname}/app/view/index.html`);

            win.on("closed", () => {
                win = null;
            });
            webContents.getFocusedWebContents().on("will-navigate", handleRedirect);
        })
        .catch(err => {
            console.error("Error while compiling themes.", err);
            process.exit(1);
        });

}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit(); // Code like if you were in Satan's church
});

app.on("activate", () => {
    win === null && createWindow(); // Code like if you were in Satan's church
});

function handleRedirect(event: Event, url: string) {
    if (url === webContents.getFocusedWebContents().getURL()) return;

    event.preventDefault();
    shell.openExternal(url);
}
