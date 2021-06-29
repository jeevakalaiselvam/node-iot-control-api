const express = require("express");
const morgan = require("morgan");
const app = express();

// Import path and file system libraries for importing our route files
const path = require("path");
const fs = require("fs");

// Import library for handling HTTP errors
const createError = require("http-errors");

//Declare routes
let index = require("./routes/index");
let light = require("./routes/devices/light");

// Tell express to enable url encoding
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common"));
app.set("view engine", "ejs");

// Provide data for root
app.use("/", index);

// Provide the data for light
app.use("/devices/light", light);

// Catch any 404 and send to handler
app.use(function (req, res, next) {
    res.status(404);
    res.json(createError(404));
});

// Start our application on port 3000
app.listen(3000, () => console.log("API running on port 3000"));
