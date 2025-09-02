import bcrypt from "bcryptjs";
import { initDB } from "./db.js";

const seed = async () => {
  const db = await initDB();

  const techPassword = await bcrypt.hash("tech123", 10);
  const dentistPassword = await bcrypt.hash("dentist123", 10);

  await db.run(
    "INSERT OR IGNORE INTO users (email, password, role) VALUES (?, ?, ?)",
    ["tech@oralvis.com", techPassword, "Technician"]
  );
  await db.run(
    "INSERT OR IGNORE INTO users (email, password, role) VALUES (?, ?, ?)",
    ["dentist@oralvis.com", dentistPassword, "Dentist"]
  );

  console.log("✅ Seed users created!");
};

seed();
