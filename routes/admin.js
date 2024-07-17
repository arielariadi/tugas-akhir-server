var express = require('express');
var router = express.Router();

const {
	getAllBloodBank,
	// getBloodBankByPmiId,
	// updateBloodBankByPmiId,
	getBloodBank,
	updateBloodBank,
	getAllBloodDonors,
	acceptBloodDonorRegistration,
	rejectBloodDonorRegistration,

	getAllAcceptedBloodDonors,
	acceptValidationBloodDonor,
	rejectValidationBloodDonor,

	getBloodRequest,
	acceptRequestBloodRequest,
	rejectRequestBloodRequest,

	adminProfile,
	updateAdminProfile,
} = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/middleware');
const buktiFoto = require('../middleware/buktiFoto');

router.get('/dashboardAdmin', getAllBloodBank);
// router.get('/bankDarah/:id', getBloodBankByPmiId);
// router.put("/bankDarah/update/:id", updateBloodBankByPmiId);
router.get('/bankDarah', getBloodBank);
router.put('/bankDarah/update', updateBloodBank);

router.get('/pendonorDarah', getAllBloodDonors);
router.post('/pendonorDarah/accept', acceptBloodDonorRegistration);
router.post('/pendonorDarah/reject', rejectBloodDonorRegistration);

router.get('/showAcceptedCalonPendonorDarah', getAllAcceptedBloodDonors);
router.post(
	'/showAcceptedCalonPendonorDarah/acceptValidation',
	acceptValidationBloodDonor
);
router.post(
	'/showAcceptedCalonPendonorDarah/rejectValidation',
	rejectValidationBloodDonor
);

router.get('/requestDarah', authenticateToken, getBloodRequest);
// router.post(
// 	'/requestDarah/accept',
// 	authenticateToken,
// 	acceptRequestBloodRequest
// );
router.post(
	'/requestDarah/accept',
	authenticateToken,
	buktiFoto.single('bukti_foto'),
	(req, res) => {
		console.log('Received POST request at /v1/admin/requestDarah/accept');
		acceptRequestBloodRequest(req, res);
	}
);
router.post(
	'/requestDarah/reject',
	authenticateToken,
	rejectRequestBloodRequest
);

router.get('/adminProfile', authenticateToken, adminProfile);
router.put('/adminProfile/update', authenticateToken, updateAdminProfile);

module.exports = router;
