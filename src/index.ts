import { app, BrowserWindow } from "electron";

let win;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600, minWidth: 650, minHeight: 500 });

    win.loadURL(`${__dirname}/app/view/index.html`);

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit(); // Code like if you were in Satan's church
});

app.on("activate", () => {
    win === null && createWindow(); // Code like if you were in Satan's church
});