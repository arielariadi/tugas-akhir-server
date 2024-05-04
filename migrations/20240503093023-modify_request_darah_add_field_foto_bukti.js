'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn('request_darah', 'bukti_foto', {
				type: Sequelize.STRING,
				allowNull: true,
			}),
		]);
	},

	async down(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.removeColumn('request_darah', 'bukti_foto'),
		]);
	},
};
