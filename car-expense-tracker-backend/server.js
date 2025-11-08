const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;

const isProduction = process.env.NODE_ENV === 'production';
console.log('Antes de la línea de la base de datos');

const dbPath = isProduction
  ? path.join(process.resourcesPath, 'database.db')
  : path.join(__dirname, 'database.db');

console.log(`Ruta de la base de datos: ${dbPath}`);

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err);
  } else {
    console.log('Conectado a la base de datos');
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
    fuel_type TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_id INTEGER,
    description TEXT,
    price REAL,
    kilometers INTEGER,
    category TEXT,
    date TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id)
  )`);
});

// Rutas de Autos
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/cars/:id', (req, res) => {
  const carId = req.params.id;
  db.get('SELECT * FROM cars WHERE id = ?', [carId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.json(row);
  });
});

app.post('/cars', (req, res) => {
  const { brand, model, year, version, vehicle_type, color, vin, engine, fuel_type } = req.body;
  const query = `INSERT INTO cars (brand, model, year, version, vehicle_type, color, vin, engine, fuel_type)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [brand, model, year, version, vehicle_type, color, vin, engine, fuel_type], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id;
  db.run('DELETE FROM cars WHERE id = ?', [carId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.json({ message: "Car deleted successfully" });
  });
});

// Rutas de Gastos
app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/expenses/car/:carId', (req, res) => {
  const carId = req.params.carId;
  db.all('SELECT * FROM expenses WHERE car_id = ?', [carId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/expenses', (req, res) => {
  const { car_id, description, price, kilometers, category, date } = req.body;
  const currentDate = date || new Date().toISOString();
  const query = `INSERT INTO expenses (car_id, description, price, kilometers, category, date)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [car_id, description, price, kilometers, category, currentDate], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.delete('/expenses/:id', (req, res) => {
  const expenseId = req.params.id;
  db.run('DELETE FROM expenses WHERE id = ?', [expenseId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.json({ message: "Expense deleted successfully" });
  });
});

// Endpoint para descargar el backup de la base de datos
app.get('/api/download-backup', (req, res) => {
  const backupFilePath = path.join(__dirname, 'database.db');
  const backupDestination = path.join(__dirname, 'backup.db');

  if (fs.existsSync(backupFilePath)) {
    fs.copyFile(backupFilePath, backupDestination, (err) => {
      if (err) {
        return res.status(500).send('Error al generar el backup.');
      }
      res.download(backupDestination, 'backup.db', (err) => {
        if (err) {
          return res.status(500).send('Error al generar el backup.');
        }
        fs.unlink(backupDestination, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo de backup temporal:', err);
          }
        });
      });
    });
  } else {
    res.status(404).send('Archivo de base de datos no encontrado.');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
