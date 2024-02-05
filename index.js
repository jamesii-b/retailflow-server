const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");
const { ApolloServer } = require('apollo-server');
async function startServer() {
  try {
    await require('./lib/dbConnection')();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const server = new ApolloServer({
      typeDefs: [require('./graphql/typedefs/products'), require('./graphql/typedefs/suppliers')],
      resolvers: [require('./graphql/resolvers/products'), require('./graphql/resolvers/suppliers')],
    });

    server.listen(process.env.apolloPort).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    // Handle error gracefully, e.g., exit the process or log an error message
    process.exit(1);
  }
}
startServer();
/* use middleware to log requests */
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Body:${JSON.stringify(req.body)}`);
  next();
});
/* Use api routes */
const productRoute = require("./routes/productRoute");
app.use("/", productRoute);
const salesRoute = require("./routes/salesRoute");
app.use("/", salesRoute);
app.use("/", require("./routes/graphWidgetRoutes"));

const notifyQuantity = require("./routes/notifyQuantity");
app.use("/notifyadmin", notifyQuantity);
app.use("/", require("./routes/Expiry"));
const sendNotificationIfLowItemsChanged = require("./config/autonotifyLowItems");
const sendNotificationIfExpiryItemsChanged = require("./config/autonotifyExpiryItems");
const dbConnection = require("./lib/dbConnection");
// sendNotificationIfExpiryItemsChanged("http://localhost:5000/notifyadmin/expiry");
// sendNotificationIfLowItemsChanged("http://localhost:5000/notifyadmin/quantity");

app.use("/", require("./routes/functionalities"));
// app.use("/", require("./routes/pdfGeneration"));
app.use("/", require("./routes/supplierRoute"));
app.use("/report", require("./routes/reportsRoute"))

