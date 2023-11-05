
const express = require('express');
const groupedData = require('../utils/groupedData');
const router = express.Router();

const Product = require('../models/product');

router.get("/itemcount/:id", (req, res) => {
    const reqID = req.params.id;
    console.log(reqID)
    Product.find({ pID: reqID }).then((result) => {
        if (result.length > 0) {
            const id = result[0]._id;
            groupedData(id).then((count) => {
                res.json({ success: true, count });
            }).catch((err) => {
                res.json({ success: false, err });
            });
        } else {
            res.json({ success: false, err: "Product not found" });
        }
    }).catch((err) => {
        res.json({ success: false, err });
    });
});




module.exports = router;