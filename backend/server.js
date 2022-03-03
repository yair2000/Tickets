const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");
const PORT = process.env.PORT || 5000

const {errHandler} = require("./middleware/errMiddleware");
const connectDB = require("./config/db");

connectDB(); // Connect to the database

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/",(req, res) =>{
    res.status(200).json({ message: "Hello World" });
});

app.use("/api/users", require("./routes/userRoute"));
app.use(errHandler);

app.listen(PORT, ()=> console.log(`Server Started on port ${PORT}`));