const {
  app,
  BrowserWindow,
  webContents,
  shell,
  autoUpdater,
  ipcMain,
  Menu,
  Tray
} = require('electron')
const path = require('path')
const url = require('url')
const cld = require('cld')
const tldExtract = require('tld-extract')
const registerIpc = require('electron-ipc-tunnel/server').default
const rtlDetect = require('rtl-detect')

let win
let tryToQuit = false
let tray

function createWindow() {
  buildTray()
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    show: false,
    icon: `${__dirname}/dist/assets/image/icon.png`
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.on('did-finish-load', () => {
    win.show()
  })

  win.on('closed', () => {
    win = null
  })

  win.on('close', event => {
    if (!tryToQuit) {
      event.preventDefault()
      win.hide()
    }
  })

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
autoUpdater.setFeedURL(`http://alduin.stouder.io:3000/update/${process.platform}/${app.getVersion()}}`)

registerIpc('update-waiter', async reply => {
  return await new Promise(resolve => {
    autoUpdater.on('update-downloaded', async event => {
      resolve()
    })
    setInterval(() => {
      if (process.argv[1] !== '--squirrel-firstrun')
        autoUpdater.checkForUpdates();
    }, 60000)
  })
})

registerIpc('update-start', async reply => {
  autoUpdater.quitAndInstall()
})

// Tray
function buildTray() {
  tray = new Tray(`${__dirname}/dist/assets/image/icon.png`)
  const menu = Menu.buildFromTemplate([
    {
      label: 'Open Alduin',
      click: () => {
        win.show();
      }
    },
    {
      label: 'Quit Alduin',
      click: () => (tryToQuit = true, app.quit())
    }
  ])

  tray.on('double-click', event => win.show())

  tray.setContextMenu(menu);

  ipcMain.on('tray-state', (event, args) => tray.setImage(`${__dirname}/dist/assets/image/icon${args == 'read' ? '' : '-unread'}.png`))
}
