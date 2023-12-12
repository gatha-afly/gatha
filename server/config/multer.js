import multer from "multer";
import bytes from "bytes";
import storage from "./cloudStorage.js";

const upload = multer({
  storage: storage, //this storage is from cloudinary
  limits: { fileSize: bytes("10MB") },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      //Allow the image types: jpeg or png
      cb(null, true);
    } else {
      //Prevent upload
      cb({ error: "Unsupported File Type" }, false);
    }
  },
});

export default upload;
