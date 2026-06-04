const express = require("express");
const router = express.Router();

const {
    getAllRecipeCategories,
} = require("../controllers/recipeCategoryController");

router.get("/", getAllRecipeCategories);

module.exports = router;