const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, _file, cb) {
    cb(null, 'uploads/');
  },

  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const multerUpload = multer({ storage });

module.exports = multerUpload;

