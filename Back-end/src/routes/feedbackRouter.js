const express = require("express");

const router = express.Router();

const {
    checkFavoriteStatus,
    handleFavorite,
    handleReview,
} = require("../controllers/feedbackController");

const authenticateToken = require("../middlewares/auth.middleware.js");

router.use(authenticateToken);

router.get("/favoriteState/:recipeId", checkFavoriteStatus);
router.post("/favorite/:recipeId", handleFavorite);
router.post("/review/:recipeId", handleReview);

module.exports = router;
