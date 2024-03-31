var express = require('express');
var router = express.Router();
const { requestDarah } = require('../controllers/requestDarahController');
const { authenticateToken } = require('../middleware/middleware');
const upload = require('../middleware/upload');

// route to handle request darah
router.post(
	'/request',
	authenticateToken,
	upload.single('surat_permohonan_image'),
	(req, res) => {
		requestDarah(req, res); // Panggil fungsi requestDarah sebagai callback
	}
);

module.exports = router;
