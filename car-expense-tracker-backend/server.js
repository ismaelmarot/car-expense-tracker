const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

console.log("=== BACKEND INICIANDO ===");

// Usamos DB_PATH si Electron lo pasó, sino la DB local del backend
const dbPath = process.env.DB_PATH || path.join(__dirname, "database.db");
console.log("Usando base de datos:", dbPath);

// Aseguramos carpeta
try {
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
} catch (err) {
  console.error("Error creando carpeta para DB:", err);
}

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Error al abrir DB:", err);
  else console.log("DB abierta:", dbPath);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT, model TEXT, year INTEGER, version TEXT,
    vehicle_type TEXT, color TEXT, vin TEXT, engine TEXT, fuel_type TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_id INTEGER, description TEXT, price REAL, kilometers INTEGER,
    category TEXT, date TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id)
  )`);
});

// RUTAS (idénticas a las tuyas)
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/cars/:id', (req, res) => {
  db.get('SELECT * FROM cars WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Car not found" });
    res.json(row);
  });
});

app.post('/cars', (req, res) => {
  const { brand, model, year, version, vehicle_type, color, vin, engine, fuel_type } = req.body;
  db.run(
    `INSERT INTO cars (brand, model, year, version, vehicle_type, color, vin, engine, fuel_type)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [brand, model, year, version, vehicle_type, color, vin, engine, fuel_type],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.delete('/cars/:id', (req, res) => {
  db.run('DELETE FROM cars WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  });
});

app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/expenses/car/:carId', (req, res) => {
  db.all('SELECT * FROM expenses WHERE car_id = ?', [req.params.carId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/expenses', (req, res) => {
  const { car_id, description, price, kilometers, category, date } = req.body;
  const currentDate = date || new Date().toISOString();
  db.run(
    `INSERT INTO expenses (car_id, description, price, kilometers, category, date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [car_id, description, price, kilometers, category, currentDate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.delete('/expenses/:id', (req, res) => {
  db.run('DELETE FROM expenses WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  });
});

app.get('/api/download-backup', (req, res) => {
  if (!fs.existsSync(dbPath)) return res.status(404).send("DB no encontrada");
  const destination = path.join(__dirname, "backup.db");
  fs.copyFile(dbPath, destination, (err) => {
    if (err) return res.status(500).send("Error al generar backup");
    res.download(destination, "backup.db", () => {
      fs.unlinkSync(destination);
    });
  });
});

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
