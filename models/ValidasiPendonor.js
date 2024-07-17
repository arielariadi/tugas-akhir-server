module.exports = (sequelize, DataTypes) => {
	const ValidasiPendonor = sequelize.define(
		'ValidasiPendonor',
		{
			id_validasi_pendonor: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			id_tra_donor: {
				type: DataTypes.INTEGER,
			},
			id_user: {
				type: DataTypes.STRING,
			},
			id_gol_darah: {
				type: DataTypes.STRING,
			},
			id_lokasi_pmi: {
				type: DataTypes.STRING,
			},
			jumlah_kantung_darah: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			tgl_donor: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			alasan_gagal_donor: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			status: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 2, // 2 = pending, 3 = approved and 4 = rejected
			},
		},
		{
			tableName: 'validasi_pendonor',
			timestamps: false,
		}
	);

	ValidasiPendonor.associate = function (models) {
		ValidasiPendonor.belongsTo(models.TraDonor, {
			foreignKey: 'id_tra_donor',
		});
		ValidasiPendonor.belongsTo(models.User, { foreignKey: 'id_user' });
		ValidasiPendonor.belongsTo(models.GolDarah, {
			foreignKey: 'id_gol_darah',
		});
		ValidasiPendonor.belongsTo(models.LokasiPmi, {
			foreignKey: 'id_lokasi_pmi',
		});
	};

	return ValidasiPendonor;
};
