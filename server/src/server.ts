import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/Users";

const PORT = process.env.PORT || 5000;

const app = express();

mongoose.connect(String(process.env.DATABASE_URL));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", userRouter);

app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});
