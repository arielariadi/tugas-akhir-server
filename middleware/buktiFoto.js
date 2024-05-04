const multer = require('multer');

const imageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb('Please upload only images.', false);
	}
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/bukti-foto');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

var buktiFoto = multer({ storage: storage, fileFilter: imageFilter });
module.exports = buktiFoto;
