const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");

async function dbConnection() {
  await require("./lib/dbConnection");
}
dbConnection();
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Body:${JSON.stringify(req.body)}`);
  next(); // Continue with the request handling
});
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
// sendNotificationIfExpiryItemsChanged("http://localhost:5000/notifyadmin/expiry");
// sendNotificationIfLowItemsChanged("http://localhost:5000/notifyadmin/quantity");

app.use("/", require("./routes/functionalities"));
// app.use("/", require("./routes/pdfGeneration"));

app.use("/", require("./routes/supplierRoute"));

app.use("/report", require("./routes/reportsRoute"))


/* 
// ws here ~
//websockets
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const Order = require("./models/order");

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  // Whenever there's a change in the database, send updated data to all connected clients
  Order.watch().on("change", (change) => {
    if (
      change.operationType === "insert" ||
      change.operationType === "update" ||
      change.operationType === "delete"
    ) {
      Order.find({})
        .exec()
        .then((salesData) => {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(salesData));
            }
          });
        });
    }
  });

  Order.find({})
    .exec()
    .then((salesData) => {
      ws.send(JSON.stringify(salesData));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

server.listen(5000, () => {
  console.log("websocket on port 5000");
  console.log("ws://localhost:5000");
});
 */

app.get("/", (req, res) => {
  res.send("welcome to nodejs web server")
})
// const PORT = 5000;
app.listen(5000, () => {
  console.log("server is running on port 5000");
  console.log("http://localhost:5000");
});


const { ApolloServer } = require('apollo-server');
const server = new ApolloServer({
  typeDefs:[ require('./graphql/typedefs/products'),require('./graphql/typedefs/suppliers')],
  resolvers: [require('./graphql/resolvers/products'),require('./graphql/resolvers/suppliers')],
})

server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
const mongoose = require("mongoose");
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((conn) => {
    console.log("connection success");
  })
  .catch((error) => {
    console.log(error);
    console.log("error");
  });
