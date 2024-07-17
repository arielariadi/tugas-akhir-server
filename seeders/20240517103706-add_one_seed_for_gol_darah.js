'use strict';

const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('gol_darah', [
			{ id_gol_darah: nanoid(5), gol_darah: 'Belum Mengetahui' },
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('gol_darah', null, {});
	},
};
