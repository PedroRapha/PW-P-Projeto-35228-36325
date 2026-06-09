const express = require("express");
const router = express.Router();

const {
    getAllIngredientCategories,
} = require("../controllers/ingredientCategoryController");

router.get("/", getAllIngredientCategories);

module.exports = router;