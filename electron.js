const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 600,  
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'car-expense-tracker-frontend/public/app-car-icon.png'),
  });

  if (process.env.NODE_ENV === 'development') {
    const url = 'http://localhost:3000';

    const loadReactApp = async () => {
      let attempts = 0;
      while (attempts < 5) {
        try {
          await mainWindow.loadURL(url);
          console.log(`Successfully loaded: ${url}`);
          return;
        } catch (error) {
          attempts++;
          console.log(`Attempt ${attempts} failed. Retrying...`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      console.error('Failed to load React app after 5 attempts.');
    };

    loadReactApp();
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, 'car-expense-tracker-frontend/build/index.html');
    console.log('Loading indexPath:', indexPath);

    mainWindow.loadFile(indexPath).catch((err) => {
      console.error('Failed to load index.html:', err);
    });
  }

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Failed to load content: (${errorCode}) ${errorDescription}`);
  });

  mainWindow.webContents.on('dom-ready', () => {
    console.log('DOM ready');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();

  if (process.platform === 'darwin') {
    app.dock.hide();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
