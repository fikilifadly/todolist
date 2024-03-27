"use strict";

const tasks = require("../data/task.json").map((el) => {
	el.createdAt = el.updatedAt = new Date();
	return el;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Tasks", tasks, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Tasks", null, {});
	},
};
