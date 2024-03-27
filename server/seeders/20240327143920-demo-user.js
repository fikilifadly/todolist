"use strict";

const { hashPass } = require("../lib");

const users = require("../data/user.json").map((el) => {
	el.password = hashPass(el.password);
	el.createdAt = el.updatedAt = new Date();

	return el;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", users, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("user", null, {});
	},
};
