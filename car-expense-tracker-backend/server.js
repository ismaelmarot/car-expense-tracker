const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Open DB SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// DBs - CREATION ===============================================================
db.serialize(() => {
  // Create CAR table if it doesn't exist
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

  // Create Expenses table if it doesn't exist
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

// CARS - ROUTES GET & POST =====================================================
//===GETs========================================================================
// GET all the Cars
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

//Get Car for ID
app.get('/cars/:id', (req, res) => {
  const carId = req.params.id;
  const query = 'SELECT * FROM cars WHERE id = ?';
  db.get(query, [carId], (err, row) => {
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

//===POSTs=======================================================================
// Add new Car
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


//===DELETE======================================================================
// Delete one Car
app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id;
  console.log(`Recibiendo ID del auto para eliminar: ${carId}`);
  
  const query = 'DELETE FROM cars WHERE id = ?';
  db.run(query, [carId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      console.log(`No se encontró el auto con ID: ${carId}`);
      return res.status(404).json({ message: "Car not found" });
    }
    console.log(`Auto con ID: ${carId} eliminado exitosamente`);
    res.json({ message: "Car deleted successfully" });
  });
});

// EXPENSES - ROUTES GET & POST & EDIT ==========================================
//===GETs========================================================================
// Get all the Expenses
app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get Expense by Car ID
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

// Get Expense by Expense ID
app.get('/expenses/:id', (req, res) => {
  const expenseId = req.params.id;
  const query = 'SELECT * FROM expenses WHERE id = ?';
  db.get(query, [expenseId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.json(row);
  });
});

// Add new Expense
app.post('/expenses', (req, res) => {
  console.log(req.body)
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

// Delete Expense
app.delete('/expenses/:id', (req, res) => {
  const expenseId = req.params.id;
  const query = 'DELETE FROM expenses WHERE id = ?';
  db.run(query, [expenseId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  });
});

// Edit Expense
app.put('/expenses/:id', (req, res) => {
  console.log('DENTRO DE APP.PUT');
  const expenseId = req.params.id;
  const { car_id, description, price, kilometers, category, date } = req.body;

  console.log('Updating expense with ID:', expenseId);
  console.log('Received data:', req.body);
  
  if (!car_id || !description || !price || !kilometers || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `UPDATE expenses
                 SET car_id = ?, description = ?, price = ?, kilometers = ?, category = ?, date = ?
                 WHERE id = ?`;

  console.log('Query:', query);
  console.log('Values:', [car_id, description, price, kilometers, category, date, expenseId]);

  db.run(query, [car_id, description, price, kilometers, category, date, expenseId], function(err) {
    if (err) {
      console.error("Error al actualizar el gasto: ", err);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({
      message: 'Expense updated successfully',
      id: expenseId,
      updateFields: { car_id, description, price, kilometers, category, date }
    });
  });
});

// Endpoint for DB backup =======================================================
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


// START SERVER =================================================================
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
