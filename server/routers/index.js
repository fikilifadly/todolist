const express = require("express");
const router = express.Router();
const user = require("./user");
const task = require("./task");
const subTask = require("./subtask");

// routers
router.use("/user", user);
router.use("/task", task);
router.use("/subtask", subTask);

module.exports = router;
