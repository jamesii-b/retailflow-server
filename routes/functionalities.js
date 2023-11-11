
const express = require('express');
const groupedData = require('../utils/groupedData');
const router = express.Router();
const Product = require('../models/product');

router.get("/itemcount/:id", (req, res) => {
    const reqID = req.params.id;
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
        if (!targetProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        toSendArray = [];
        const sameName = await Product.find({
            pName: targetProduct.pName,
            pID: { $ne: targetProduct.pID },
        })
        if (sameName.length != 0) {
            for (const element of sameName) {
                if (!toSendArray.includes(element) && toSendArray.length < 3) {
                    toSendArray.push(element)
                }
            }
        }
        console.log("same name is", sameName)

        if (toSendArray.length < 3) {
            const similarProducts = await Product.find({
                $and: [
                    {
                        $or: [
                            { category: targetProduct.category, subCategory: targetProduct.subCategory },
                            { subCategory: targetProduct.subCategory },
                            { category: targetProduct.category },
                        ],
                    },
                    { pID: { $ne: targetProduct.pID } }, // Exclude the target product
                ],
            }).limit(3);
            if (similarProducts.length != 0) {
                for (const element of similarProducts) {
                    if (!toSendArray.includes(element) && toSendArray.length < 3) {
                        toSendArray.push(element)
                    }
                }
            }
            console.log("after adding similar products", toSendArray)
            if (toSendArray.length < 3) {
                const randomProducts = await Product.aggregate
                    ([
                        { $match: { pID: { $ne: targetProduct.pID } } }, // Exclude the target product
                        { $limit: 3 }
                    ]);
                console.log("randomProducts")
                console.log(randomProducts)
                console.log(" \n \n \n")
                for (const element of randomProducts) {
                    console.log("element is", element)
                    if (!toSendArray.some(item => item.pID === element.pID) && toSendArray.length < 3) {
                        toSendArray.push(element)
                    }
                }
                res.status(200).json(toSendArray);
            } else {
                res.status(200).json(toSendArray);
            }
        } else {
            res.status(200).json(toSendArray)
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;