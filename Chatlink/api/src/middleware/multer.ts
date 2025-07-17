import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import CustomError from "../utils/customError";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  console.log("MULTER: ", req.file);
  const allowedTypes = /jpeg|jpg|png/; // regex matching

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new CustomError("Only jpeg, jpg and png images are allowed", 500));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // limit image size to 1MB
  fileFilter,
});
