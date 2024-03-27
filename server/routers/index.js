const express = require("express");
const router = express.Router();
const user = require("./user");
const task = require("./task");

// routers
router.use("/user", user);
router.use("/task", task);

module.exports = router;
