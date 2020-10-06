const express = require("express");
const fileController = require("../controllers/file");

const router = express.Router();

router.route("/").get(fileController.getFile);

module.exports = router;