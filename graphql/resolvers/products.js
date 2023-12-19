const Product = require("../../models/product");

module.exports = {

    Query: {
        getProducts: async () => {
            try {
                const products = await Product.find();
                return products;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async getProduct(_, args) {
            try {
                const product = await Product.findOne({ pID: args.pID });
                return product;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async searchProduct(_, args) {
            try {
                const query = new RegExp("[a-zA-Z0-9]*" + args.input + "[a-zA-Z0-9]*", "i");
                const product = await Product.find({
                    $or: [
                        { pName: { $regex: query } },
                        { category: { $regex: query } },
                    ],
                });
                return product;
            }
            catch (err) {
                throw new Error(err);
            }
        }

    }

}