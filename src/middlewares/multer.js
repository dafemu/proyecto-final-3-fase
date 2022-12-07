import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profileImages");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + "-" + originalName);
  },
  
});

const upload = multer({ storage: storage });

export default upload;

