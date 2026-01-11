const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ebook_covers",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      { width: 600, height: 800, crop: "limit" },
    ],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}).single("cover"); //  MUST match frontend FormData key

module.exports = upload;
