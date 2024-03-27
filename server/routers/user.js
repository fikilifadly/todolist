const express = require("express");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/AuthHandler");

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.use(authentication);
router.patch("/edit", UserController.editProfile);

module.exports = router;
