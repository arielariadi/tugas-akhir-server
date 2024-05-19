const { nanoid } = require('nanoid');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id_user: {
				type: DataTypes.STRING,
				defaultValue: () => nanoid(),
				primaryKey: true,
				allowNull: false,
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
			nik: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			nama: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			no_hp: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			jenis_kelamin: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isIn: [['Laki-Laki', 'Perempuan']],
				},
			},
			tanggal_lahir: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			alamat_rumah: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			desa: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			kecamatan: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			kota: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			pekerjaan: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			sts_volunteer: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			tableName: 'user',
			timestamps: false,
		}
	);

	User.associate = function (models) {
		User.belongsTo(models.GolDarah, { foreignKey: 'id_gol_darah' });
	};

	return User;
};
