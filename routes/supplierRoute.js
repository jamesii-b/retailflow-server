const Product = require("../models/product");
const ProductItem = require("../models/productItem");
const Supplier = require("../models/supplier");
const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");


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
    return res.json(suppliers);
})

router.get("/suppliers", async (req, res) => {
    try {
        const suppliers = await Supplier.find({});
        res.json(suppliers);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/add-supplier", async (req, res) => {
    try {
        const newSupplier = new Supplier({
            sID: Date.now().toString(),
            sName: req.body.sName,
            sAddress: req.body.sAddress || "null",
            sContactNo: req.body.sContactNo || "null",
            sEmail: req.body.sEmail || "null",
        });
        await newSupplier.save();
        res.json({ msg: "Supplier added successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.get("/supplier/:sID", async (req, res) => {
    const ID = req.params.sID;
    try {
        const supplierData = await Supplier.findOne({ sID: ID }); // Declare supplierData with `const` and use `await` to wait for the result
        if (supplierData) {
            res.json(supplierData);
        } else {
            res.status(500).send("Supplier not found"); // Use `res.status(500)` to set the response status code and `send` to send a response
        }
    } catch (err) {
        res.status(500).send("Internal Server Error"); // Handle errors by setting the status code and sending an error message
    }
});

router.get("/expire/supplier/", async (req, res) => {
    try {
        const ProductData = await Product.find();
        const groupedData = [];

        for (const item of ProductData) {
            const ItemData = await ProductItem.find({
                productFamily: item._id.toString(),
            });

            for (const individualItem of ItemData) {
                const expiryDate = DateTime.fromJSDate(individualItem.expireDate).toISODate();
                // const today = DateTime.now().toISODate();
                console.log("\n \n")
                console.log(individualItem)
                console.log("\n \n")
                const supplier = individualItem.supplier; // Get the supplier name

                // const diff = DateTime.fromJSDate(individualItem.expireDate)
                //     .diff(DateTime.fromJSDate(today), "days")
                //     .toObject().days;

                // Check if the item already exists in the grouped data
                const existingItem = groupedData.find((entry) =>
                    entry.supplier === supplier && entry.expireDate === expiryDate && entry.pName === item.pName
                );

                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    groupedData.push({
                        supplier: supplier,
                        expireDate: expiryDate,
                        pName: item.pName,
                        quantity: 1,
                    });
                }
            }
        }

        res.json(groupedData);
    } catch (err) {
        console.log(`Something went wrong with fetch: ${err}`);
        res.json(null);
    }
}

    // router.get("/")

);


module.exports = router;
