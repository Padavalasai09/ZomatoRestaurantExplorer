const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); 

// Connect to SQLite database
const dbPath = path.join(__dirname, '../db', 'zomato.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
  }
});

// Load image URLs
const imageUrlsPath = path.join(__dirname, 'ImageUrls.json');
const imageUrls = JSON.parse(fs.readFileSync(imageUrlsPath, 'utf8'));

// Get Restaurant by ID
app.get('/api/restaurants/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM restaurants WHERE ID = ?`, [id], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      const image = imageUrls.find(img => img.id === row.ID);
      row.imageUrl = image ? image.imageUrl : '';
      res.json(row);
    }
  });
});

// Get List of Restaurants with Pagination
app.get('/api/restaurants', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  db.all(`SELECT * FROM restaurants LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      // Add image URL to each restaurant
      const result = rows.map(row => {
        const image = imageUrls.find(img => img.id === row.ID);
        return { ...row, imageUrl: image ? image.imageUrl : '' };
      });
      res.json(result);
    }
  });
});

// Search Restaurants with Pagination
app.get('/api/search-restaurants', (req, res) => {
  const query = req.query.q.toLowerCase();
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  db.all(
    `SELECT * FROM restaurants WHERE  lower(name) LIKE ? OR lower(cuisine) LIKE ? OR lower(address) LIKE ? LIMIT ? OFFSET ?`,
    [`%${query}%`, `%${query}%`, `%${query}%`, limit, offset],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        // Add image URL to each restaurant
        const result = rows.map(row => {
          const image = imageUrls.find(img => img.id === row.ID);
          return { ...row, imageUrl: image ? image.imageUrl : '' };
        });
        res.json(result);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
