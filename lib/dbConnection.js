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
