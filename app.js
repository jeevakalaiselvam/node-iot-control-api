const express = require("express");
const morgan = require("morgan");
const app = express();
// Import library for working with JWT tokens
const jwt = require("jwt-simple");
// import our config file and get the secret value
const config = require("./config/config");
const secret = config.secret;

// Import path and file system libraries for importing our route files
const path = require("path");
const fs = require("fs");

// Import library for handling HTTP errors
const createError = require("http-errors");

//Declare routes
let index = require("./routes/index");
let light = require("./routes/devices/light");
let checkIn = require("./routes/check-in");

// Tell express to enable url encoding
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common"));
app.set("view engine", "ejs");

//CHECKIN IN USING JSON WEB TOKEN
// Tell Express to use our index module for root URL
app.use("/", index);
app.use("/check-in", checkIn);
app.use("/devices/light", light);
app.use("/devices/restricted-light", isCheckedIn, light);

// Check if the requesting client has checked in
function isCheckedIn(req, res, next) {
    // Check that authorization header was sent
    if (req.headers.authorization) {
        // Get token from "Bearer: Token" string
        let token = req.headers.authorization.split(" ")[1];
        // Try decoding the client's JWT using the server secret
        try {
            req._guest = jwt.decode(token, secret);
        } catch {
            res.status(403).json({ error: "Token is not valid." });
        }
        // If the decoded object has a name protected route can be used
        if (req._guest.name) return next();
    }
    // If no authorization header or guest has no name return a 403 error
    res.status(403).json({ error: "Please check-in to recieve a token." });
}

// Catch any 404 and send to handler
app.use(function (req, res, next) {
    res.status(404);
    res.json(createError(404));
});

// Start our application on port 3000
app.listen(3000, () => console.log("API running on port 3000"));
