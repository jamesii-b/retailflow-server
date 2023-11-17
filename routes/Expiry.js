const router = require("express").Router();

const notifyExpiry = require("../controller/notifyExpiry");
const { checkExpiredorExpiring, checkAllExpiry } = require("../utils/checkExpiry");

router.get("/expiry/all", async (req, res) => {
    const Response = await checkAllExpiry();
    res.status(200).json(Response);
});
router.get("/expiry", async (req, res) => {
    const Response = await checkExpiredorExpiring();
    res.status(200).json(Response);
})

module.exports = router;

