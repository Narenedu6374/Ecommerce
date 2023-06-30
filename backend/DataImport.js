import express from "express";
import User from "./Models/UserModel.js";
import Product from "./Models/ProductModel.js";
import users from "./data/users.js";
import asyncHandler from "express-async-handler";
import products from "./data/Products.js";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const importUser = await User.create(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/product",
  asyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const importProducts = await Product.create(products);
    res.send({ importProducts });
  })
);

export default ImportData;
