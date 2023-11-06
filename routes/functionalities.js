
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

router.get('/similarproduct/:pID', async (req, res) => {
    try {
        const targetProduct = await Product.findOne({ pID: req.params.pID });
        console.log(targetProduct)
        if (!targetProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const sameName = await Product.find({
            pName: targetProduct.pName,
            pID: { $ne: targetProduct.pID },
        })
        if (sameName.length < 3) {
            const similarProducts = await Product.find({
                $or: [
                    { category: targetProduct.category, subCategory: targetProduct.subCategory },
                    { subCategory: targetProduct.subCategory },
                    { category: targetProduct.category },
                ],
                pID: { $ne: targetProduct.pID }, // Exclude the target product
            });
            console.log(similarProducts)
            if (similarProducts.length < 3) {
                const randomProducts = await Product.aggregate([
                    { $match: { pID: { $ne: targetProduct.pID } } }, // Exclude the target product
                    { $sample: { size: 3 - similarProducts.length } }, // Get 3 random products
                ]);
                res.json(randomProducts);
            } else {

                res.json(similarProducts);
            }
        } else {
            res.json(sameName)
        }

        // res.json(similarProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;