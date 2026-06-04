const express = require("express");
const router = express.Router();

const {
    getAllMeasures,
} = require("../controllers/measureController");

router.get("/", getAllMeasures);

module.exports = router;