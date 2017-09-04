const { app, BrowserWindow, webContents, shell, autoUpdater, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const cld = require('cld')
const tldExtract = require('tld-extract')

const registerIpc = require('electron-ipc-tunnel/server').default
const rtlDetect = require('rtl-detect')

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

  win.webContents.on('will-navigate', (event, url) => {
    const focused = webContents.getFocusedWebContents()
    if (!focused || url === focused.getURL()) return

    event.preventDefault()
    shell.openExternal(url)
  })

  win.on('closed', () => { win = null })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit() }
})

app.on('activate', () => {
  if (win === null) { createWindow() }
})

// Language Detection
registerIpc('is-rtl', async (reply, [content, url]) => {
  return await new Promise((resolve, reject) => {
    cld.detect(content, {
      isHTML: true,
      tldHint: tldExtract(url).tld
    }, (err, result) => {
      resolve(rtlDetect.isRtlLang(result.languages[0].code))
    })
  })
})

// Autoupdate
autoUpdater.setFeedURL(`http://alduin-update:3000/update/${process.platform}/${app.getVersion()}}`)

registerIpc('update-waiter', async reply => {
  return await new Promise(resolve => {
    autoUpdater.on('update-downloaded', async event => {
      console.log('resolve lel')
      resolve()
    })
    setInterval(() => {
      autoUpdater.checkForUpdates()
    }, 1000)
  })
})

registerIpc('update-start', async reply => {
  autoUpdater.quitAndInstall()
})
