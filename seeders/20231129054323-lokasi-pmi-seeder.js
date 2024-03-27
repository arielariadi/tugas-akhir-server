'use strict';

const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('lokasi_pmi', [
			{
				id_lokasi_pmi: nanoid(5),
				nama: 'Unit Donor Darah PMI Kabupaten Lebak',
				email: 'uddpmi.lebak@gmail.com',
				no_telpon: '08111-403-404',
				alamat:
					'Jl. Sentral No.2, Rangkasbitung Bar., Kec. Rangkasbitung, Kabupaten Lebak, Banten 42312',
				latitude: '-6.364584904822052 ',
				longitude: '106.2492383042899',
				logo: 'logo_udd_pmi_kab_lebak.png',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('lokasi_pmi', null, {});
	},
};
