import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import ProductRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";

dotenv.config();
connectDatabase();

const app = express();
app.use(express.json());

//Api

app.use("/api/import", ImportData);
app.use("/api/products", ProductRoute);
app.use("/api/users", userRouter);

//error
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running port ${PORT}...`));
