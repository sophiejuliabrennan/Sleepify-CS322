const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const SignUpController = require("../controllers/signup.controller.js");

router.get("/signup", function (req, res) {
  res.sendFile(path.join(__dirname + "../../client/signup.html"));
});

router.get("/signUp/users", SignUpController.findAllUsers);
router.get("/signUp/users/:username", SignUpController.findOne);

router.post("/signUp", SignUpController.create);

module.exports = router;
