const {
	GolDarah,
	LokasiPmi,
	TraDonor,
	User,
	RequestDarah,
	ValidasiPendonor,
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
						'nik',
						'nama',
						'email',
						'no_hp',
						'alamat_rumah',
						'desa',
						'kecamatan',
						'kota',
						'pekerjaan',
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
			nik: traDonor.User.nik,
			nama_user: traDonor.User.nama,
			email_user: traDonor.User.email,
			no_hp: traDonor.User.no_hp,
			alamat_rumah: traDonor.User.alamat_rumah,
			desa: traDonor.User.desa,
			kecamatan: traDonor.User.kecamatan,
			kota: traDonor.User.kota,
			pekerjaan: traDonor.User.pekerjaan,
			jenis_kelamin: traDonor.User.jenis_kelamin,
			status: traDonor.status,
		}));

		// Membangun objek respons yang akan dikirim kembali kepada pengguna
		const response = {
			success: true,
			message: 'success',
			pendonor: pendonors,
			page,
			limit,
			totalRows,
			totalPage,
		};

		res.status(200).json(response); // Mengembalikan objek respons tanpa perlu membungkusnya dalam array
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' }); // Menangani kesalahan server
	}
};

exports.getDashboardUserValidationBloodDonor = async (req, res) => {
	try {
		const userId = req.user.userId; // Mengambil ID Pengguna dari permintaan
		const user = await User.findByPk(userId); // Mengambil informasi pengguna berdasarkan ID

		const page = parseInt(req.query.page) || 0; // Mendapatkan nomor halaman dari query string, defaultnya 0
		const limit = parseInt(req.query.limit) || 5; // Mendapatkan batas item per halaman dari query string, defaultnya 5

		const offset = page * limit; // Hitung offset berdasarkan halaman

		// // Menghitung total baris data pendonor yang dimiliki pengguna
		const totalRows = await ValidasiPendonor.count({
			where: { id_user: userId },
		});

		// // Menghitung total halaman berdasarkan total baris dan batas item per halaman
		const totalPage = Math.ceil(totalRows / limit);

		// Mengambil data pendonor dari database berdasarkan ID pengguna
		const validasiPendonors = await ValidasiPendonor.findAll({
			where: { id_user: userId },
			include: [
				{ model: GolDarah, attributes: ['id_gol_darah', 'gol_darah'] },
				{ model: LokasiPmi, attributes: ['id_lokasi_pmi', 'nama'] },
				{
					model: User,
					attributes: [
						'id_user',
						'nik',
						'nama',
						'email',
						'no_hp',
						'alamat_rumah',
						'desa',
						'kecamatan',
						'kota',
						'pekerjaan',
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
		const pendonorDarah = validasiPendonors.map(validasiPendonor => ({
			id_user: validasiPendonor.id_user,
			id_validasi_pendonor: validasiPendonor.id_validasi_pendonor,
			id_donor: validasiPendonor.id_tra_donor,
			id_gol_darah: validasiPendonor.id_gol_darah,
			gol_darah: validasiPendonor.GolDarah.gol_darah,
			lokasi_pmi: validasiPendonor.LokasiPmi
				? validasiPendonor.LokasiPmi.nama
				: null,
			tanggal_donor: validasiPendonor.tgl_donor
				? validasiPendonor.tgl_donor.toISOString().split('T')[0]
				: null,
			nik: validasiPendonor.User.nik,
			nama_user: validasiPendonor.User.nama,
			email_user: validasiPendonor.User.email,
			no_hp: validasiPendonor.User.no_hp,
			alamat_rumah: validasiPendonor.User.alamat_rumah,
			desa: validasiPendonor.User.desa,
			kecamatan: validasiPendonor.User.kecamatan,
			kota: validasiPendonor.User.kota,
			pekerjaan: validasiPendonor.User.pekerjaan,
			jenis_kelamin: validasiPendonor.User.jenis_kelamin,
			jumlah_kantung_darah: validasiPendonor.jumlah_kantung_darah,
			alasan_gagal_donor: validasiPendonor.alasan_gagal_donor,
			status: validasiPendonor.status,
		}));

		// Membangun objek respons yang akan dikirim kembali kepada pengguna
		const response = {
			success: true,
			message: 'success',
			pendonor_darah: pendonorDarah,
			page,
			limit,
			totalRows,
			totalPage,
		};

		res.status(200).json(response); // Mengembalikan objek respons tanpa perlu membungkusnya dalam array
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' }); // Menangani kesalahan server
	}
};

exports.getDashboardUserRequestDarah = async (req, res) => {
	try {
		const userId = req.user.userId; // Mengambil ID Pengguna dari permintaan
		const user = await User.findByPk(userId); // Mengambil informasi pengguna berdasarkan ID

		const page = parseInt(req.query.page) || 0; // Mendapatkan nomor halaman dari query string, defaultnya 0
		const limit = parseInt(req.query.limit) || 5; // Mendapatkan batas item per halaman dari query string, defaultnya 5

		const offset = page * limit; // Hitung offset berdasarkan halaman

		// Menghitung total baris data permintaan darah yang dimiliki pengguna
		const totalRows = await RequestDarah.count({ where: { id_user: userId } });

		// Menghitung total halaman berdasarkan total baris dan batas item per halaman
		const totalPage = Math.ceil(totalRows / limit);

		// Mengambil data permintaan darah dari database berdasarkan ID pengguna
		const requestDarahs = await RequestDarah.findAll({
			where: { id_user: userId },
			include: [
				{
					model: User,
					attributes: [
						'id_user',
						'nama',
						'email',
						'no_hp',
						'kecamatan',
						'jenis_kelamin',
						'tanggal_lahir',
					],
				},
				{ model: GolDarah, attributes: ['id_gol_darah', 'gol_darah'] },
			],
			limit,
			offset, // Gunakan offset yang telah dihitung
			order: [['id_request_darah', 'DESC']], // Tambahkan pengurutan berdasarkan ID donor secara menurun
		});

		const requestDarahsData = requestDarahs.map(requestDarah => ({
			id_request_darah: requestDarah.id_request_darah,
			id_user: requestDarah.id_user,
			id_gol_darah: requestDarah.id_gol_darah,
			gol_darah: requestDarah.GolDarah.gol_darah,
			tanggal_request_darah: requestDarah.tanggal_request_darah
				? requestDarah.tanggal_request_darah.toISOString().split('T')[0]
				: null,
			nama_user: requestDarah.User.nama,
			nama_pasien: requestDarah.nama_pasien,
			rumah_sakit: requestDarah.rumah_sakit,
			jumlah_darah: requestDarah.jumlah_darah,
			komponen_darah: requestDarah.komponen_darah,
			deskripsi: requestDarah.deskripsi,
			email_user: requestDarah.User.email,
			no_hp: requestDarah.User.no_hp,
			desa: requestDarah.User.desa,
			jenis_kelamin: requestDarah.User.jenis_kelamin,
			bukti_foto: requestDarah.bukti_foto,
			status: requestDarah.status,
		}));

		// Membangun objek respons yang akan dikirim kembali kepada pengguna
		const response = {
			success: true,
			message: 'success',
			request_darah: requestDarahsData,
			page,
			limit,
			totalRows,
			totalPage,
		};
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
