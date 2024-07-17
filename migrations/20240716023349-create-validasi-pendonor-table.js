'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('validasi_pendonor', {
			id_validasi_pendonor: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			id_tra_donor: {
				type: Sequelize.INTEGER,
				references: {
					model: 'tra_donor',
					key: 'id_tra_donor',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_user: {
				type: Sequelize.STRING,
				references: {
					model: 'user',
					key: 'id_user',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_gol_darah: {
				type: Sequelize.STRING,
				references: {
					model: 'gol_darah',
					key: 'id_gol_darah',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_lokasi_pmi: {
				type: Sequelize.STRING,
				references: {
					model: 'lokasi_pmi',
					key: 'id_lokasi_pmi',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			jumlah_kantung_darah: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			tgl_donor: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			alasan_gagal_donor: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			status: {
				type: Sequelize.TINYINT,
				allowNull: false,
				defaultValue: 1, // 0 = rejected, 1 = pending and 2 = approved
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('validasi_pendonor');
	},
};
