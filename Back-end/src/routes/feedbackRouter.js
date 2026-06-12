const express = require("express");

const router = express.Router();

const {
    checkFavorite,
    handleFavorite,
    handleReview,
} = require("../controllers/feedbackController");

const authenticateToken = require("../middlewares/auth.middleware.js");

router.use(authenticateToken);

router.get("/favorite/:recipeId", checkFavorite);
router.post("/favorite/:recipeId", handleFavorite);
router.post("/review/:recipeId", handleReview);

module.exports = router;
