const {
	GolDarah,
	LokasiPmi,
	TraDonor,
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

		const pendonors = traDonors.map(traDonor => ({
			id_user: traDonor.id_user,
			id_donor: traDonor.id_tra_donor,
			id_gol_darah: traDonor.id_gol_darah,
			gol_darah: traDonor.GolDarah.gol_darah,
			lokasi_pmi: traDonor.LokasiPmi ? traDonor.LokasiPmi.nama : null,
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

			pendonor: pendonors,
		};

		res.json([response]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
