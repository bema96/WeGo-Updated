// src/routes/health.ts
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";

const r = Router();
r.post("/cloudinary", (_req, res) => {
  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/ed3bVcAAAAASUVORK5CYII=",
    "base64"
  );
  cloudinary.uploader
    .upload_stream({ folder: "health" }, (err, out) => {
      if (err) return res.status(500).json({ error: String(err) });
      res.json({ public_id: out?.public_id, secure_url: out?.secure_url });
    })
    .end(pixel);
});

export default r;
