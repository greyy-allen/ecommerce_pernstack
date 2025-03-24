// const express = require("express");

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

//postgresql
import pool from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); //security middleware to protect app by setting various http headers
app.use(morgan("dev")); // log the requests

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    const createTable = await pool.query("CREATE TABLE IF NOT EXISTS products ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, price DECIMAL(10,2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
  } catch (error) {
      console.log("Error initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
  });
}) 