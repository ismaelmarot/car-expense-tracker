const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec, spawnSync } = require('child_process');
const fs = require('fs');

let mainWindow;

try {
  app.setName('Car_Expense_Tracker');
} catch (err) {
  console.warn('app.setName falló:', err && err.message);
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "database.db");
  process.env.DB_PATH = dbPath;

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 900,
      height: 700,
      show: false,
      fullscreen: true,
      fullscreenable: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      }
    });

    const isDev = !app.isPackaged;
    const devUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:3000';

    if (isDev) {
      console.log('Modo DEV: cargando', devUrl);
      mainWindow.loadURL(devUrl).catch(err => console.error('Error loadURL dev:', err));
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
      const indexPath = path.resolve(__dirname, 'car-expense-tracker-frontend', 'build', 'index.html');
      console.log('Modo PROD: intentando cargar index.html desde:', indexPath);

      if (!fs.existsSync(indexPath)) {
        console.error('index.html no encontrado en:', indexPath);
        mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent('<h2>Error: index.html no encontrado</h2><p>Ver consola para más detalles.</p>'));
        mainWindow.webContents.openDevTools({ mode: 'detach' });
      } else {
        mainWindow.loadFile(indexPath)
          .then(() => console.log('index.html cargado correctamente'))
          .catch((err) => {
            console.error('Error cargando index.html con loadFile:', err);
            mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent('<h2>Error al cargar la app</h2><p>Revisa la consola.</p>'));
            mainWindow.webContents.openDevTools({ mode: 'detach' });
          });
      }
    }

    mainWindow.once('ready-to-show', () => mainWindow.show());

    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  }

  function startBackend() {
  let serverScript;
  if (app.isPackaged) {
    serverScript = path.join(process.resourcesPath, 'car-expense-tracker-backend', 'server.js');
    console.log('Modo PROD: intentando cargar backend con require desde:', serverScript);
    try {
      require(serverScript);
      console.log('Backend cargado correctamente (desde resources).');
    } catch (err) {
      console.error('Error cargando backend empaquetado con require:', err);
      try {
        const logPath = path.join(app.getPath('userData'), 'backend-error.log');
        fs.appendFileSync(logPath, `Error require backend: ${new Date().toISOString()} - ${err.stack || err}\n`);
        console.log('Error escrito en', logPath);
      } catch (e) {
        console.error('No se pudo escribir log de error:', e);
      }
    }
  } else {
    serverScript = path.join(__dirname, 'car-expense-tracker-backend', 'server.js');
    console.log('Modo DEV: intentando iniciar backend con node desde:', serverScript);
    try {
      const child = require('child_process').spawn('node', [serverScript], {
        env: process.env,
        stdio: 'inherit',
      });
      child.on('error', (err) => console.error('Error iniciando backend child process:', err));
      child.on('exit', (code) => console.log('Backend child exited with code', code));
    } catch (err) {
      console.error('Excepción intentando spawn backend en dev:', err);
    }
  }
}

  app.whenReady().then(() => {
    try {
      const dbDir = path.dirname(dbPath);
      if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
    } catch (err) {
      console.error("Error creando carpeta para DB:", err);
    }

    console.log("MAIN: Usando base de datos en:", dbPath);
    startBackend();
    createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}