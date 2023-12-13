const { gql } = require("apollo-server")
module.exports = gql`
type Supplier {
    sID: String
    sName: String
    sAddress: String
    sEmail: String
    sContactNo: String
}

type Query{
    getSuppliers: [Supplier]
    searchSupplier(input: String): [Supplier]
    getSupplier(input: String): Supplier

}
`;


