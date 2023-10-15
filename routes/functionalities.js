const express = require("express");
const router = require("express").Router();

const notifyAdminMail = require("../controller/notifyadmin");

router.get("/", notifyAdminMail);
module.exports = router;
