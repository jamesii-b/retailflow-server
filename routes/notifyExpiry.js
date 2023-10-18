const router = require("express").Router();

module.exports = router;

const notifyExpiry = require("../controller/notifyExpiry");
router.get("/expiry", notifyExpiry);
