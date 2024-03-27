const express = require("express");
const router = express.Router();
const user = require("./user");

// routers
router.use(user);

module.exports = router;
