const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/auth.middleware");
const optionalAuth = require("../middlewares/optionalAuth.middleware");

const {
    getAllRecipes,
    getMyRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipeByName,
} = require("../controllers/recipeController");

router.get("/search", optionalAuth, searchRecipeByName);
router.get("/", optionalAuth, getAllRecipes);
router.get("/my", authenticateToken, getMyRecipes);
router.get("/:id", optionalAuth, getRecipeById);
router.post("/", authenticateToken, createRecipe);
router.put("/:id", authenticateToken, updateRecipe);
router.delete("/:id", authenticateToken, deleteRecipe);


module.exports = router;