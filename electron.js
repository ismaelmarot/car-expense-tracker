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
    } else {
      serverScript = path.join(__dirname, 'car-expense-tracker-backend', 'server.js');
    }

    console.log('Intentando iniciar backend. script:', serverScript);
    console.log('Usando base de datos en:', dbPath);

    try {
      const nodeCheck = spawnSync('node', ['-v'], { encoding: 'utf8' });
      if (nodeCheck.error || nodeCheck.status !== 0) {
        console.warn('node no disponible en PATH o falló node -v. Haremos fallback a require() del servidor. info:', nodeCheck.error || nodeCheck.stderr || nodeCheck.stdout);
        try {
          require(serverScript);
          console.log('Backend iniciado mediante require() (fallback).');
          return;
        } catch (err) {
          console.error('Fallback require() falló:', err);
          return;
        }
      }
    } catch (err) {
      console.warn('Error comprobando node en PATH:', err);
    }

    const cmd = `node "${serverScript}"`;
    console.log("Iniciando backend con:", cmd);

    const server = exec(cmd, { env: process.env });

    server.stdout.on("data", (data) => console.log("[BACKEND]", data.toString().trim()));
    server.stderr.on("data", (data) => console.error("[BACKEND ERROR]", data.toString().trim()));

    server.on("exit", (code, signal) => {
      console.log(`Proceso backend finalizó con código ${code} ${signal ? `(signal: ${signal})` : ''}`);
      if (code !== 0) {
        try {
          require(serverScript);
          console.log('Backend iniciado mediante require() tras fallo del proceso hijo.');
        } catch (err) {
          console.error('No se pudo arrancar backend por ningún método:', err);
        }
      }
    });
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