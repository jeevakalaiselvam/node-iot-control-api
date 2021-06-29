const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// Light structure is imported at the top of the file
const lightStructure = require("./lightStructure.js");

// Send interface for light
router.get("/", function (req, res, next) {
    let info = lightStructure;
    res.json(info);
});

// Send properties for light
router.get("/properties", function (req, res, next) {
    let info = lightStructure.properties;
    res.json(info);
});

// Send model for light
router.get("/model", function (req, res, next) {
    let info = lightStructure.model;
    res.json(info);
});

// Send action for light
router.get("/actions", function (req, res, next) {
    let info = lightStructure.actions;
    res.json(info);
});

// Function to run if the user sends a PUT request
router.put(
    ["/", "/actions/fade"],
    [
        check("level").isNumeric().isLength({ min: 0, max: 100 }),
        check("duration").isNumeric().optional().isLength({ min: 0 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let level = req.body.level;
        let duration;
        if (req.body.duration) {
            duration = req.body.duration;
        } else {
            duration = 500;
        }
        let message = `success: level to ${level} over ${duration} milliseconds`;
        res.json({ message: message });
    }
);

// Export route so it is available to import
module.exports = router;
