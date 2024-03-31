const { RequestDarah, User, GolDarah } = require('../models');

const requestDarah = async (req, res) => {
	try {
		// Destructuring data from request body
		const { id_gol_darah, jumlah_darah, deskripsi } = req.body;

		console.log('Request received:', req.body); // Untuk melihat body permintaan
		const id_user = req.user.userId; // Get user ID from authenticated user
		console.log('User ID:', id_user);

		// Check if the user exists
		const user = await User.findByPk(id_user);
		if (!user) {
			return res.status(404).json({ success: false, error: 'User not found' });
		}

		// Check if the blood type exists
		const golDarah = await GolDarah.findByPk(id_gol_darah);
		if (!golDarah) {
			return res
				.status(404)
				.json({ success: false, error: 'Blood type not found' });
		}

		// Create request darah
		const newRequest = await RequestDarah.create({
			id_user,
			id_gol_darah,
			jumlah_darah,
			deskripsi,
			tanggal_request_darah: new Date(),
			status: 1, // Set status to pending
			surat_permohonan_image: req.file.filename, // Save image buffer
		});

		res.status(201).json({ success: true, data: newRequest });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

module.exports = { requestDarah };
