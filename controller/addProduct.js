const Product = require("../models/product");
// {
//   pID,
// pName,
// expireDate,
// price,
// quantity,
// category,
// subCategory,
// selfLocation,
// image,
// otherAttribute,
// supplier,
// threshold,
// }

const addProduct = async (req, res) => {
  /* R indicates Reques */
  const RpID = req.body.pID;
  const RpName = req.body.pName;
  const RexpireDate = req.body.expireDate;
  const Rprice = req.body.price;
  const Rquantity = req.body.quantity;
  const Rcategory = req.body.category;
  const RsubCategory = req.body.subCategory;
  const RselfLocation = req.body.selfLocation;
  const Rimage = req.body.image;
  const RotherAttribute = req.body.otherAttribute;
  const Rsupplier = req.body.supplier;
  const Rthreshold = req.body.threshold;
  const Rsize = req.body.size;
  console.log(req.body);
  try {
    const existingProduct = await Product.findOne({
      pID: RpID,
      pName: RpName,
      expireDate: RexpireDate,
      price: Rprice,
      supplier: Rsupplier,
      // size:Rsize,
      // threshold:Rthreshold,
      // category:Rcategory,
      // subCategory:RsubCategory,
      // selfLocation:RselfLocation,
      // image:Rimage,
      // otherAttribute:RotherAttribute,
    });
    if (existingProduct) {
      // If a matching product exists, update its quantity
      existingProduct.quantity= parseInt(existingProduct.quantity) + parseInt(Rquantity);
      await existingProduct.save();
      res.status(200).json({ msg: "Product quantity updated successfully" });
    } else {
      const productAdd = new Product({
        pID: req.body.pID,
        pName: req.body.pName,
        expireDate: req.body.expireDate,
        price: req.body.price,
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
