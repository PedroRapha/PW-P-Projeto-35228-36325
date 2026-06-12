const statsService = require("../services/statsService");

const getTotalUsers = async (req, res, next) => {
    try {
        const users = await statsService.getTotalUsers();
        res.status(200).json({ totalUsers: users });
    } catch (error) {
        next(error);
    }
};

const getTotalRecipes = async (req, res, next) => {
    try {
        const recipes = await statsService.getTotalRecipes();
        res.status(200).json({ totalRecipes: recipes });
    } catch (error) {
        next(error);
    }
};

const getAverageOfReviews = async (req, res, next) => {
    try {
        const average = await statsService.getAverageOfReviews();
        res.status(200).json({ averageRating: average });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTotalUsers,
    getTotalRecipes,
    getAverageOfReviews,
};