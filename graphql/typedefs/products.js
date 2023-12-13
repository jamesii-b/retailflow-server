
const { gql } = require("apollo-server")

module.exports = gql`
type Product{
    pID: String
    pName: String
    category: String
}
type Query{
    getProducts: [Product]
    searchProduct(input: String): [Product]
    getProduct(input: String): Product
}
`;
