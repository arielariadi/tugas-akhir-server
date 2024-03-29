module.exports = (sequelize, DataTypes) => {
	const RequestDarah = sequelize.define(
		'request_darah',
		{
			id_request_darah: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			id_user: {
				type: DataTypes.STRING,
				references: {
					model: 'user',
					key: 'id_user',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_gol_darah: {
				type: DataTypes.STRING,
				references: {
					model: 'gol_darah',
					key: 'id_gol_darah',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			jumlah_darah: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			deskripsi: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			tanggal_request_darah: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			ktp_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			surat_permohonan_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 1, // 0 = rejected, 1 = pending and 2 = approved
			},
		},
		{
			tableName: 'request_darah',
			timestamps: false,
		}
	);

	RequestDarah.associate = function (models) {
		RequestDarah.belongsTo(models.User, { foreignKey: 'id_user' });
		RequestDarah.belongsTo(models.GolDarah, { foreignKey: 'id_gol_darah' });
	};

	return RequestDarah;
};
