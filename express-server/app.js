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
const defaultImageUrl = 'https://b.zmtcdn.com/data/pictures/chains/8/17582668/f3ff86b21f7eefa256dfc0db0cf62e23_featured_v2.jpg';

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
      res.status(500).send({ error: err.message });
    } else {
      const image = imageUrls.find(img => img.id === row.ID);
      row.imageUrl = image ? image.imageUrl : defaultImageUrl;
      res.json(row);
    }
  });
});

// Get List of Restaurants with Pagination
app.get('/api/restaurants', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.all(`SELECT * FROM restaurants LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      db.get(`SELECT COUNT(*) AS count FROM restaurants`, (err, countResult) => {
        if (err) {
          res.status(500).send({ error: err.message });
        } else {
          const total = countResult.count;
          const result = rows.map(row => {
            const image = imageUrls.find(img => img.id === row.ID);
            return { ...row, imageUrl: image ? image.imageUrl : defaultImageUrl };
          });
          res.json({ restaurants: result, total });
        }
      });
    }
  });
});

// Add a review
app.post('/api/put-restaurants', (req, res) => {
  const { username, rating, suggestions } = req.body;
  const query = `INSERT INTO reviewa (Name, Description, Rating) VALUES (?, ?, ?)`;
  db.run(query, [username, suggestions, rating], function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({ id: this.lastID, username, suggestions, rating });
    }
  });
});

// Fetch reviews
app.get('/api/fetch', (req, res) => {
  db.all(`SELECT * FROM reviewa`, (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Search Restaurants with Pagination
app.get('/api/search-restaurants', (req, res) => {
  const query = req.query.q.toLowerCase();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.all(
    `SELECT * FROM restaurants WHERE ID LIKE ? OR lower(name) LIKE ? OR lower(cuisine) LIKE ? OR lower(address) LIKE ? LIMIT ? OFFSET ?`,
    [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, limit, offset],
    (err, rows) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        db.get(
          `SELECT COUNT(*) AS count FROM restaurants WHERE ID LIKE ? OR lower(name) LIKE ? OR lower(cuisine) LIKE ? OR lower(address) LIKE ?`,
          [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`],
          (err, countResult) => {
            if (err) {
              res.status(500).send({ error: err.message });
            } else {
              const total = countResult.count;
              const result = rows.map(row => {
                const image = imageUrls.find(img => img.id === row.ID);
                return { ...row, imageUrl: image ? image.imageUrl : defaultImageUrl };
              });
              res.json({ restaurants: result, total });
            }
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
