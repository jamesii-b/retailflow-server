const Supplier = require("../../models/supplier");

module.exports = {
    Query: {
        async getSuppliers() {
            try {
                const suppliers = await Supplier.find();
                return suppliers;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async searchSupplier(_, args) {
            try {
                const query = new RegExp("[a-zA-Z0-9]*" + args.input + "[a-zA-Z0-9]*", "i");
                const supplier = await Supplier.find({
                    $or: [
                        { sName: { $regex: query } },
                        { sAddress: { $regex: query } },
                        { sEmail: { $regex: query } },
                        { sContactNo: { $regex: query } },
                    ],
                });
                return supplier;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async getSupplier(_, args) {
            try {
                const supplier = await Supplier.findOne({ sID: args.sID });
                return supplier;
            }
            catch (err) {
                throw new Error(err);
            }
        }
    }
    ,
}
