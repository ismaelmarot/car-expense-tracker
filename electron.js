const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

let mainWindow;
let backendProcess = null;

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

  const BACKEND_PORT = 5001;

  function checkBackendReady(port, callback, retries = 0) {
    const maxRetries = 30;
    const req = http.get(`http://localhost:${port}/cars`, (res) => {
      console.log('Backend está listo!');
      callback(true);
    });
    
    req.on('error', (err) => {
      if (retries < maxRetries) {
        console.log(`Esperando backend... (intento ${retries + 1}/${maxRetries})`);
        setTimeout(() => checkBackendReady(port, callback, retries + 1), 500);
      } else {
        console.error('Backend no respondió después de múltiples intentos');
        callback(false);
      }
    });
    
    req.end();
  }

  function startBackend() {
    return new Promise((resolve, reject) => {
      let serverScript;
      let nodePath;
      
      if (app.isPackaged) {
        serverScript = path.join(process.resourcesPath, 'car-expense-tracker-backend', 'server.js');
        nodePath = process.execPath.replace(/[^\/\\]*$/, 'node');
      } else {
        serverScript = path.join(__dirname, 'car-expense-tracker-backend', 'server.js');
        nodePath = 'node';
      }

      console.log('Iniciando backend:', serverScript);
      
      const env = { ...process.env, PORT: BACKEND_PORT.toString() };
      
      backendProcess = spawn(nodePath, [serverScript], {
        env,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      backendProcess.stdout.on('data', (data) => {
        console.log(`[Backend] ${data.toString().trim()}`);
      });

      backendProcess.stderr.on('data', (data) => {
        console.error(`[Backend Error] ${data.toString().trim()}`);
      });

      backendProcess.on('error', (err) => {
        console.error('Error iniciando backend:', err);
        reject(err);
      });

      backendProcess.on('exit', (code) => {
        console.log('Backend exited with code:', code);
      });

      checkBackendReady(BACKEND_PORT, (ready) => {
        if (ready) {
          resolve();
        } else {
          reject(new Error('Backend no disponible'));
        }
      });
    });
  }

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

    if (isDev) {
      const devUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:3000';
      console.log('Modo DEV: cargando', devUrl);
      mainWindow.loadURL(devUrl).catch(err => console.error('Error loadURL dev:', err));
      mainWindow.webContents.openDevTools({ mode: 'detach' });
      mainWindow.once('ready-to-show', () => mainWindow.show());
    } else {
      const indexPath = path.resolve(__dirname, 'car-expense-tracker-frontend', 'build', 'index.html');
      console.log('Modo PROD: cargando index.html desde:', indexPath);

      if (!fs.existsSync(indexPath)) {
        console.error('index.html no encontrado en:', indexPath);
        mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent('<h2>Error: index.html no encontrado</h2><p>Ver consola para más detalles.</p>'));
        mainWindow.webContents.openDevTools({ mode: 'detach' });
      } else {
        mainWindow.loadFile(indexPath)
          .then(() => {
            console.log('index.html cargado correctamente');
            mainWindow.once('ready-to-show', () => mainWindow.show());
          })
          .catch((err) => {
            console.error('Error cargando index.html con loadFile:', err);
            mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent('<h2>Error al cargar la app</h2><p>Revisa la consola.</p>'));
            mainWindow.webContents.openDevTools({ mode: 'detach' });
          });
      }
    }

    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  }

  app.whenReady().then(async () => {
    try {
      const dbDir = path.dirname(dbPath);
      if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
    } catch (err) {
      console.error("Error creando carpeta para DB:", err);
    }

    console.log("MAIN: Usando base de datos en:", dbPath);
    
    // Siempre iniciar backend (tanto dev como prod)
    try {
      await startBackend();
    } catch (err) {
      console.error('Error iniciando backend:', err);
    }
    
    createWindow();
  });

  app.on("window-all-closed", () => {
    if (backendProcess) {
      backendProcess.kill();
    }
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('will-quit', () => {
    if (backendProcess) {
      backendProcess.kill();
    }
  });
}