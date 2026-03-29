const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    const devUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:3000';
    mainWindow.loadURL(devUrl).catch(err => console.error('Error loadURL dev:', err));
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    mainWindow.once('ready-to-show', () => mainWindow.show());
  } else {
    const indexPath = path.join(__dirname, 'car-expense-tracker-frontend', 'build', 'index.html');
    console.log('Modo PROD: cargando index.html desde:', indexPath);

    if (!fs.existsSync(indexPath)) {
      console.error('index.html no encontrado en:', indexPath);
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

function startBackend() {
  return new Promise((resolve, reject) => {
    const express = require('express');
    const sqlite3 = require('sqlite3').verbose();
    const cors = require('cors');
    
    const backendApp = express();
    backendApp.use(cors());
    backendApp.use(express.json({ limit: '10mb' }));
    
    const userDataPath = app.getPath("userData");
    const dbPath = path.join(userDataPath, "database.db");
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error abriendo DB:', err);
      } else {
        console.log('DB abierta:', dbPath);
      }
    });
    
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT,
        model TEXT,
        year INTEGER,
        version TEXT,
        vehicle_type TEXT,
        color TEXT,
        vin TEXT,
        engine TEXT,
        fuel_type TEXT,
        photo TEXT,
        kilometers INTEGER,
        last_service_km INTEGER,
        service_interval_km INTEGER,
        vtv_date TEXT,
        extintor_date TEXT
      )`);
      
      db.run(`CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        car_id INTEGER,
        amount REAL,
        category TEXT,
        description TEXT,
        date TEXT,
        kilometers INTEGER,
        photos TEXT,
        FOREIGN KEY(car_id) REFERENCES cars(id) ON DELETE CASCADE
      )`);
    });
    
    backendApp.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
    
    // Cars routes
    backendApp.get('/cars', (req, res) => {
      db.all("SELECT * FROM cars ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });
    
    backendApp.get('/cars/:id', (req, res) => {
      db.get("SELECT * FROM cars WHERE id = ?", req.params.id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Car not found" });
        res.json(row);
      });
    });
    
    backendApp.post('/cars', (req, res) => {
      const { brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, kilometers, last_service_km, service_interval_km, vtv_date, extintor_date } = req.body;
      const stmt = db.prepare(`INSERT INTO cars (brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, kilometers, last_service_km, service_interval_km, vtv_date, extintor_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      stmt.run(brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, kilometers, last_service_km, service_interval_km, vtv_date, extintor_date, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      });
      stmt.finalize();
    });
    
    backendApp.put('/cars/:id', (req, res) => {
      const { brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, kilometers, last_service_km, service_interval_km, vtv_date, extintor_date } = req.body;
      const stmt = db.prepare(`UPDATE cars SET brand=?, model=?, year=?, version=?, vehicle_type=?, color=?, vin=?, engine=?, fuel_type=?, photo=?, kilometers=?, last_service_km=?, service_interval_km=?, vtv_date=?, extintor_date=? WHERE id=?`);
      stmt.run(brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, kilometers, last_service_km, service_interval_km, vtv_date, extintor_date, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
      });
      stmt.finalize();
    });
    
    backendApp.delete('/cars/:id', (req, res) => {
      db.run("DELETE FROM cars WHERE id=?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
      });
    });
    
    // Expenses routes
    backendApp.get('/expenses', (req, res) => {
      const { car_id, start_date, end_date, category } = req.query;
      let query = "SELECT * FROM expenses WHERE 1=1";
      const params = [];
      if (car_id) { query += " AND car_id = ?"; params.push(car_id); }
      if (start_date) { query += " AND date >= ?"; params.push(start_date); }
      if (end_date) { query += " AND date <= ?"; params.push(end_date); }
      if (category) { query += " AND category = ?"; params.push(category); }
      query += " ORDER BY date DESC";
      db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        rows.forEach(row => {
          if (row.photos) {
            try { row.photos = JSON.parse(row.photos); } catch(e) { row.photos = []; }
          }
        });
        res.json(rows);
      });
    });
    
    backendApp.get('/expenses/:id', (req, res) => {
      db.get("SELECT * FROM expenses WHERE id = ?", req.params.id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Expense not found" });
        if (row.photos) {
          try { row.photos = JSON.parse(row.photos); } catch(e) { row.photos = []; }
        }
        res.json(row);
      });
    });
    
    backendApp.post('/expenses', (req, res) => {
      const { car_id, amount, category, description, date, kilometers, photos } = req.body;
      const photosStr = photos ? JSON.stringify(photos) : null;
      const stmt = db.prepare(`INSERT INTO expenses (car_id, amount, category, description, date, kilometers, photos) VALUES (?, ?, ?, ?, ?, ?, ?)`);
      stmt.run(car_id, amount, category, description, date, kilometers, photosStr, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      });
      stmt.finalize();
    });
    
    backendApp.put('/expenses/:id', (req, res) => {
      const { amount, category, description, date, kilometers, photos } = req.body;
      const photosStr = photos ? JSON.stringify(photos) : null;
      const stmt = db.prepare(`UPDATE expenses SET amount=?, category=?, description=?, date=?, kilometers=?, photos=? WHERE id=?`);
      stmt.run(amount, category, description, date, kilometers, photosStr, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
      });
      stmt.finalize();
    });
    
    backendApp.delete('/expenses/:id', (req, res) => {
      db.run("DELETE FROM expenses WHERE id=?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
      });
    });
    
    // Statistics route
    backendApp.get('/stats/expenses', (req, res) => {
      const { car_id, start_date, end_date } = req.query;
      let query = "SELECT * FROM expenses WHERE 1=1";
      const params = [];
      if (car_id) { query += " AND car_id = ?"; params.push(car_id); }
      if (start_date) { query += " AND date >= ?"; params.push(start_date); }
      if (end_date) { query += " AND date <= ?"; params.push(end_date); }
      query += " ORDER BY date DESC";
      db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        rows.forEach(row => {
          if (row.photos) {
            try { row.photos = JSON.parse(row.photos); } catch(e) { row.photos = []; }
          }
        });
        res.json(rows);
      });
    });
    
    // Reports routes
    backendApp.get('/reports/pdf', (req, res) => {
      const { car_id, start_date, end_date, categories } = req.query;
      let query = "SELECT e.*, c.brand, c.model FROM expenses e JOIN cars c ON e.car_id = c.id WHERE 1=1";
      const params = [];
      if (car_id) { query += " AND e.car_id = ?"; params.push(car_id); }
      if (start_date) { query += " AND e.date >= ?"; params.push(start_date); }
      if (end_date) { query += " AND e.date <= ?"; params.push(end_date); }
      if (categories) {
        const cats = categories.split(',');
        query += ` AND e.category IN (${cats.map(() => '?').join(',')})`;
        params.push(...cats);
      }
      query += " ORDER BY e.date DESC";
      
      db.all(query, params, (err, expenses) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');
        doc.pipe(res);
        
        doc.fontSize(18).text('Reporte de Gastos', { align: 'center' });
        doc.moveDown();
        
        if (expenses.length === 0) {
          doc.fontSize(12).text('No hay gastos en el período seleccionado.');
        } else {
          expenses.forEach(exp => {
            doc.fontSize(12).text(`${exp.date} - ${exp.brand} ${exp.model}`);
            doc.fontSize(10).text(`Categoría: ${exp.category} - Amount: $${exp.amount}`);
            if (exp.description) doc.text(`Descripción: ${exp.description}`);
            doc.moveDown(0.5);
          });
          
          const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
          doc.fontSize(14).text(`Total: $${total}`, { bold: true });
        }
        
        doc.end();
      });
    });
    
    backendApp.get('/reports/csv', (req, res) => {
      const { car_id, start_date, end_date, categories } = req.query;
      let query = "SELECT e.*, c.brand, c.model, c.year as car_year FROM expenses e JOIN cars c ON e.car_id = c.id WHERE 1=1";
      const params = [];
      if (car_id) { query += " AND e.car_id = ?"; params.push(car_id); }
      if (start_date) { query += " AND e.date >= ?"; params.push(start_date); }
      if (end_date) { query += " AND e.date <= ?"; params.push(end_date); }
      if (categories) {
        const cats = categories.split(',');
        query += ` AND e.category IN (${cats.map(() => '?').join(',')})`;
        params.push(...cats);
      }
      query += " ORDER BY e.date DESC";
      
      db.all(query, params, (err, expenses) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const json2csv = require('json2csv').parse;
        const fields = ['date', 'brand', 'model', 'car_year', 'category', 'amount', 'description', 'kilometers'];
        const csv = json2csv(expenses, { fields });
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte.csv');
        res.send(csv);
      });
    });
    
    // Download backup route
    backendApp.get('/api/download-backup', (req, res) => {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename=car-expenses.db');
      const readStream = fs.createReadStream(dbPath);
      readStream.pipe(res);
    });
    
    backendApp.listen(5001, () => {
      console.log('Backend escuchando en http://localhost:5001');
      resolve();
    });
  });
}

app.whenReady().then(async () => {
  try {
    const dbDir = path.dirname(path.join(app.getPath("userData"), "database.db"));
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  } catch (err) {
    console.error("Error creando carpeta para DB:", err);
  }

  console.log("MAIN: Usando base de datos en:", path.join(app.getPath("userData"), "database.db"));
  
  try {
    await startBackend();
  } catch (err) {
    console.error('Error iniciando backend:', err);
  }
  
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});