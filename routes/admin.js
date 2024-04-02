var express = require('express');
var router = express.Router();

const {
	getAllBloodBank,
	// getBloodBankByPmiId,
	// updateBloodBankByPmiId,
	getBloodBank,
	updateBloodBank,
	getAllBloodDonors,

	getBloodRequest,
	acceptRequestBloodRequest,
	rejectRequestBloodRequest,

	adminProfile,
	updateAdminProfile,
} = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/middleware');

router.get('/dashboardAdmin', getAllBloodBank);
// router.get('/bankDarah/:id', getBloodBankByPmiId);
// router.put("/bankDarah/update/:id", updateBloodBankByPmiId);
router.get('/bankDarah', getBloodBank);
router.put('/bankDarah/update', updateBloodBank);
router.get('/pendonorDarah', getAllBloodDonors);

router.get('/requestDarah', authenticateToken, getBloodRequest);
router.post(
	'/requestDarah/accept',
	authenticateToken,
	acceptRequestBloodRequest
);
router.post(
	'/requestDarah/reject',
	authenticateToken,
	rejectRequestBloodRequest
);

router.get('/adminProfile', authenticateToken, adminProfile);
router.put('/adminProfile/update', authenticateToken, updateAdminProfile);

module.exports = router;
