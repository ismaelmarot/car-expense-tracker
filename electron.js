const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn, execSync } = require('child_process');
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

  function findNodePath() {
    const platform = process.platform;
    
    if (platform === 'win32') {
      return process.execPath.replace(/[^\/\\]*$/, '').replace(/\//g, '\\') + 'node.exe';
    } else if (platform === 'darwin' || platform === 'linux') {
      try {
        const nodePath = execSync('which node', { encoding: 'utf8' }).trim();
        console.log('Node encontrado en:', nodePath);
        return nodePath;
      } catch {
        const commonPaths = [
          '/usr/local/bin/node',
          '/usr/bin/node',
          '/opt/homebrew/bin/node'
        ];
        for (const p of commonPaths) {
          if (fs.existsSync(p)) return p;
        }
        return 'node';
      }
    }
    return 'node';
  }

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
      
      if (app.isPackaged) {
        serverScript = path.join(process.resourcesPath, 'car-expense-tracker-backend', 'server.js');
      } else {
        serverScript = path.join(__dirname, 'car-expense-tracker-backend', 'server.js');
      }

      const nodePath = findNodePath();
      console.log('Iniciando backend con:', nodePath);
      console.log('Script:', serverScript);
      
      const env = { ...process.env, PORT: BACKEND_PORT.toString() };
      
      backendProcess = spawn(nodePath, [serverScript], {
        env,
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
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
      width: 1200,
      height: 800,
      show: false,
      resizable: true,
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
      // En producción, __dirname está dentro del .asar
      // Necesitamos cargar desde app.asar/car-expense-tracker-frontend/build/
      const indexPath = path.join(__dirname, 'car-expense-tracker-frontend', 'build', 'index.html');
      console.log('Modo PROD: __dirname es:', __dirname);
      console.log('Modo PROD: cargando index.html desde:', indexPath);

      if (!fs.existsSync(indexPath)) {
        console.error('index.html no encontrado en:', indexPath);
        // Intentar con path alternativo (dentro de app.asar)
        const altPath = path.join(process.resourcesPath, 'app.asar', 'car-expense-tracker-frontend', 'build', 'index.html');
        console.log('Intentando path alternativo:', altPath);
        if (fs.existsSync(altPath)) {
          mainWindow.loadFile(altPath).then(() => {
            console.log('index.html cargado desde path alternativo');
            mainWindow.once('ready-to-show', () => mainWindow.show());
          }).catch(err => {
            console.error('Error cargando index.html alternativo:', err);
            mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent('<h2>Error: App no pudo cargar</h2>'));
            mainWindow.webContents.openDevTools({ mode: 'detach' });
          });
        } else {
          mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent('<h2>Error: index.html no encontrado</h2><p>' + indexPath + '</p>'));
          mainWindow.webContents.openDevTools({ mode: 'detach' });
        }
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