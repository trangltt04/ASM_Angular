import express from "express";
import { connectBD } from "./config/db";
import productRoutr from "./router/product";
import userRouter from "./router/auth";

const app = express();

app.use(express.json());
connectBD();

app.use("/api", productRoutr);
app.use("/auth", userRouter);

export const viteNodeApp = app;
