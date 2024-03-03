const express = require("express");
const sqlite3 = require("sqlite3");

const app = express();
const port = 3001; // Or any port of your choice
const db = new sqlite3.Database("db.sqlite");

// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
    next();
  });
  

app.use(express.json());

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, type TEXT, brand TEXT)");
});

// Define your routes here for CRUD operations
// Get all items
app.get("/items", (req, res) => {
    db.all("SELECT * FROM items", (err, rows) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(rows);
      }
    });
  });
  
// Add a new item
app.post("/items", (req, res) => {
    const { name, price, type, brand } = req.body;
    db.run(
        "INSERT INTO items (name, price, type, brand) VALUES (?, ?, ?, ?)",
        [name, price, type, brand],
        function (err) {
            if (err) {
                console.error("Error inserting item:", err);
                res.status(500).send(err);
            } else {
                console.log("Item added:", { id: this.lastID, name, price, type, brand });
                res.json({ id: this.lastID });
            }
        }
    );
});

  
  
  // Implement other CRUD operations as needed

  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
