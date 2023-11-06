const ProductItem = require("../models/productItem");
const Supplier = require("../models/supplier");
const express = require("express");
const router = express.Router();

router.get("/supplier/search/:sName?", async (req, res) => {

    const searchQuery = req.params.sName;
    console.log("sName");
    if (!searchQuery) {
        const suppliers = await Supplier.find({});
        return res.json({ success: true, suppliers });
    }
    const query = new RegExp("[a-zA-Z0-9]*" + searchQuery + "[a-zA-Z0-9]*", "i");
    const suppliers = await Supplier.find({
        $or: [
            { sName: { $regex: query } },
            { sAddress: { $regex: query } },
            { sContactNo: { $regex: query } },
            { sEmail: { $regex: query } },
        ],


    });
    return res.json({ success: true, suppliers });
})

router.post("/add-supplier", async (req, res) => {
    try {
        const newSupplier = new Supplier({
            sID: Date.now().toString(),
            sName: req.body.sName,
            sAddress: req.body.sAddress,
            sContactNo: req.body.sContactNo,
            sEmail: req.body.sEmail,
        });
        await newSupplier.save();
        res.json({ msg: "Supplier added successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});


module.exports = router;
