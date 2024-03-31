'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('request_darah', {
			id_request_darah: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
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
			jumlah_darah: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			deskripsi: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			tanggal_request_darah: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			surat_permohonan_image: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.TINYINT,
				allowNull: false,
				defaultValue: 1, // 0 = rejected, 1 = pending and 2 = approved
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('request_darah');
	},
};
