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
		const userId = req.user.userId; // Mengambil ID Pengguna dari permintaan
		const user = await User.findByPk(userId); // Mengambil informasi pengguna berdasarkan ID

		const page = parseInt(req.query.page) || 0; // Mendapatkan nomor halaman dari query string, defaultnya 0
		const limit = parseInt(req.query.limit) || 5; // Mendapatkan batas item per halaman dari query string, defaultnya 5

		const offset = page * limit; // Hitung offset berdasarkan halaman

		// Menghitung total baris data pendonor yang dimiliki pengguna
		const totalRows = await TraDonor.count({
			where: { id_user: userId },
		});

		// Menghitung total halaman berdasarkan total baris dan batas item per halaman
		const totalPage = Math.ceil(totalRows / limit);

		// Mengambil data pendonor dari database berdasarkan ID pengguna
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
			limit,
			offset, // Gunakan offset yang telah dihitung
			order: [['id_tra_donor', 'DESC']], // Tambahkan pengurutan berdasarkan ID donor secara menurun
		});

		// Memformat data pendonor sesuai kebutuhan
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

		// Membangun objek respons yang akan dikirim kembali kepada pengguna
		const response = {
			success: true,
			message: 'success',
			welcome: `Selamat datang, ${user.nama}!`,
			pendonor: pendonors,
			page,
			limit,
			totalRows,
			totalPage,
		};

		res.json(response); // Mengembalikan objek respons tanpa perlu membungkusnya dalam array
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' }); // Menangani kesalahan server
	}
};
