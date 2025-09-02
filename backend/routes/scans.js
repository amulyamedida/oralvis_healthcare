import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import sharp from "sharp";
import fs from "fs/promises"; 

const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.post(
  "/upload",
  authMiddleware(["Technician"]),
  upload.single("scanImage"),
  async (req, res) => {
    const { patientName, patientId, scanType, region } = req.body;
    const db = req.app.locals.db;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    try {
      const compressedBuffer = await sharp(req.file.path)
        .resize({ width: 1200 })   
        .jpeg({ quality: 80 })     
        .toBuffer();

      
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "oralvis-scans" }, 
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(compressedBuffer);
      });

      
      const uploadDate = new Date().toISOString();
      await db.run(
        `INSERT INTO scans (patientName, patientId, scanType, region, imageUrl, uploadDate)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [patientName, patientId, scanType, region, result.secure_url, uploadDate]
      );

      
      await fs.unlink(req.file.path);

      res.json({ message: "Scan uploaded successfully ✅" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed", error: err.message });
    }
  }
);

router.get(
  "/",
  authMiddleware(["Dentist"]),
  async (req, res) => {
    const db = req.app.locals.db;
    try {
      const scans = await db.all("SELECT * FROM scans ORDER BY uploadDate DESC");
      res.json(scans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch scans", error: err.message });
    }
  }
);

export default router;
