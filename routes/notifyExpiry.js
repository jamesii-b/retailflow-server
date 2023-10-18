const router = require("express").Router();

const notifyExpiry = require("../controller/notifyExpiry");

router.get("/expiry", notifyExpiry);

module.exports = router;
