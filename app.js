const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/router");
const errorHandler = require("http-errors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.use((req, res, next) => {
    next(errorHandler.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

const start = async () => {
    await mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connect to database successfully");
            app.listen("5000", () => {
                console.log("localhost:5000");
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

start();
