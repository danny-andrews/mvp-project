import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.static("public"));

app.get("/api/songs", (_, res) => {
  db.query("SELECT * FROM song").then((data) => {
    res.json(data.rows);
  });
});

// TODO: Replace 3000 with process.env.PORT
app.listen(3000, () => {
  console.log(`listening on Port ${3000}`);
});
