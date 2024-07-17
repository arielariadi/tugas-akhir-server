// jadwal.js
var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/middleware');

// Route to get all jadwal data
router.get('/', authenticateToken, dashboardController.getDashboardUser);
router.get(
	'/userValidationBloodDonor',
	authenticateToken,
	dashboardController.getDashboardUserValidationBloodDonor
);
router.get(
	'/requestDarah',
	authenticateToken,
	dashboardController.getDashboardUserRequestDarah
);

module.exports = router;
