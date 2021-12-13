const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

router.get("/account", function (req, res) {
  res.sendFile(path.join(__dirname + "../../client/account.html"));
  //__dirname : It will resolve to your project folder.
});
module.exports = router;
