const recipeService = require("../Services/recipeService");

//

const getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await recipeService.getAllRecipes(req.query);
        res.status(200).json(recipes);
    } catch (error){
        next(error);
    }
};

const getRecipeById = async (req, res, next) => {
    try {
        const recipe = await recipeService.getRecipeById(req.params.id);
        res.status(200).json(recipe);
    } catch (error){
        next(error);
    }
};

const createRecipe = async (req, res, next) => {
    try {
        const recipe = await recipeService.createRecipe(req.body);
        res.status(201).json(recipe);
    } catch (error){
        next(error);
    };
};

const updateRecipe = async (req, res, next) => {
    try {
        const recipe = await recipeService.updateRecipe(req.params.id, req.body);
        res.status(200).json(recipe)
    } catch (error){
        next(error);
    }
};

const deleteRecipe = async (req, res, next) => {
    try {
        await recipeService.deleteRecipe(req.params.id);
        res.status(204).send();
    } catch (error){
        next(error);
    }
};

const searchRecipeByName = async (req, res, next) => {
    try {
        const { name } = req.query;

        if(!name) {
            return res.status(400).json({
                message: 'O campo "name" é obrigatório',
            });
        }

        const recipes = await recipeService.searchRecipeByName(name);
        res.status(200).json(recipes);
    } catch(error){
        next(error);
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipeByName,
};