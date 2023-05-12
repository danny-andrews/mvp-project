import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, PORT } = process.env;

const app = express();

const db = new pg.Pool({
  connectionString: DATABASE_URL,
});

app.use(express.json());
app.use(express.static("public"));

app.get("/api/todos", (_, res) => {
  db.query("SELECT * FROM todo ORDER BY created_at").then((data) => {
    res.send(data.rows);
  });
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todo WHERE id = $1 RETURNING *", [id]).then((data) => {
    res.send(data.rows[0]);
  });
});

app.patch("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  db.query("UPDATE todo SET text = $1 WHERE id = $2 RETURNING *", [
    text,
    id,
  ]).then((data) => {
    res.send(data.rows[0]);
  });
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  db.query("INSERT INTO todo (text, created_at) VALUES ($1, $2) RETURNING *", [
    text,
    new Date(),
  ]).then((result) => {
    res.send(result.rows[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
