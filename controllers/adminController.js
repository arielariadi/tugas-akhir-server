const {
	BankDarah,
	GolDarah,
	LokasiPmi,
	TraDonor,
	User,
	Admin,
	RequestDarah,
} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

// Mendapatkan data semua jumlah kantong darah
const getAllBloodBank = async (req, res) => {
	try {
		const bankDarah = await BankDarah.findAll({
			include: [
				{ model: LokasiPmi, attributes: ['nama'] },
				{ model: GolDarah, attributes: ['gol_darah'] },
			],
		});

		if (bankDarah) {
			const result = {
				message: 'Sukses menampilkan seluruh bank darah',
				data: bankDarah,
			};
			res.status(200).json(result);
		} else {
			const error = {
				message: 'Data tidak ditemukan!',
				data: null,
			};
			res.status(404).json(error);
		}
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
	}
};

// Mendapatkan jumlah kantong darah berdasarkan id lokasi pmi
// const getBloodBankByPmiId = async (req, res) => {
// 	try {
// 		const idLokPmi = req.params.id;
// 		const bankDarah = await BankDarah.findAll({
// 			where: {
// 				id_lokasi_pmi: idLokPmi,
// 			},
// 			include: [
// 				{ model: LokasiPmi, as: 'LokasiPmi' },
// 				{ model: GolDarah, as: 'GolDarah' },
// 			],
// 		});

// 		if (bankDarah.length > 0) {
// 			const result = {
// 				message: `Bank darah dengan id lokasi pmi ${idLokPmi} berhasil ditampilkan`,
// 				stok_bank_darah: bankDarah,
// 			};
// 			res.status(200).json(result);
// 		} else {
// 			const error = {
// 				message: 'Data tidak ditemukan!',
// 				stok_bank_darah: null,
// 			};
// 			res.status(404).json(error);
// 		}
// 	} catch (error) {
// 		res.status(500).json({
// 			message: 'Server Error',
// 			serveMessage: error,
// 		});
// 	}
// };

// Mengupdate jumlah kantong darah berdasarkan id lokasi pmi
// const updateBloodBankByPmiId = async (req, res) => {
// 	try {
// 		const { jumlah_kantong_darah, id_gol_darah } = req.body;

// 		const bankDarah = await BankDarah.findOne({
// 			where: { id_lokasi_pmi: req.params.id },
// 			include: [
// 				{
// 					model: GolDarah,
// 					where: { id_gol_darah: id_gol_darah },
// 				},
// 			],
// 		});

// 		if (!bankDarah) {
// 			const error = {
// 				message: "Data tidak ditemukan!",
// 				stok_bank_darah: null,
// 			};
// 			res.status(404).json(error);
// 		}

// 		const schema = {
// 			jumlah_kantong_darah: "number|optional",
// 		};

// 		const validate = v.validate(req.body, schema);

// 		if (validate.length) {
// 			return res.status(400).json(validate);
// 		}

// 		const updateBankDarah = await bankDarah.update({
// 			jumlah_kantong_darah: jumlah_kantong_darah,
// 		});

// 		const result = {
// 			message: "Jumlah kantong darah berhasil diubah",
// 			stok_bank_darah: updateBankDarah,
// 		};
// 		res.status(200).json(result);
// 	} catch (error) {
// 		res.status(500).json({
// 			message: "Server Error",
// 			serveMessage: error,
// 		});
// 	}
// };

// Mendapatkan data bank darah
const getBloodBank = async (req, res) => {
	try {
		// Mendapatkan semua data bank darah dari database
		const allBloodBanks = await BankDarah.findAll();

		if (allBloodBanks.length > 0) {
			const result = {
				message: `Bank darah berhasil ditampilkan!`,
				stok_bank_darah: allBloodBanks,
			};
			res.status(200).json(result); // Respons utama hanya dikirimkan di sini
		} else {
			const error = {
				message: 'Data tidak ditemukan!',
				stok_bank_darah: null,
			};
			res.status(404).json(error);
		}
	} catch (error) {
		// Tangani kesalahan jika terjadi
		console.error('Error retrieving blood banks:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const updateBloodBank = async (req, res) => {
	try {
		const { jumlah_kantong_darah, id_gol_darah } = req.body;

		const bankDarah = await BankDarah.findOne({
			include: [
				{
					model: GolDarah,
					where: { id_gol_darah: id_gol_darah },
				},
			],
		});

		if (!bankDarah) {
			const error = {
				message: 'Data tidak ditemukan!',
				stok_bank_darah: null,
			};
			res.status(404).json(error);
		}

		const schema = {
			jumlah_kantong_darah: 'number|optional',
		};

		const validate = v.validate(req.body, schema);

		if (validate.length) {
			return res.status(400).json(validate);
		}

		const updateBankDarah = await bankDarah.update({
			jumlah_kantong_darah: jumlah_kantong_darah,
		});

		const result = {
			message: 'Jumlah kantong darah berhasil diubah',
			stok_bank_darah: updateBankDarah,
		};
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
	}
};

// Mendapatkan semua data pendonor darah
const getAllBloodDonors = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 0;
		const limit = parseInt(req.query.limit) || 5;

		const offset = page * limit;

		const totalRows = await TraDonor.count();

		const totalPage = Math.ceil(totalRows / limit);

		const pendonor = await TraDonor.findAll({
			attributes: [
				'id_tra_donor',
				'id_user',
				'id_gol_darah',
				'id_lokasi_pmi',
				'tgl_donor',
				'status',
			],

			include: [
				{
					model: User,
					attributes: [
						'id_user',
						'nama',
						'email',
						'no_hp',
						'jenis_kelamin',
						'tanggal_lahir',
						'alamat_rumah',
						'desa',
						'kecamatan',
						'kota',
						'pekerjaan',
					],
				},
				{ model: GolDarah, attributes: ['gol_darah'] },
				{ model: LokasiPmi, attributes: ['nama', 'alamat'] },
			],

			limit,
			offset,
			order: [['id_tra_donor', 'DESC']],
		});

		if (pendonor.length > 0) {
			const result = {
				message: 'Berhasil menampilkan seluruh pendonor darah',
				pendonor: pendonor,

				page,
				limit,
				totalRows,
				totalPage,
			};
			res.status(200).json(result);
		} else {
			const error = {
				message: 'Pendonor darah tidak ditemukan!',
				pendonor: null,
			};
			res.status(404).json(error);
		}
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
	}
};

// Menerima pendaftaran donor darah user
const acceptBloodDonorRegistration = async (req, res) => {
	try {
		const { id_tra_donor } = req.body;

		const updateRecord = await TraDonor.update(
			{ status: 2 }, // Set status to accepted
			{ where: { id_tra_donor } }
		);

		if (updateRecord[0] === 0) {
			const error = {
				message: 'Pendaftaran donor darah tidak ditemukan',
			};
			return res.status(404).json(error);
		}

		const result = {
			message: 'Pendaftaran donor darah diterima',
		};
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
	}
};

// Menolak pendaftaran donor darah user
const rejectBloodDonorRegistration = async (req, res) => {
	try {
		const { id_tra_donor } = req.body;

		const updateRecord = await TraDonor.update(
			{ status: 0 }, // Set status to rejected
			{ where: { id_tra_donor } }
		);

		if (updateRecord[0] === 0) {
			const error = {
				message: 'Pendaftaran donor darah tidak ditemukan',
			};
			return res.status(404).json(error);
		}

		const result = {
			message: 'Pendaftaran donor darah ditolak',
		};
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
	}
};

// Menampilkan semua data permintaan darah
const getBloodRequest = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 0;
		const limit = parseInt(req.query.limit) || 5;
		const offset = page * limit;

		const totalRows = await RequestDarah.count();

		const totalPage = Math.ceil(totalRows / limit);

		const bloodRequestsData = await RequestDarah.findAll({
			attributes: [
				'id_request_darah',
				'id_user',
				'id_gol_darah',
				'nama_pasien',
				'rumah_sakit',
				'komponen_darah',
				'jumlah_darah',
				'deskripsi',
				'tanggal_request_darah',
				'surat_permohonan_image',
				'bukti_foto',
				'status',
			],

			include: [
				{
					model: User,
					attributes: [
						'id_user',
						'nama',
						'email',
						'no_hp',
						'jenis_kelamin',
						'tanggal_lahir',
						'kecamatan',
						'desa',
						'kota',
						'alamat_rumah',
					],
				},
				{ model: GolDarah, attributes: ['gol_darah'] },
			],

			limit,
			offset,
			order: [['id_request_darah', 'DESC']],
		});

		if (bloodRequestsData.length > 0) {
			const result = {
				message: 'Berhasil menampilkan data permintaan darah',
				bloodRequestsData: bloodRequestsData,

				page,
				limit,
				totalRows,
				totalPage,
			};
			res.status(200).json(result);
		} else {
			const error = {
				message: 'Permintaan darah tidak ditemukan!',
				bloodRequestsData: null,
			};
			res.status(404).json(error);
		}
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
	}
};

// Menerima permintaan darah user
const acceptRequestBloodRequest = async (req, res) => {
	try {
		console.log('Processing request to accept blood request');
		const { id_request_darah } = req.body;

		// Cari permintaan darah berdasarkan ID
		const requestDarah = await RequestDarah.findByPk(id_request_darah);

		// Jika permintaan darah tidak ditemukan, kirim respons dengan status 404
		if (!requestDarah) {
			return res
				.status(404)
				.json({ message: 'Permintaan darah tidak ditemukan' });
		}

		// Update status permintaan darah menjadi diterima (status: 2)
		await RequestDarah.update({ status: 2 }, { where: { id_request_darah } });

		// Ambil data golongan darah dari permintaan
		const bankDarah = await BankDarah.findOne({
			where: { id_gol_darah: requestDarah.id_gol_darah },
		});

		// Kurangi jumlah kantong darah berdasarkan jumlah permintaan
		const updatedStock =
			bankDarah.jumlah_kantong_darah - requestDarah.jumlah_darah;

		// Perbarui jumlah kantong darah di database
		await BankDarah.update(
			{ jumlah_kantong_darah: updatedStock },
			{ where: { id_gol_darah: bankDarah.id_gol_darah } }
		);

		// Upload bukti foto
		await RequestDarah.update(
			{
				bukti_foto: req.file.filename,
			},
			{ where: { id_request_darah: requestDarah.id_request_darah } }
		);

		// Kirim respons berhasil
		return res.status(200).json({ message: 'Permintaan darah diterima' });
	} catch (error) {
		// Tangani kesalahan server
		console.error('Error in acceptRequestBloodRequest:', error);
		return res
			.status(500)
			.json({ message: 'Server Error', serveMessage: error });
	}
};

// Menolak permintaan darah user
const rejectRequestBloodRequest = async (req, res) => {
	try {
		const { id_request_darah } = req.body;

		const updateRecord = await RequestDarah.update(
			{ status: 0 }, // Set status to rejected
			{ where: { id_request_darah } }
		);

		if (updateRecord[0] === 0) {
			const error = {
				message: 'Permintaan darah tidak ditemukan',
			};
			return res.status(404).json(error);
		}

		const result = {
			message: 'Permintaan darah ditolak',
		};
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
	}
};

// Profil admin
const adminProfile = async (req, res) => {
	try {
		const admin = await Admin.findOne({
			where: { id_admin: req.user.adminId },
		});

		if (!admin) {
			const error = {
				message: 'Admin not found',
				admin: null,
			};
			return res.status(404).json(error);
		} else {
			const result = {
				message: 'Admin profile retrieved successfully',
				admin: admin,
			};
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
	}
};

// Update profil admin
const updateAdminProfile = async (req, res) => {
	try {
		const admin = await Admin.findOne({
			where: { id_admin: req.user.adminId },
		});

		if (!admin) {
			const error = {
				message: 'Admin not found',
				admin: null,
			};
			return res.status(404).json(error);
		}

		const schema = {
			nama: 'string|optional',
			email: 'email|optional',
		};

		const validate = v.validate(req.body, schema);

		if (validate.length) {
			return res.status(400).json(validate);
		}

		const { nama, email } = req.body;

		const updateAdminProfile = await admin.update({
			nama,
			email,
		});

		const result = {
			message: 'Admin profile updated successfully',
			admin: updateAdminProfile,
		};

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: 'Server Error',
			serveMessage: error,
		});
		console.log(error);
	}
};

module.exports = {
	getAllBloodBank,
	// getBloodBankByPmiId,
	// updateBloodBankByPmiId,
	getBloodBank,
	updateBloodBank,
	getAllBloodDonors,
	acceptBloodDonorRegistration,
	rejectBloodDonorRegistration,

	getBloodRequest,
	acceptRequestBloodRequest,
	rejectRequestBloodRequest,

	adminProfile,
	updateAdminProfile,
};
