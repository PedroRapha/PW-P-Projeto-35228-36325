const ingredientCategoryService = require("../Services/ingredientCategoryService");

const getAllIngredientCategories = async(req, res, next) => {
    try {
        const ingredientCategories = await ingredientCategoryService.getAllIngredientCategories();
        res.status(200).json(ingredientCategories);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllIngredientCategories
};