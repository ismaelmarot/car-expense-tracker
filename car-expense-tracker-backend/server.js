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
app.use(express.json({ limit: '10mb' }));

// Middleware para loggear todas las peticiones
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.method !== 'GET') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Error al abrir DB:", err);
  else console.log("DB abierta:", dbPath);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT, model TEXT, year INTEGER, version TEXT,
    vehicle_type TEXT, color TEXT, vin TEXT, engine TEXT, fuel_type TEXT,
    photo TEXT,
    last_service_km INTEGER,
    service_interval_km INTEGER,
    vtv_date TEXT,
    extintor_date TEXT
  )`);

  // Add columns if they don't exist (for existing databases)
  db.run(`ALTER TABLE cars ADD COLUMN photo TEXT`, (err) => {});
  db.run(`ALTER TABLE cars ADD COLUMN last_service_km INTEGER`, (err) => {});
  db.run(`ALTER TABLE cars ADD COLUMN service_interval_km INTEGER`, (err) => {});
  db.run(`ALTER TABLE cars ADD COLUMN vtv_date TEXT`, (err) => {});
  db.run(`ALTER TABLE cars ADD COLUMN extintor_date TEXT`, (err) => {});

  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_id INTEGER, description TEXT, amount REAL, kilometers INTEGER,
    category TEXT, date TIMESTAMP, photos TEXT,
    FOREIGN KEY (car_id) REFERENCES cars(id)
  )`);

  // Migrate price column to amount if it exists
  db.get(`SELECT sql FROM sqlite_master WHERE type='table' AND name='expenses'`, (err, row) => {
    if (!err && row && row.sql && row.sql.includes('price') && !row.sql.includes('amount')) {
      console.log('Migrating expenses table: renaming price to amount...');
      db.run(`ALTER TABLE expenses RENAME COLUMN price TO amount`, (err) => {
        if (err) console.error('Error renaming column:', err);
        else console.log('Migration completed: price -> amount');
      });
    }
  });

  db.run(`ALTER TABLE expenses ADD COLUMN photos TEXT`, (err) => {});
});

// Debug endpoint to check schema
app.get('/debug/schema', (req, res) => {
  db.all("PRAGMA table_info(cars)", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
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
  console.log('=== POST /cars FULL BODY ===');
  console.log(JSON.stringify(req.body, null, 2));
  const { brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, last_service_km, service_interval_km, vtv_date, extintor_date } = req.body;
  console.log('=== VALUES TO INSERT ===');
  console.log('last_service_km:', last_service_km, typeof last_service_km);
  console.log('service_interval_km:', service_interval_km, typeof service_interval_km);
  console.log('vtv_date:', vtv_date, typeof vtv_date);
  console.log('extintor_date:', extintor_date, typeof extintor_date);
  
  db.run(
    `INSERT INTO cars (brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, last_service_km, service_interval_km, vtv_date, extintor_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, last_service_km, service_interval_km, vtv_date, extintor_date],
    function (err) {
      if (err) {
        console.error('Error inserting car:', err);
        return res.status(500).json({ error: err.message });
      }
      console.log('Car added with ID:', this.lastID);
      console.log('Rows affected:', this.changes);
      res.json({ id: this.lastID });
    }
  );
});

app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id;
  
  db.serialize(() => {
    // Primero eliminamos los gastos asociados al auto
    db.run('DELETE FROM expenses WHERE car_id = ?', [carId], (err) => {
      if (err) return res.status(500).json({ error: 'Error deleting expenses: ' + err.message });
      
      // Luego eliminamos el auto
      db.run('DELETE FROM cars WHERE id = ?', [carId], function (err) {
        if (err) return res.status(500).json({ error: 'Error deleting car: ' + err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Car not found" });
        res.json({ message: "Car deleted successfully" });
      });
    });
  });
});

app.put('/cars/:id', (req, res) => {
  console.log('=== PUT /cars/:id FULL BODY ===');
  console.log(JSON.stringify(req.body, null, 2));
  const { brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, last_service_km, service_interval_km, vtv_date, extintor_date } = req.body;
  const carId = req.params.id;
  console.log('=== VALUES TO UPDATE ===');
  console.log('last_service_km:', last_service_km, typeof last_service_km);
  console.log('service_interval_km:', service_interval_km, typeof service_interval_km);
  console.log('vtv_date:', vtv_date, typeof vtv_date);
  console.log('extintor_date:', extintor_date, typeof extintor_date);
  
  db.run(
    `UPDATE cars SET 
      brand = ?, model = ?, year = ?, version = ?, 
      vehicle_type = ?, color = ?, vin = ?, engine = ?, fuel_type = ?, photo = ?,
      last_service_km = ?, service_interval_km = ?, vtv_date = ?, extintor_date = ?
     WHERE id = ?`,
    [brand, model, year, version, vehicle_type, color, vin, engine, fuel_type, photo, last_service_km, service_interval_km, vtv_date, extintor_date, carId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: "Car not found" });
      res.json({ message: "Car updated successfully" });
    }
  );
});

app.get('/expenses', (req, res) => {
  const { car_id } = req.query;
  if (car_id) {
    db.all('SELECT * FROM expenses WHERE car_id = ? ORDER BY date DESC', [car_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const expenses = rows.map(row => ({
        ...row,
        photos: row.photos ? JSON.parse(row.photos) : []
      }));
      res.json(expenses);
    });
  } else {
    db.all('SELECT * FROM expenses', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  }
});

app.get('/expenses/car/:carId', (req, res) => {
  db.all('SELECT * FROM expenses WHERE car_id = ?', [req.params.carId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const expenses = rows.map(row => ({
      ...row,
      photos: row.photos ? JSON.parse(row.photos) : []
    }));
    res.json(expenses);
  });
});

app.post('/expenses', (req, res) => {
  console.log('POST /expenses - Body:', req.body);
  const { car_id, description, amount, price, kilometers, category, date, photos } = req.body;
  const currentDate = date || new Date().toISOString();
  const priceValue = amount ?? price ?? 0;
  const photosJson = photos ? JSON.stringify(photos) : null;
  console.log('POST /expenses - Parsed:', { car_id, description, amount: priceValue, kilometers, category, date: currentDate, hasPhotos: !!photos });
  db.run(
    `INSERT INTO expenses (car_id, description, amount, kilometers, category, date, photos)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [car_id, description, priceValue, kilometers, category, currentDate, photosJson],
    function (err) {
      if (err) {
        console.error('Error inserting expense:', err);
        console.error('Values:', { car_id, description, amount: priceValue, kilometers, category, date: currentDate, photosJson });
        return res.status(500).json({ error: err.message });
      }
      if (kilometers && car_id) {
        db.get('SELECT kilometers FROM cars WHERE id = ?', [car_id], (err, car) => {
          if (!err && car && Number(kilometers) > (car.kilometers || 0)) {
            db.run('UPDATE cars SET kilometers = ? WHERE id = ?', [Number(kilometers), car_id]);
          }
        });
      }
      res.json({ id: this.lastID });
    }
  );
});
      }
      res.json({ id: this.lastID });
    }
  );
});

app.put('/expenses/:id', (req, res) => {
  const { description, amount, price, kilometers, category, date, photos } = req.body;
  const expenseId = req.params.id;
  const priceValue = amount ?? price ?? 0;
  const photosJson = photos ? JSON.stringify(photos) : null;
  
  db.run(
    `UPDATE expenses SET 
        description = ?, amount = ?, kilometers = ?, category = ?, date = ?, photos = ?
        WHERE id = ?`,
    [description, priceValue, kilometers, category, date, photosJson, expenseId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: "Expense not found" });
      res.json({ message: "Expense updated successfully" });
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

// Generate PDF Report
app.get('/reports/pdf', async (req, res) => {
  const { carId, dateFrom, dateTo, categories, language } = req.query;
  const lang = language || 'es';
  
  // Translations
  const translations = {
    es: {
      title: 'Informe de Gastos',
      vehicle: 'Vehículo',
      period: 'Período',
      allPeriod: 'Todo el período',
      categories: 'Categorías',
      allCategories: 'Todas',
      summary: 'Resumen',
      totalSpent: 'Total gastado',
      totalExpenses: 'Cantidad de gastos',
      average: 'Promedio',
      expenseList: 'Detalle de Gastos',
      date: 'Fecha',
      description: 'Descripción',
      category: 'Categoría',
      kilometers: 'Km',
      amount: 'Monto',
      generatedOn: 'Generado el',
      page: 'Página'
    },
    en: {
      title: 'Expense Report',
      vehicle: 'Vehicle',
      period: 'Period',
      allPeriod: 'All period',
      categories: 'Categories',
      allCategories: 'All',
      summary: 'Summary',
      totalSpent: 'Total spent',
      totalExpenses: 'Number of expenses',
      average: 'Average',
      expenseList: 'Expense Details',
      date: 'Date',
      description: 'Description',
      category: 'Category',
      kilometers: 'Km',
      amount: 'Amount',
      generatedOn: 'Generated on',
      page: 'Page'
    }
  };
  const t = translations[lang] || translations.es;

  // Build query
  let query = `SELECT * FROM expenses WHERE car_id = ?`;
  const params = [carId];

  if (dateFrom) {
    query += ` AND date >= ?`;
    params.push(dateFrom);
  }
  if (dateTo) {
    query += ` AND date <= ?`;
    params.push(dateTo);
  }
  if (categories) {
    const cats = categories.split(',').filter(c => c);
    if (cats.length > 0) {
      query += ` AND category IN (${cats.map(() => '?').join(',')})`;
      params.push(...cats);
    }
  }
  query += ` ORDER BY date DESC`;

  // Get car info
  db.get('SELECT * FROM cars WHERE id = ?', [carId], (err, car) => {
    if (err || !car) return res.status(404).json({ error: 'Car not found' });

    // Get expenses
    db.all(query, params, (err, expenses) => {
      if (err) return res.status(500).json({ error: err.message });

      // Generate PDF
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=report_${carId}_${Date.now()}.pdf`);
      doc.pipe(res);

      // Colors
      const black = '#1d1d1f';
      const gray = '#86868b';
      const lightGray = '#f5f5f7';
      const blue = '#0071e3';
      const white = '#ffffff';

      // Header
      doc.fontSize(24).fillColor(black).font('Helvetica-Bold').text(t.title, { align: 'left' });
      doc.moveDown(0.3);
      doc.fontSize(10).fillColor(gray).font('Helvetica').text(`${t.generatedOn}: ${new Date().toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US')}`, { align: 'left' });
      doc.moveDown(1);

      // Vehicle info box
      doc.roundedRect(50, doc.y, 495, 70, 8).fill(lightGray);
      doc.fillColor(black).fontSize(11).font('Helvetica-Bold').text(`${t.vehicle}:`, 70, doc.y + 15, { continued: true }).font('Helvetica').text(` ${car.brand} ${car.model} ${car.year} - ${car.vin}`);
      doc.fillColor(black).fontSize(11).font('Helvetica-Bold').text(`${t.period}:`, 70, doc.y + 5, { continued: true }).font('Helvetica').text(` ${dateFrom || t.allPeriod} - ${dateTo || t.allPeriod}`);
      doc.moveDown(2);

      // Summary
      const total = expenses.reduce((sum, e) => sum + e.price, 0);
      const avg = expenses.length > 0 ? total / expenses.length : 0;
      
      doc.fontSize(14).fillColor(black).font('Helvetica-Bold').text(t.summary);
      doc.moveDown(0.5);
      
      // Summary cards
      const cardY = doc.y;
      const cardWidth = 150;
      const cardHeight = 60;
      const cardGap = 23;
      
      // Card 1 - Total
      doc.roundedRect(50, cardY, cardWidth, cardHeight, 8).fill(blue);
      doc.fillColor(white).fontSize(10).font('Helvetica').text(t.totalSpent, 65, cardY + 12);
      doc.fontSize(16).font('Helvetica-Bold').text(`$ ${formatNumber(total)}`, 65, cardY + 30);
      
      // Card 2 - Count
      doc.roundedRect(50 + cardWidth + cardGap, cardY, cardWidth, cardHeight, 8).fill(lightGray);
      doc.fillColor(black).fontSize(10).font('Helvetica').text(t.totalExpenses, 65 + cardWidth + cardGap, cardY + 12);
      doc.fontSize(16).font('Helvetica-Bold').text(`${expenses.length}`, 65 + cardWidth + cardGap, cardY + 30);
      
      // Card 3 - Average
      doc.roundedRect(50 + (cardWidth + cardGap) * 2, cardY, cardWidth, cardHeight, 8).fill(lightGray);
      doc.fillColor(black).fontSize(10).font('Helvetica').text(t.average, 65 + (cardWidth + cardGap) * 2, cardY + 12);
      doc.fontSize(16).font('Helvetica-Bold').text(`$ ${formatNumber(Math.round(avg))}`, 65 + (cardWidth + cardGap) * 2, cardY + 30);
      
      doc.y = cardY + cardHeight + 30;

      // Expense table
      doc.fontSize(14).fillColor(black).font('Helvetica-Bold').text(t.expenseList);
      doc.moveDown(0.5);

      // Table header
      const tableTop = doc.y;
      const tableLeft = 50;
      const colWidths = [70, 180, 120, 65, 55];
      const rowHeight = 25;
      
      doc.roundedRect(tableLeft, tableTop, 495, rowHeight, 4).fill(black);
      doc.fillColor(white).fontSize(9).font('Helvetica-Bold');
      doc.text(t.date, tableLeft + 10, tableTop + 7, { width: colWidths[0] - 20 });
      doc.text(t.description, tableLeft + colWidths[0] + 10, tableTop + 7, { width: colWidths[1] - 20 });
      doc.text(t.category, tableLeft + colWidths[0] + colWidths[1] + 10, tableTop + 7, { width: colWidths[2] - 20 });
      doc.text(t.kilometers, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 10, tableTop + 7, { width: colWidths[3] - 20 });
      doc.text(t.amount, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 10, tableTop + 7, { width: colWidths[4] - 20 });

      // Table rows
      let y = tableTop + rowHeight;
      expenses.forEach((expense, index) => {
        if (y > 700) {
          doc.addPage();
          y = 50;
        }
        
        const bgColor = index % 2 === 0 ? white : lightGray;
        doc.roundedRect(tableLeft, y, 495, rowHeight, 0).fill(bgColor);
        
        doc.fillColor(black).fontSize(9).font('Helvetica');
        doc.text(formatDate(expense.date), tableLeft + 10, y + 7, { width: colWidths[0] - 20 });
        doc.text(expense.description.substring(0, 30), tableLeft + colWidths[0] + 10, y + 7, { width: colWidths[1] - 20 });
        doc.text(formatCategory(expense.category), tableLeft + colWidths[0] + colWidths[1] + 10, y + 7, { width: colWidths[2] - 20 });
        doc.text(expense.kilometers ? formatNumber(expense.kilometers) : '-', tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 10, y + 7, { width: colWidths[3] - 20 });
        doc.text(`$ ${formatNumber(expense.price)}`, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 10, y + 7, { width: colWidths[4] - 20 });
        
        y += rowHeight;
      });

      doc.end();
    });
  });
});

// Generate CSV Report
app.get('/reports/csv', (req, res) => {
  const { carId, dateFrom, dateTo, categories, language } = req.query;
  const lang = language || 'es';
  const selectedCats = categories ? categories.split(',').filter(c => c) : [];
  
  const tr = {
    es: {
      vehicle: 'Vehículo', brand: 'Marca', model: 'Modelo', year: 'Año',
      licensePlate: 'Patente', version: 'Versión', lastServiceKm: 'Último service',
      serviceEveryKm: 'Service cada', vtvDate: 'Fecha VTV', extinguisherDate: 'Fecha extintor',
      reportParameters: 'Parámetros del reporte', from: 'Desde', to: 'Hasta',
      categories: 'Categorías', allPeriod: 'Todo el período', allCategories: 'Todas',
      summary: 'Resumen', totalSpent: 'Total gastado', totalExpenses: 'Cantidad de gastos',
      average: 'Promedio'
    },
    en: {
      vehicle: 'Vehicle', brand: 'Brand', model: 'Model', year: 'Year',
      licensePlate: 'License Plate', version: 'Version', lastServiceKm: 'Last service',
      serviceEveryKm: 'Service every', vtvDate: 'VTV Date', extinguisherDate: 'Extinguisher Date',
      reportParameters: 'Report Parameters', from: 'From', to: 'To',
      categories: 'Categories', allPeriod: 'All period', allCategories: 'All',
      summary: 'Summary', totalSpent: 'Total spent', totalExpenses: 'Total expenses',
      average: 'Average'
    }
  };
  const t = tr[lang] || tr.es;
  const headers = {
    es: ['Fecha', 'Descripción', 'Categoría', 'Kilómetros', 'Monto'],
    en: ['Date', 'Description', 'Category', 'Kilometers', 'Amount']
  };

  // Fetch car data
  db.get('SELECT * FROM cars WHERE id = ?', [carId], (err, car) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!car) return res.status(404).json({ error: 'Car not found' });

    // Build query
    let query = `SELECT * FROM expenses WHERE car_id = ?`;
    const params = [carId];

    if (dateFrom) {
      query += ` AND date >= ?`;
      params.push(dateFrom);
    }
    if (dateTo) {
      query += ` AND date <= ?`;
      params.push(dateTo);
    }
    if (selectedCats.length > 0) {
      query += ` AND category IN (${selectedCats.map(() => '?').join(',')})`;
      params.push(...selectedCats);
    }
    query += ` ORDER BY date DESC`;

    db.all(query, params, (err, expenses) => {
      if (err) return res.status(500).json({ error: err.message });

      let csv = '\ufeff';
      
      csv += `# ${t.vehicle}\n`;
      csv += `${t.brand},${car.brand || ''}\n`;
      csv += `${t.model},${car.model || ''}\n`;
      csv += `${t.year},${car.year || ''}\n`;
      csv += `${t.licensePlate},${car.vin || ''}\n`;
      if (car.version) csv += `${t.version},${car.version}\n`;
      if (car.last_service_km != null) csv += `${t.lastServiceKm},${car.last_service_km.toLocaleString('es-AR')} km\n`;
      if (car.service_interval_km != null) csv += `${t.serviceEveryKm},${car.service_interval_km.toLocaleString('es-AR')} km\n`;
      if (car.vtv_date) csv += `${t.vtvDate},${formatDate(car.vtv_date)}\n`;
      if (car.extintor_date) csv += `${t.extinguisherDate},${formatDate(car.extintor_date)}\n`;
      csv += '\n';
      
      csv += `# ${t.reportParameters}\n`;
      csv += `${t.from},${dateFrom || t.allPeriod}\n`;
      csv += `${t.to},${dateTo || t.allPeriod}\n`;
      csv += '\n';
      
      const total = expenses.reduce((sum, e) => sum + (e.price || 0), 0);
      const count = expenses.length;
      const avg = count > 0 ? total / count : 0;
      
      csv += `# ${t.summary}\n`;
      csv += `${t.totalSpent},$ ${formatNumber(total)}\n`;
      csv += `${t.totalExpenses},${count}\n`;
      csv += `${t.average},$ ${formatNumber(Math.round(avg))}\n`;
      csv += '\n';
      
      csv += `${headers[lang].join(',')}\n`;
      
      expenses.forEach(expense => {
        const row = [
          formatDate(expense.date),
          `"${(expense.description || '').replace(/"/g, '""')}"`,
          formatCategory(expense.category),
          expense.kilometers || '',
          expense.price || 0
        ];
        csv += row.join(',') + '\n';
      });
      
      csv += '\n';
      csv += `# ${t.summary}\n`;
      csv += `${t.totalSpent},$ ${formatNumber(total)}\n`;
      csv += `${t.totalExpenses},${count}\n`;
      csv += `${t.average},$ ${formatNumber(Math.round(avg))}\n`;

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=report_${carId}_${Date.now()}.csv`);
      res.send(csv);
    });
  });
});

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-AR');
}

function formatCategory(cat) {
  const categories = {
    accesorios: 'Accesorios',
    chapa_pintura: 'Chapa y pintura',
    combustible: 'Combustible',
    electricidad: 'Electricidad',
    estacionamiento: 'Estacionamiento',
    extintor: 'Extintor',
    grua_asistencia: 'Grúa / asistencia',
    lavado: 'Lavado',
    mantenimiento: 'Mantenimiento',
    mejoras_tuning: 'Mejoras / tuning',
    multas: 'Multas',
    neumaticos: 'Neumáticos',
    patente: 'Patente',
    peajes: 'Peajes',
    reparacion: 'Reparación',
    reparaciones_mecanicas: 'Reparaciones mecánicas',
    repuestos: 'Repuestos',
    seguro: 'Seguro',
    service: 'Service',
    vtv_itv: 'VTV / ITV',
    otros: 'Otros'
  };
  return categories[cat] || cat;
}

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});