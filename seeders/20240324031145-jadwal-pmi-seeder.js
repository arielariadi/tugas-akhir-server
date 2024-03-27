'use strict';

const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('jadwal', [
			{
				id_jadwal: nanoid(5),
				id_lokasi_pmi: 'Rq1D9',
				jadwal_hari: 'SENIN',
				jadwal_jam_mulai: '08:00',
				jadwal_jam_selesai: '16:30',
			},
			{
				id_jadwal: nanoid(5),
				id_lokasi_pmi: 'Rq1D9',
				jadwal_hari: 'SELASA',
				jadwal_jam_mulai: '08:00',
				jadwal_jam_selesai: '17:30',
			},
			{
				id_jadwal: nanoid(5),
				id_lokasi_pmi: 'Rq1D9',
				jadwal_hari: 'RABU',
				jadwal_jam_mulai: '08:00',
				jadwal_jam_selesai: '16:30',
			},
			{
				id_jadwal: nanoid(5),
				id_lokasi_pmi: 'Rq1D9',
				jadwal_hari: 'KAMIS',
				jadwal_jam_mulai: '08:00',
				jadwal_jam_selesai: '16:30',
			},
			{
				id_jadwal: nanoid(5),
				id_lokasi_pmi: 'Rq1D9',
				jadwal_hari: 'JUMAT',
				jadwal_jam_mulai: '08:00',
				jadwal_jam_selesai: '16:30',
			},
			{
				id_jadwal: nanoid(5),
				id_lokasi_pmi: 'Rq1D9',
				jadwal_hari: 'SABTU',
				jadwal_jam_mulai: '08:00',
				jadwal_jam_selesai: '16:30',
			},
			{
				id_jadwal: nanoid(5),
				id_lokasi_pmi: 'Rq1D9',
				jadwal_hari: 'MINGGU',
				jadwal_jam_mulai: '08:00',
				jadwal_jam_selesai: '16:30',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('jadwal', null, {});
	},
};
