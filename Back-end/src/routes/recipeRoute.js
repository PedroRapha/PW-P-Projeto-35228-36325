const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/auth.middleware");

const {
    getAllRecipes,
    getMyRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipeByName,
} = require("../controllers/recipeController");

router.get("/search", searchRecipeByName);
router.get("/", getAllRecipes);
router.get("/my", authenticateToken, getMyRecipes);
router.get("/:id", getRecipeById);
router.post("/", authenticateToken, createRecipe);
router.put("/:id", authenticateToken, updateRecipe);
router.delete("/:id", authenticateToken, deleteRecipe);


module.exports = router;