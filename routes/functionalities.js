const express = require("express");
const router = require("express").Router();

const notifyQuantity = require("../controller/notifyQuantity");

router.get("/quantity", notifyQuantity);
// const notifyExpiry = require("../controller/notifyExpiry");
// router.get("/expiry", notifyExpiry);
module.exports = router;
