const express = require("express");
const router = express.Router();

const {
    getAllDifficulties,
} = require("../controllers/difficultyController");

router.get("/", getAllDifficulties);

module.exports = router;