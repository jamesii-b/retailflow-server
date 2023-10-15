const express = require("express");
const router = require("express").Router();

const sendMail = require("../controller/sendMail");

router.post("/", sendMail);
module.exports = router;
