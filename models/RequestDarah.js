module.exports = (sequelize, DataTypes) => {
	const RequestDarah = sequelize.define(
		'RequestDarah',
		{
			id_request_darah: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
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
			surat_permohonan_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			bukti_foto: {
				type: DataTypes.STRING,
				allowNull: true,
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
