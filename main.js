const { app, BrowserWindow, webContents, shell } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
    win = new BrowserWindow({ 
        width: 800, 
        height: 600,
        minWidth: 800,
        minHeight: 600,
        frame: false
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools()

    win.webContents.on("will-navigate", (event, url) => {
        const focused = webContents.getFocusedWebContents();
        if (!focused || url === focused.getURL()) return;

        event.preventDefault();
        shell.openExternal(url);
    });

    win.on('closed', () => { win = null })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})

app.on('activate', () => {
    if (win === null)
        createWindow()
})
