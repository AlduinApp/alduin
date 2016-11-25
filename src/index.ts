import { app, BrowserWindow, webContents, shell, Tray, Menu } from "electron";

import { ThemeCompiler } from "./theme-compiler";

let win: Electron.BrowserWindow;
let tryToQuit: boolean = false;
let tray: Electron.Tray;

function createWindow() {
    buildTray();
    // Theme loading
    ThemeCompiler.existsDefaultTheme()
        .then(ThemeCompiler.loadThemes)
        .then(ThemeCompiler.compileThemes)
        .then(() => {
            // Create electron window
            win = new BrowserWindow({ width: 800, height: 600, minWidth: 650, minHeight: 500, icon: `${__dirname}/app/img/icon.png`, frame: false });

            win.loadURL(`${__dirname}/app/view/index.html`);

            win.on("closed", () => {
                win = null;
            });
            win.on("close", event => {
                if(!tryToQuit){
                    event.preventDefault();
                    win.hide();
                }
            });

            // Open links in the user's default browser
            win.webContents.on("will-navigate", handleRedirect);
        })
        .catch(err => {
            console.error("Error while compiling themes.", err);
            process.exit(1);
        });

}

function buildTray(){
    tray = new Tray(`${__dirname}/app/img/icon.png`);
    const menu = Menu.buildFromTemplate([
        {
            label: "Quit Alduin",
            click: () => {
                tryToQuit = true;
                app.quit();
            }
        }
    ]);

    tray.on("double-click", event => {
        win.show();
    });

    tray.setContextMenu(menu);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit(); // Code like if you were in Satan's church
});

app.on("activate", () => {
    win === null && createWindow(); // Code like if you were in Satan's church
});

/**
 * Handle the navigation event from electron
 * @param {Event} event
 * @param {string} url 
 */
function handleRedirect(event: Event, url: string) {
    if (url === webContents.getFocusedWebContents().getURL()) return;

    event.preventDefault();
    shell.openExternal(url);
}
