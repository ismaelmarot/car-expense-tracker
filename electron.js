const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  const iconPath = path.join(__dirname, 'app-icon.png');
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    resizable: true,
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
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
    
    // Usamos la misma DB que Electron está usando
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
    


    backendApp.get('/expenses/car/:carId', (req, res) => {
       db.all('SELECT * FROM expenses WHERE car_id = ?', [req.params.carId], (err, rows) => {
         if (err) return res.status(500).json({ error: err.message });
         const expenses = rows.map(row => ({
           ...row,
           photos: row.photos ? JSON.parse(row.photos) : []
         }));
         res.json(expenses);
       });
     });
    
    backendApp.post('/expenses', (req, res) => {
      const { car_id, price, amount, category, description, date, kilometers, photos } = req.body;
      const priceValue = price ?? amount ?? 0;
      const photosStr = photos ? JSON.stringify(photos) : null;
      const stmt = db.prepare(`INSERT INTO expenses (car_id, amount, category, description, date, kilometers, photos) VALUES (?, ?, ?, ?, ?, ?, ?)`);
      stmt.run(car_id, priceValue, category, description, date, kilometers, photosStr, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (kilometers && car_id) {
          db.get('SELECT kilometers FROM cars WHERE id = ?', [car_id], (err, car) => {
            if (!err && car && Number(kilometers) > (car.kilometers || 0)) {
              db.run('UPDATE cars SET kilometers = ? WHERE id = ?', [Number(kilometers), car_id]);
            }
          });
        }
        res.json({ id: this.lastID });
      });
      stmt.finalize();
    });
    
    backendApp.put('/expenses/:id', (req, res) => {
      const { price, amount, category, description, date, kilometers, photos, car_id } = req.body;
      const priceValue = price ?? amount ?? 0;
      const photosStr = photos ? JSON.stringify(photos) : null;
      const stmt = db.prepare(`UPDATE expenses SET amount=?, category=?, description=?, date=?, kilometers=?, photos=? WHERE id=?`);
      stmt.run(priceValue, category, description, date, kilometers, photosStr, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (kilometers && car_id) {
          db.get('SELECT kilometers FROM cars WHERE id = ?', [car_id], (err, car) => {
            if (!err && car && Number(kilometers) > (car.kilometers || 0)) {
              db.run('UPDATE cars SET kilometers = ? WHERE id = ?', [Number(kilometers), car_id]);
            }
          });
        }
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
      console.log('PDF Report request received:', req.query);
      const { car_id, start_date, end_date, categories } = req.query;
      
      // First get car info
      let carQuery = "SELECT * FROM cars";
      let carParams = [];
      if (car_id) {
        carQuery = "SELECT * FROM cars WHERE id = ?";
        carParams = [car_id];
      }
      
      db.all(carQuery, carParams, (carErr, cars) => {
        if (carErr) {
          console.error('Car query error:', carErr);
          return res.status(500).json({ error: carErr.message });
        }
        
        let query = "SELECT e.*, c.brand, c.model FROM expenses e JOIN cars c ON e.car_id = c.id WHERE 1=1";
        const params = [];
        if (car_id) { query += " AND e.car_id = ?"; params.push(car_id); }
        if (start_date) { query += " AND e.date >= ?"; params.push(start_date); }
        if (end_date) { query += " AND e.date <= ?"; params.push(end_date); }
        if (categories && categories.trim()) {
          const cats = categories.split(',').filter(c => c.trim());
          if (cats.length > 0) {
            query += ` AND e.category IN (${cats.map(() => '?').join(',')})`;
            params.push(...cats);
          }
        }
        query += " ORDER BY e.date DESC";
        
        console.log('PDF Query:', query);
        console.log('PDF Params:', params);
        
        db.all(query, params, (err, expenses) => {
          if (err) {
            console.error('PDF Report error:', err);
            return res.status(500).json({ error: err.message });
          }
          
          console.log('Found expenses:', expenses.length);
          
          try {
            const PDFDocument = require('pdfkit');
            const doc = new PDFDocument({ 
              size: 'A4', 
              margin: 40,
              autoFirstPage: true,
              bufferPages: true,
              info: {
                Title: 'Reporte de Gastos del Vehículo',
                Author: 'Car Expenses Tracker'
              }
            });
            
            // Create a buffer to collect PDF data
            const chunks = [];
            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => {
              if (!res.headersSent) {
                const pdfBuffer = Buffer.concat(chunks);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=reporte-gastos.pdf');
                res.setHeader('Content-Length', pdfBuffer.length);
                res.send(pdfBuffer);
              }
            });
            doc.on('error', (pdfErr) => {
              console.error('PDF document error:', pdfErr);
              if (!res.headersSent) {
                res.status(500).json({ error: 'Error generating PDF document' });
              }
            });
            
            // Colors
            const primaryBlue = '#0071e3';
            const darkText = '#1d1d1f';
            const grayText = '#86868b';
            const lightGray = '#f5f5f7';
            const white = '#ffffff';
            
            // Page dimensions
            const pageWidth = doc.page.width - 80; // margins
            let y = 40;
            
            // Header background
            doc.rect(40, y, pageWidth, 80).fill(primaryBlue);
            
            // App title
            doc.fontSize(24).fillColor(white).font('Helvetica-Bold')
              .text('CarET', 50, y + 15);
            
            // Report title
            doc.fontSize(16).font('Helvetica')
              .text('Reporte de Gastos', 50, y + 45);
            
            // Date on right side of header
            const today = new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
            doc.fontSize(10).text(today, pageWidth - 60, y + 25, { align: 'right' });
            
            y += 100;
            
            // Vehicle info card
            if (cars && cars.length > 0) {
              doc.roundedRect(40, y, pageWidth, 60, 5).fill(lightGray);
              doc.fontSize(10).fillColor(grayText).font('Helvetica')
                .text('Vehículo', 55, y + 10);
              doc.fontSize(14).fillColor(darkText).font('Helvetica-Bold')
                .text(`${cars[0].brand} ${cars[0].model} (${cars[0].year || 'N/A'})`, 55, y + 25);
              if (cars[0].vin) {
                doc.fontSize(10).fillColor(grayText).font('Helvetica')
                  .text(`VIN: ${cars[0].vin}`, 55, y + 45);
              }
              y += 80;
            }
            
            // Period info
            if (start_date || end_date) {
              doc.roundedRect(40, y, pageWidth, 40, 5).fill(lightGray);
              doc.fontSize(10).fillColor(grayText).font('Helvetica')
                .text('Período del reporte', 55, y + 8);
              const formatDate = (d) => d ? new Date(d).toLocaleDateString('es-ES') : 'Inicio';
              doc.fontSize(11).fillColor(darkText).font('Helvetica-Bold')
                .text(`${formatDate(start_date)} - ${formatDate(end_date)}`, 55, y + 22);
              y += 60;
            }
            
            // Summary cards
            if (expenses && expenses.length > 0) {
              const total = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
              const avgPerExpense = total / expenses.length;
              
              // Total card
              doc.roundedRect(40, y, pageWidth / 2 - 10, 50, 5).fill(primaryBlue);
              doc.fontSize(9).fillColor('rgba(255,255,255,0.8)').font('Helvetica')
                .text('TOTAL GASTOS', 55, y + 10);
              doc.fontSize(18).fillColor(white).font('Helvetica-Bold')
                .text(`$${total.toLocaleString('es-AR')}`, 55, y + 25);
              
              // Count card
              doc.roundedRect(pageWidth / 2 + 50, y, pageWidth / 2 - 10, 50, 5).fill(lightGray);
              doc.fontSize(9).fillColor(grayText).font('Helvetica')
                .text('CANTIDAD DE GASTOS', pageWidth / 2 + 65, y + 10);
              doc.fontSize(18).fillColor(darkText).font('Helvetica-Bold')
                .text(expenses.length.toString(), pageWidth / 2 + 65, y + 25);
              
              y += 70;
              
              // Table
              y += 10;
              
              // Table with proper grid
              const col1X = 45;    // Descripción
              const col2X = 280;   // KM
              const col3X = 370;   // Fecha
              const col4X = 460;   // Monto
              const col1Width = 230;
              const col2Width = 85;
              const col3Width = 85;
              const col4Width = 75;
              const rowHeight = 24;
              const headerHeight = 28;
              
              // Table header background
              doc.rect(40, y, pageWidth, headerHeight).fill(primaryBlue);
              
              // Header text
              doc.fontSize(10).fillColor(white).font('Helvetica-Bold');
              doc.text('DESCRIPCIÓN', col1X, y + 8, { width: col1Width });
              doc.text('KM', col2X, y + 8, { width: col2Width, align: 'center' });
              doc.text('FECHA', col3X, y + 8, { width: col3Width, align: 'center' });
              doc.text('MONTO', col4X, y + 8, { width: col4Width, align: 'right' });
              
              y += headerHeight;
              
              // Table rows
              expenses.forEach((exp, index) => {
                // Check if we need a new page
                if (y > doc.page.height - 100) {
                  doc.addPage();
                  y = 40;
                  
                  // Redraw header on new page
                  doc.rect(40, y, pageWidth, headerHeight).fill(primaryBlue);
                  doc.fontSize(10).fillColor(white).font('Helvetica-Bold');
                  doc.text('DESCRIPCIÓN', col1X, y + 8, { width: col1Width });
                  doc.text('KM', col2X, y + 8, { width: col2Width, align: 'center' });
                  doc.text('FECHA', col3X, y + 8, { width: col3Width, align: 'center' });
                  doc.text('MONTO', col4X, y + 8, { width: col4Width, align: 'right' });
                  y += headerHeight;
                }
                
                // Alternating row colors
                const bgColor = index % 2 === 0 ? white : lightGray;
                doc.rect(40, y, pageWidth, rowHeight).fill(bgColor);
                
                // Row border (light line at bottom)
                doc.moveTo(40, y + rowHeight).lineTo(40 + pageWidth, y + rowHeight)
                  .strokeColor('#e5e5ea').stroke();
                
                // Format date
                const expDate = new Date(exp.date);
                const formattedDate = expDate.toLocaleDateString('es-AR', { 
                  day: '2-digit', 
                  month: '2-digit',
                  year: 'numeric'
                });
                
                // Format kilometers
                const km = exp.kilometers ? exp.kilometers.toLocaleString('es-AR') : '-';
                
                // Description (truncated if too long)
                const desc = exp.description || 'Sin descripción';
                const truncatedDesc = desc.length > 35 ? desc.substring(0, 35) + '...' : desc;
                
                // Format amount
                const amount = parseFloat(exp.amount) || 0;
                const formattedAmount = `$${amount.toLocaleString('es-AR')}`;
                
                // Cell content
                doc.fontSize(9).fillColor(darkText).font('Helvetica');
                doc.text(truncatedDesc, col1X, y + 7, { width: col1Width });
                doc.text(km, col2X, y + 7, { width: col2Width, align: 'center' });
                doc.text(formattedDate, col3X, y + 7, { width: col3Width, align: 'center' });
                doc.font('Helvetica-Bold').fillColor(primaryBlue)
                  .text(formattedAmount, col4X, y + 7, { width: col4Width, align: 'right' });
                
                y += rowHeight;
              });
              
              // Table border (outer)
              doc.rect(40, y - (expenses.length * rowHeight) - headerHeight, pageWidth, (expenses.length * rowHeight) + headerHeight)
                .lineWidth(1).strokeColor('#e5e5ea').stroke();
              
              // Total section
              y += 10;
              doc.rect(40, y, pageWidth, 40).fill(primaryBlue);
              doc.fontSize(12).fillColor(white).font('Helvetica-Bold');
              doc.text('TOTAL GASTOS', col1X, y + 12, { width: 300 });
              doc.fontSize(16)
                .text(`$${total.toLocaleString('es-AR')}`, col4X - 50, y + 10, { width: 130, align: 'right' });
              
              y += 60;
              
              // Category breakdown
              if (y < doc.page.height - 150) {
                const categoryTotals = {};
                expenses.forEach(exp => {
                  const cat = exp.category || 'otros';
                  categoryTotals[cat] = (categoryTotals[cat] || 0) + (parseFloat(exp.amount) || 0);
                });
                
                doc.roundedRect(40, y, pageWidth, 15, 3).fill(lightGray);
                doc.fontSize(10).fillColor(darkText).font('Helvetica-Bold')
                  .text('Desglose por Categoría', 55, y + 3);
                y += 20;
                
                Object.entries(categoryTotals)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .forEach(([cat, amount]) => {
                    const percentage = (amount / total * 100).toFixed(1);
                    doc.fontSize(9).fillColor(darkText).font('Helvetica')
                      .text(cat, 55, y, { width: 150 });
                    doc.text(`$${amount.toLocaleString('es-AR')}`, 210, y, { width: 80 });
                    doc.fillColor(grayText).text(`${percentage}%`, 295, y, { width: 50 });
                    y += 15;
                  });
              }
              
            } else {
              // No expenses message
              doc.roundedRect(40, y, pageWidth, 60, 5).fill(lightGray);
              doc.fontSize(12).fillColor(grayText).font('Helvetica')
                .text('No hay gastos en el período seleccionado.', 55, y + 20, { 
                  width: pageWidth - 30, 
                  align: 'center' 
                });
            }
            
            // Footer
            const footerY = doc.page.height - 50;
            doc.fontSize(8).fillColor(grayText).font('Helvetica')
              .text('Generado por CarET - Vehicle Expenses Tracker', 40, footerY, { 
                width: pageWidth, 
                align: 'center' 
              });
            doc.text(`Página 1`, 40, footerY + 12, { 
              width: pageWidth, 
              align: 'center' 
            });
            
            doc.end();
            console.log('PDF generated successfully');
          } catch (pdfError) {
            console.error('PDF generation error:', pdfError);
            if (!res.headersSent) {
              res.status(500).json({ error: 'Error generating PDF: ' + pdfError.message });
            }
          }
        });
      });
    });
    
    backendApp.get('/reports/csv', (req, res) => {
      console.log('CSV Report request received:', req.query);
      const { car_id, start_date, end_date, categories } = req.query;
      
      let query = "SELECT e.*, c.brand, c.model, c.year as car_year FROM expenses e JOIN cars c ON e.car_id = c.id WHERE 1=1";
      const params = [];
      if (car_id) { query += " AND e.car_id = ?"; params.push(car_id); }
      if (start_date) { query += " AND e.date >= ?"; params.push(start_date); }
      if (end_date) { query += " AND e.date <= ?"; params.push(end_date); }
      if (categories && categories.trim()) {
        const cats = categories.split(',').filter(c => c.trim());
        if (cats.length > 0) {
          query += ` AND e.category IN (${cats.map(() => '?').join(',')})`;
          params.push(...cats);
        }
      }
      query += " ORDER BY e.date DESC";
      
      console.log('CSV Query:', query);
      console.log('CSV Params:', params);
      
      db.all(query, params, (err, expenses) => {
        if (err) {
          console.error('CSV Report error:', err);
          return res.status(500).json({ error: err.message });
        }
        
        console.log('Found expenses for CSV:', expenses.length);
        
        try {
          const { Parser } = require('json2csv');
          
          // Transform data with Spanish headers
          const transformedData = (expenses || []).map(exp => ({
            'Fecha': exp.date,
            'Vehículo': `${exp.brand || ''} ${exp.model || ''} (${exp.car_year || 'N/A'})`,
            'Categoría': exp.category,
            'Descripción': exp.description || 'Sin descripción',
            'Kilómetros': exp.kilometers || 0,
            'Monto ($)': exp.amount || 0
          }));
          
          const fields = ['Fecha', 'Vehículo', 'Categoría', 'Descripción', 'Kilómetros', 'Monto ($)'];
          const opts = { fields };
          const parser = new Parser(opts);
          const csv = parser.parse(transformedData);
          
          res.setHeader('Content-Type', 'text/csv; charset=utf-8');
          res.setHeader('Content-Disposition', 'attachment; filename=reporte-gastos.csv');
          res.send('\ufeff' + csv);
          console.log('CSV generated successfully');
        } catch (csvError) {
          console.error('CSV generation error:', csvError);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Error generating CSV: ' + csvError.message });
          }
        }
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