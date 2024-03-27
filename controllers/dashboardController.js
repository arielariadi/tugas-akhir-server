const {
	GolDarah,
	LokasiPmi,
	TraDonor,
	TraReqDarah,
	User,
	sequelize,
	Sequelize,
} = require('../models');

exports.getDashboardUser = async (req, res) => {
	try {
		const userId = req.user.userId;
		const user = await User.findByPk(userId);

		const traDonors = await TraDonor.findAll({
			where: { id_user: userId },
			include: [
				{ model: GolDarah, attributes: ['id_gol_darah', 'gol_darah'] },
				{ model: LokasiPmi, attributes: ['id_lokasi_pmi', 'nama'] },
				{
					model: User,
					attributes: [
						'id_user',
						'nama',
						'email',
						'no_hp',
						'alamat',
						'jenis_kelamin',
						'tanggal_lahir',
					],
				},
			],
		});

		// Retrieve blood donation requests made by the user
		// const userRequesterData = await TraReqDarah.findAll({
		// 	where: { id_user_volunteer: userId, status: 1 }, // Ensure status corresponds to unconfirmed requests
		// 	include: [
		// 		{ model: GolDarah, attributes: ['id_gol_darah', 'gol_darah'] },
		// 		{ model: User, attributes: ['id_user', 'nama', 'email'] },
		// 	],
		// });

		// const userAcceptData = await TraReqDarah.findAll({
		// 	where: { id_user_volunteer: userId, status: 2 },
		// 	include: [
		// 		{ model: GolDarah, attributes: ['id_gol_darah', 'gol_darah'] },
		// 		{
		// 			model: User,
		// 			attributes: ['id_user', 'nama', 'email', 'alamat', 'no_hp'],
		// 		},
		// 	],
		// });

		// const userRejectData = await TraReqDarah.findAll({
		// 	where: { id_user_volunteer: userId, status: 0 },
		// 	include: [
		// 		{ model: GolDarah, attributes: ['id_gol_darah', 'gol_darah'] },
		// 		{
		// 			model: User,
		// 			attributes: ['id_user', 'nama', 'email', 'alamat', 'no_hp'],
		// 		},
		// 	],
		// });

		const pendonors = traDonors.map(traDonor => ({
			id_user: traDonor.id_user,
			id_donor: traDonor.id_tra_donor,
			id_gol_darah: traDonor.id_gol_darah,
			gol_darah: traDonor.GolDarah.gol_darah,
			lokasi_pmi: traDonor.LokasiPmi ? traDonor.LokasiPmi.nama : null,
			// tanggal_donor:
			// 	traDonor.tgl_donor >= new Date(new Date().setHours(0o0, 0o0, 0o0)) &&
			// 	traDonor.tgl_donor < new Date(new Date().setHours(23, 59, 59))
			// 		? traDonor.tgl_donor.toISOString().split('T')[0]
			// 		: null,
			tanggal_donor: traDonor.tgl_donor
				? traDonor.tgl_donor.toISOString().split('T')[0]
				: null,
			nama_user: traDonor.User.nama,
			email_user: traDonor.User.email,
			no_hp: traDonor.User.no_hp,
			alamat: traDonor.User.alamat,
			jenis_kelamin: traDonor.User.jenis_kelamin,
		}));

		// ini jika mengambil tanggal donornya besok bukan hari ini
		// const pendonors = traDonors.map(traDonor => ({
		// 	id_donor: traDonor.id_tra_donor,
		// 	gol_darah: traDonor.GolDarah.gol_darah,
		// 	lokasi_pmi: traDonor.LokasiPmi ? traDonor.LokasiPmi.nama : null,
		// 	tanggal_donor: traDonor.tgl_donor
		// 		? traDonor.tgl_donor.toISOString().slice(0, 10)
		// 		: null,
		// }));

		// Build the response object
		const response = {
			success: true,
			message: 'success',
			welcome: `Selamat datang, ${user.nama}!`,
			// sukarelawan_menerima: userAcceptData.map(data => ({
			// 	id_user_volunteer: data.id_user_volunteer,
			// 	nama_volunteer: data.User.nama,
			// 	email_volunteer: data.User.email,
			// 	status: 'Diterima',
			// 	alamat_volunteer: data.User.alamat,
			// 	gol_darah: data.GolDarah.gol_darah,
			// 	no_hp: data.User.no_hp,
			// })),
			// sukarelawan_menolak: userRejectData.map(data => ({
			// 	id_user_volunteer: data.id_user_volunteer,
			// 	nama_volunteer: data.User.nama,
			// 	email_volunteer: data.User.email,
			// 	status: 'Ditolak',
			// 	alamat_volunteer: data.User.alamat,
			// 	gol_darah: data.GolDarah.gol_darah,
			// 	no_hp: data.User.no_hp,
			// })),
			// pemohon: userRequesterData.map(data => ({
			// 	id_user: data.id_user_req,
			// 	nama_pemohon: data.User.nama,
			// 	email_pemohon: data.User.email,
			// 	gol_darah: data.GolDarah.gol_darah,
			// 	alamat_pemohon: data.User.alamat,
			// })),
			pendonor: pendonors,
		};

		res.json([response]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Controller function to accept a request
// Controller function to accept a request (changed method to POST)
exports.postAcceptRequest = async (req, res) => {
	try {
		const { id_tra_req_darah } = req.body;

		// Update the status to 2 (accepted)
		const updatedRecord = await TraReqDarah.update(
			{ status: 2 },
			{ where: { id_tra_req_darah } }
		);

		if (updatedRecord[0] === 0) {
			// No records were updated (id_tra_req_darah not found)
			return res.status(404).json({ message: 'Record not found' });
		}

		res.json({ message: 'Request accepted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Controller function to reject a request (changed method to POST)
exports.postRejectRequest = async (req, res) => {
	try {
		const { id_tra_req_darah } = req.body;

		// Update the status to 0 (rejected)
		const updatedRecord = await TraReqDarah.update(
			{ status: 0 },
			{ where: { id_tra_req_darah } }
		);

		if (updatedRecord[0] === 0) {
			// No records were updated (id_tra_req_darah not found)
			return res.status(404).json({ message: 'Record not found' });
		}

		res.json({ message: 'Request rejected successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
