/* jshint esversion: 6 */

const electron = require('electron');
const server = require('./server');
const { app, BrowserWindow } = electron;
let win;

function createWindow () {
  const screen = electron.screen;
  const { width, height } = screen.getPrimaryDisplay().workArea;
  // Create the browser window.
  win = new BrowserWindow({
    width: width, 
    height: height,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  });

  server.listen(3848, err => {
    if (err) {
      console.error(err);
      return;
    }
    // win.loadURL(`file://${__dirname}/dist/index.html`);
    win.loadURL(`http://localhost:3848`);

    //// uncomment below to open the DevTools.
    // win.webContents.openDevTools()
    
    // Event when the window is closed.
    win.on('closed', function () {
      win = null;
    });
  });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  } else {
    server.close();
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});