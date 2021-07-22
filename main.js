// Modules to control application life and create native browser window
const { app, BrowserWindow, session } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')

var mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Adplify Adwatcher Collector',
    icon: 'assets/logo.png',
    webPreferences: {
      contextIsolation: true, 
      preload: path.join(__dirname, './preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.setMenu(null)
  mainWindow.loadFile('./views/home/index.html')

  //let wc = mainWindow.webContents
  //wc.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  mainWindow.maximize()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
