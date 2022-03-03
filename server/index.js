import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import config from "./config.js";
import authJwt from "./helpers/jwt.js";
import errorHandler from "./helpers/error-handler.js";

const app = express();

const __dirname = path.resolve();

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

const { MONGO_URI } = config;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => console.log("Database Connection is ready..."))
  .catch((err) => console.log(err));

//Server
app.listen(5000, () => {
  console.log("server is running http://localhost:5000");
});
