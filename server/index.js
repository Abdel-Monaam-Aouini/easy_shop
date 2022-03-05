import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import config from "./config.js";
import authJwt from "./helpers/jwt.js";
import errorHandler from "./helpers/error-handler.js";
import usersRoutes from "./routes/users.js";
import productsRoutes from "./routes/products.js";
import categoriesRoutes from "./routes/categories.js";
import ordersRoutes from "./routes/orders.js";

const server = express();

const __dirname = path.resolve();

server.use(cors());
server.options("*", cors());

//middleware
server.use(express.json());
server.use(morgan("tiny"));
server.use(authJwt());
server.use("/public/uploads", express.static(__dirname + "/public/uploads"));
server.use(errorHandler);

const { MONGO_URI, API_URL } = config;

server.use(`${API_URL}/users`, usersRoutes);
server.use(`${API_URL}/categories`, categoriesRoutes);
server.use(`${API_URL}/products`, productsRoutes);
server.use(`${API_URL}/orders`, ordersRoutes);

const PORT = process.env.PORT || 9000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log(`🗃   MongoDB connected`);
    return server.listen({ port: PORT });
  })
  .then(() => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
  });

mongoose.set("debug", true);
