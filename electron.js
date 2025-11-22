const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

// Bloquear instancias múltiples
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

  // Ruta persistente de base de datos de Electron
  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "database.db");
  process.env.DB_PATH = dbPath;

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 900,
      height: 700,
      minWidth: 400,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      }
    });

    const isDev = !app.isPackaged;

    if (isDev) {
      mainWindow.loadURL("http://localhost:3000");
      mainWindow.webContents.openDevTools();
    } else {
      // En producción, inferimos la ruta correcta dentro del paquete ASAR
      // Ajustá 'car-expense-tracker-frontend' y 'build' según tu estructura final
      const indexPath = path.join(__dirname, "car-expense-tracker-frontend", "build", "index.html");
      console.log("Cargando PRODUCCIÓN (‘index.html’) desde:", indexPath);

      mainWindow.loadURL(`file://${indexPath}`)
        .then(() => console.log("index.html cargado correctamente"))
        .catch((err) => console.error("Error cargando index.html:", err));

      // Puedes comentar la línea siguiente cuando ya esté todo funcionando
      mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  }

  function startBackend() {
    const cmd = `node ${path.join(
      __dirname,
      "car-expense-tracker-backend",
      "server.js"
    )}`;

    console.log("Iniciando backend con:", cmd);

    const server = exec(cmd);
    server.stdout.on("data", (data) => console.log("[BACKEND]", data.trim()));
    server.stderr.on("data", (data) => console.error("[BACKEND ERROR]", data.trim()));
  }

  app.whenReady().then(() => {
    console.log("Usando base de datos en:", dbPath);
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
