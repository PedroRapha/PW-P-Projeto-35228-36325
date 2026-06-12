const recipeService = require("../services/recipeService");

//

const getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await recipeService.getAllRecipes(req.query, req.user?.id);
        res.status(200).json(recipes);
    } catch (error){
        next(error);
    }
};

const getMyRecipes = async (req, res, next) => {
    try {
        const recipes = await recipeService.getMyRecipes(req.query, req.user.id);
        res.status(200).json(recipes);
    } catch (error){
        next(error);
    }
}

const getRecipeById = async (req, res, next) => {
    try {
        const recipe = await recipeService.getRecipeById(req.params.id, req.user?.id);
        res.status(200).json(recipe);
    } catch (error){
        next(error);
    }
};

const createRecipe = async (req, res, next) => {
    try {
        const recipe = await recipeService.createRecipe(req.body, req.user.id);
        res.status(201).json(recipe);
    } catch (error){
        next(error);
    };
};

const updateRecipe = async (req, res, next) => {
    try {
        const recipe = await recipeService.updateRecipe(req.params.id, req.body, req.user.id);
        res.status(200).json(recipe)
    } catch (error){
        next(error);
    }
};

const deleteRecipe = async (req, res, next) => {
    try {
        await recipeService.deleteRecipe(req.params.id, req.user.id);
        res.status(204).send();
    } catch (error){
        next(error);
    }
};

const searchRecipeByName = async (req, res, next) => {
    try {
        const { name } = req.query;
        const onlyMine = req.query.onlyMine === "true";

        if(!name) {
            return res.status(400).json({
                message: 'O campo "name" é obrigatório',
            });
        }

        const recipes = await recipeService.searchRecipeByName(name, req.user?.id, onlyMine);
        res.status(200).json(recipes);
    } catch(error){
        next(error);
    }
};

module.exports = {
    getAllRecipes,
    getMyRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipeByName,
};