const Product = require("../models/product");

const addProduct = async (req, res) => {
  /* R indicates Reques */
  const RpID = req.body.pID;
  const RpName = req.body.pName;
  const RexpireDate = req.body.expireDate;
  const Rprice = req.body.priceRate;
  const Rquantity = req.body.quantity;
  const Rcategory = req.body.category;
  const RsubCategory = req.body.subCategory;
  const RselfLocation = req.body.selfLocation;
  const Rimage = req.body.image;
  const RotherAttribute = req.body.otherAttribute;
  const Rsupplier = req.body.supplier;
  const Rthreshold = req.body.threshold;
  const Rsize = req.body.size;
  console.log("requested id");

  console.log(RpID);
  console.log(Rquantity);
  if (Rquantity < 0) {
    return res.status(400).json({ msg: "Quantity is missing or invalid" });
  }
  try {
    const existingProduct = await Product.findOne({
      pID: RpID,
      // pName: RpName,
      // expireDate: RexpireDate,
      // priceRate: Rprice,
      // supplier: Rsupplier,
      // size:Rsize,
      // threshold:Rthreshold,
      // category:Rcategory,
      // subCategory:RsubCategory,
      // selfLocation:RselfLocation,
      // image:Rimage,
      // otherAttribute:RotherAttribute,
    });
    if (existingProduct) {
      console.log("existing Product", existingProduct);
      // If a matching product exists, update its quantity
      if (existingProduct.pName !== RpName && !isNaN(RpName)) {
        return res
          .status(400)
          .json({
            msg:
              "Product name does not match | " +
              existingProduct.pName +
              " already exists",
          });
      }

      existingProduct.quantity += parseInt(Rquantity);
      await existingProduct.save();
      res.status(200).json({ msg: "Product quantity updated successfully" });
    } else {
      const productAdd = new Product({
        pID: req.body.pID,
        pName: req.body.pName,
        expireDate: req.body.expireDate,
        priceRate: req.body.priceRate,
        quantity: req.body.quantity,
        category: req.body.category,
        subCategory: req.body.subCategory,
        selfLocation: req.body.selfLocation,
        image: req.body.image,
        otherAttribute: req.body.otherAttribute,
        sName: req.body.supplier,
        threshold: req.body.threshold,
        size: req.body.size,
      });

      await productAdd.save();
      res.status(201).json({ msg: "New Product added successfully" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
module.exports = addProduct;
