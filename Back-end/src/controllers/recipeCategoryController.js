const recipeCategoryService = require("../services/recipeCategoryService")

const getAllRecipeCategories = async(req, res, next) => {
    try {
        const recipeCategories = await recipeCategoryService.getAllRecipeCategories();
        res.status(200).json(recipeCategories);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllRecipeCategories,
};