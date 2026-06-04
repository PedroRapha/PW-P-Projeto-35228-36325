const ingredientService = require ('../Services/ingredientService')

  // CRIAR INGREDIENTE
const create = async (req, res, next) => {
    try {
        const { name, categoryId } = req.body;
        
        // O user.id virá injetado pelo seu middleware de autenticação (JWT)
        const suggestedById = req.user.id; 

        if (!name || !categoryId) {
            return res.status(400).json({ message: 'Nome e categoria são obrigatórios.' });
        }

        const ingredient = await ingredientService.createIngredient({ name, categoryId, suggestedById });
        
        return res.status(201).json(ingredient);
    } catch (error) {
        next(error);
    }
};

    // Listar Ingredientes
const listAll = async (req, res, next) => {
    try {
        const userId = req.user.id; // Resgata o usuário logado para aplicar o filtro Híbrido

        const ingredients = await  ingredientService.listAllIngredient(userId);
        
        return res.status(200).json(ingredients);
    } catch (error) {
        next(error);
    }
};

    // Buscar por Id
const findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const ingredientId = Number(id);

        const ingredient = await ingredientService.findIngredientById(ingredientId, userId);
        
        return res.status(200).json(ingredient);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { name, categoryId } = req.body;

        const ingredientId = Number(id);
        
        const updatedIngredient = await ingredientService.updateIngredient(ingredientId, userId, { name, categoryId });
        
        return res.status(200).json(updatedIngredient);
    } catch (error) {
        next(error);
    }
};

    // Remover ingredientes
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const ingredientId = Number(id);

        await ingredientService.deleteIngredient(ingredientId, userId);
        
        return res.status(204).send(); 
    } catch (error) {
        next(error);
    }
};

    //Listar pendentes (Apenas para Admin)
const getPending = async (req, res, next) => {
    try {
        const pending = await ingredientService.listPendingIngredients();
        return res.status(200).json(pending);
    } catch (error) {
        next(error);
    }
};

const approve = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const approvedIngredient = await ingredientService.approveIngredient(id);
        
        return res.status(200).json({
            message: 'Ingrediente aprovado com sucesso!',
            ingredient: approvedIngredient
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    listAll,
    findById,
    update,
    remove,
    getPending,
    approve
}