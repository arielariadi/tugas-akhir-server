'use strict';

const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('bank_darah', [
			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: 'o9bsy',
				jumlah_kantong_darah: 75,
			},

			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: 'QKqRv',
				jumlah_kantong_darah: 50,
			},

			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: 'mhkrK',
				jumlah_kantong_darah: 60,
			},

			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: 'uSuMT',
				jumlah_kantong_darah: 33,
			},

			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: 'kv-71',
				jumlah_kantong_darah: 81,
			},

			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: '6pGuJ',
				jumlah_kantong_darah: 81,
			},

			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: 'kMO7s',
				jumlah_kantong_darah: 81,
			},
			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: 'N7Fls',
				jumlah_kantong_darah: 81,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('bank_darah', null, {});
	},
};
