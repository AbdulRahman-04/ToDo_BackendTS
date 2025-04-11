import multer, { StorageEngine } from "multer";
import { Request } from "express";

// Storage config with proper types
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, file.originalname);
  },
});

// 👇 Export the configured multer instance
const upload = multer({ storage });
export default upload;
