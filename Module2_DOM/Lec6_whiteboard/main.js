const { app, BrowserWindow } = require('electron');

function createWindow () {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences : {
          nodeIntegration : true
      }
    })
  
    mainWindow.loadFile('public/index.html').then(function(){
        mainWindow.maximize();
        mainWindow.removeMenu();
        mainWindow.webContents.openDevTools();

    })
  }

  app.whenReady().then(function(){
      createWindow();
  })
  