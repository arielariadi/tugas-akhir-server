'use strict';

const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('admin', [
			{
				id_admin: nanoid(5),
				nama: 'Admin',
				email: 'admin@gmail',
				password: 'admin123',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('admin', null, {});
	},
};
