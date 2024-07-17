'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn('user', 'nik', {
				type: Sequelize.STRING,
				allowNull: false,
			}),
			queryInterface.addColumn('user', 'pekerjaan', {
				type: Sequelize.STRING,
				allowNull: false,
			}),
			queryInterface.addColumn('user', 'alamat_rumah', {
				type: Sequelize.STRING,
				allowNull: false,
			}),
			queryInterface.addColumn('user', 'kecamatan', {
				type: Sequelize.STRING,
				allowNull: false,
			}),
			queryInterface.addColumn('user', 'kota', {
				type: Sequelize.STRING,
				allowNull: false,
			}),
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
