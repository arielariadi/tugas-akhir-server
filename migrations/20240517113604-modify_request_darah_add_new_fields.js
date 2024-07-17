'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('request_darah', 'nama_pasien', {
			type: Sequelize.STRING,
			allowNull: false,
		}),
			await queryInterface.addColumn('request_darah', 'rumah_sakit', {
				type: Sequelize.STRING,
				allowNull: false,
			}),
			await queryInterface.addColumn('request_darah', 'komponen_darah', {
				type: Sequelize.STRING,
				allowNull: false,
			});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('request_darah', 'nama_pasien');
		await queryInterface.removeColumn('request_darah', 'rumah_sakit');
		await queryInterface.removeColumn('request_darah', 'komponen_darah');
	},
};
