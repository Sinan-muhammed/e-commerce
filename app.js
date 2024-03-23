const express = require("express");
const app = express();
const port = 3001 ;
const mongoose = require("mongoose");
require('dotenv').config()

const path = require("path");

const userRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", userRouter);
app.use("/admin", adminRouter);

// MongoDB connection configuration
const dburl = process.env.mongodb

// Connect to MongoDB
mongoose
  .connect(dburl)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error in database Connection", err));

app.listen(port, () => console.log("server is running", port));
//