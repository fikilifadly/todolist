"use strict";

const subtasks = require("../data/subtask.json").map((el) => {
	el.createdAt = el.updatedAt = new Date();
	return el;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("SubTasks", subtasks, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("SubTasks", null, {});
	},
};
