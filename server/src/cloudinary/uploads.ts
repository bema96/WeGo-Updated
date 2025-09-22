import { Router, type RequestHandler } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ secure: true });

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const uploadImage: RequestHandler = async (req, res) => {
  try {
    if (!req.file) { res.status(400).json({ message: "No file" }); return; }
    const b64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const out = await cloudinary.uploader.upload(b64, { folder: "wego", resource_type: "image" });
    res.status(200).json({ url: out.secure_url, public_id: out.public_id });
  } catch (e:any) {
    res.status(500).json({ message: e.message || "upload failed" });
  }
};

router.post("/image", upload.single("file"), uploadImage);


export const uploadRoutes = router;
