const express = require("express");
const router = express.Router();

const {
    getTotalUsers,
    getTotalRecipes,
    getAverageOfReviews,
} = require("../controllers/statsController");

router.get("/users/count", getTotalUsers);
router.get("/recipes/count", getTotalRecipes);
router.get("/reviews/average", getAverageOfReviews);

module.exports = router;