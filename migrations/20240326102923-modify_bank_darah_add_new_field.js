'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn('bank_darah', 'gol_darah', {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isIn: [['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']],
				},
			}),
		]);
	},

	async down(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.removeColumn('bank_darah', 'gol_darah'),
		]);
	},
};
