import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import scanRoutes from "./routes/scans.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


let db;
initDB().then((database) => {
  db = database;
  console.log("✅ SQLite Database connected");
  app.locals.db = db; 
});


app.use("/api/auth", authRoutes);
app.use("/api/scans", scanRoutes);

app.get("/", (req, res) => {
  res.send("OralVis Healthcare Backend is running ✅");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
