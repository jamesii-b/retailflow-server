const notifyQuantity = require("../controller/notifyQuantity");
const router = require("express").Router();

router.get("/quantity", notifyQuantity);
module.exports = router;
