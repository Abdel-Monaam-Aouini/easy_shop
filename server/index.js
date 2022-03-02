const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./config");

const app = express();

//Database
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(5000, () => {
  console.log("server is running http://localhost:5000");
});
