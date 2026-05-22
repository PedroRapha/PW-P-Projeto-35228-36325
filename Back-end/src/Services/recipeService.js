const prisma = require("../prisma/PrismaClient");

const getAllRecipes = async (query) => {
    const page = parseInt(query.page)  || 1;
    const limit = parseInt(query.limit) || 5;
    const sort = query.sort || "name";

    const allowedFields = ["name", "difficultyId", "categoryId"];

    if(!allowedFields.includes(sort)){
        const error = new Error('O campo da ordenação deve ser um destes: name, difficultyId ou categoryId');
        error.status = 400;
        throw error;
    }

    const skip = (page - 1) * limit;
    const take = limit;

    const allowedSortFields = ["name", "difficulty"];
    let orderBy = { [sort]: "asc" };

    const recipes = await prisma.recipe.findMany({
        skip,
        take,
        orderBy,
        where: {
            isPublic: true
        },
        include: {
            creator: true,
            category: true,
            difficulty: true,
            ingredients: true
        },
    });

    const total = await prisma.recipe.count({
        where:{
            isPublic: true
        }
    });

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: recipes,
    };
};

const getRecipeById = async (id, creatorId) => {
    const recipe = await prisma.recipe.findUnique({
        where: { id },
        include: {
            creator: { 
                select: {  
                    name: true,
                    email: true
                } 
            },
            category: true,
            difficulty: true,
            ingredients: {
                include: {
                    ingredient: true,
                    measure: true,
                },
            },
        },
    });

    if(!recipe) {
        const error = new Error("Receita não encontrada");
        error.status = 404;
        throw error;
    }

    if (!recipe.isPublic && recipe.creatorId !== creatorId) {
        const error = new Error('Esta receita é privada e não tens permissão para aceder!');
        error.status = 403; 
        throw error;
    }

    return recipe;
};

//TODO: criar função para validar os dados introduzidos de receitas, já que são linhas de código que se repetem muito

const createRecipe = async (data, creatorId) => {
    const { name, image, steps, ingredients, categoryId, difficultyId, isPublic } = data;

    if(!name || !steps || !ingredients || !categoryId || !difficultyId) {
        const error = new Error("Campos obrigatórios em falta");
        error.status = 400;
        throw error;
    }

    if(isPublic !== undefined && typeof isPublic !== "boolean") {
        const error = new Error('O campo isPublic só pode ser "true" ou "false"' );
        error.status = 400;
        throw error;
    }

    const categoria = await prisma.recipeCategory.findUnique({
        where: { id: categoryId },
    })

    if(!categoria) {
        const error = new Error("A categoria indicada não existe");
        error.status = 404;
        throw error;
    };

    const difficulty = await prisma.difficulty.findUnique({
        where: { id: difficultyId },
    })

    if(!difficulty) {
        const error = new Error("A dificuldade indicada não existe");
        error.status = 404;
        throw error;
    };

    if(!Array.isArray(ingredients) || ingredients.length === 0){
        const error = new Error("A receita deve ter pelo menos um ingrediente");
        error.status = 400;
        throw error;
    }

    const invalidIngredient = ingredients.some((ingredient) =>
        !ingredient.ingredientId ||
        ingredient.qnt === undefined ||
        ingredient.qnt <= 0 ||
        !ingredient.measureId
    );

    if (invalidIngredient) {
        const error = new Error(
            'Os campos "ingredientId", "qnt" e "measureId" devem ser introduzidos corretamente'
        );
        error.status = 400;
        throw error;
    }

    //Garantir que os ingredientes e medidas existem
    const ingredientIds = ingredients.map(i => i.ingredientId);
    const measureIds = ingredients.map(i => i.measureId);

    const dbIngredients = await prisma.ingredient.findMany({ 
        where: { 
            id: { 
                in: ingredientIds 
            } 
        } 
    });

    const dbMeasures = await prisma.measure.findMany({ 
        where: { 
            id: { 
                in: measureIds 
            } 
        } 
    });

    // Se o banco achou menos ingredientes do que os enviados, algum ID é inválido!
    // Usamos um Set para contar IDs únicos, caso o usuário repita o mesmo ingrediente
    const uniqueIngredientsSent = new Set(ingredientIds).size;
    const uniqueMeasuresSent = new Set(measureIds).size;

    if (dbIngredients.length !== uniqueIngredientsSent || dbMeasures.length !== uniqueMeasuresSent) {
        const error = new Error("Um ou mais ingredientes/medidas informados não existem no sistema.");
        error.status = 400;
        throw error;
    }

    if(!Array.isArray(steps) || steps.length === 0){
        const error = new Error("A receita deve ter pelo menos um passo");
        error.status = 400;
        throw error;
    }

    return prisma.recipe.create({
        data: {
            name,
            image,
            steps,
            ingredients: {
                create: ingredients.map((ingredient) => ({
                    ingredientId: ingredient.ingredientId,
                    qnt: ingredient.qnt,
                    measureId: ingredient.measureId,
                })),
            },
            categoryId,
            difficultyId,
            creatorId,
            isPublic: isPublic ?? true //Garantindo como true caso venha undefined
        },
        include: {
            creator: true,
            ingredients: {
                include: {
                    ingredient: true,
                    measure: true,
                },
            },
            category: true,
            difficulty: true,
        },
    });
};

//TODO: atualizar este UPDATE para que apenas o criador da receita possa editá-la.
//TODO: validar a existência do ingrediente e das medidas na base de dados

const updateRecipe = async (id, data, creatorId) => {
    const { name, image, steps, ingredients, categoryId, difficultyId, isPublic } = data;

    const existingRecipe = await prisma.recipe.findUnique({
        where: {
            id,
        },
    });

    if(!existingRecipe){
        const error = new Error("Receita não encontrada");
        error.status = 404;
        throw error;
    }

    if(!name || !steps || !ingredients || !categoryId || !difficultyId) {
        const error = new Error("Campos obrigatórios em falta");
        error.status = 400;
        throw error;
    }

    if(isPublic !== undefined && typeof isPublic !== "boolean") {
        const error = new Error('O campo isPublic só pode ser "true" ou "false"' );
        error.status = 400;
        throw error;
    }

    const categoria = await prisma.recipeCategory.findUnique({
        where: { id: categoryId },
    })

    if(!categoria) {
        const error = new Error("A categoria indicada não existe");
        error.status = 400;
        throw error;
    };

    const difficulty = await prisma.difficulty.findUnique({
        where: { id: difficultyId },
    })

    if(!difficulty) {
        const error = new Error("A dificuldade indicada não existe");
        error.status = 400;
        throw error;
    };

    if (existingRecipe.creatorId !== creatorId) {
        const error = new Error('Esta receita é privada e não tens permissão para aceder!');
        error.status = 403; 
        throw error;
    }

    if(!Array.isArray(ingredients) || ingredients.length === 0){
        const error = new Error("A receita deve ter pelo menos um ingrediente");
        error.status = 400;
        throw error;
    }

    const invalidIngredient = ingredients.some((ingredient) =>
        !ingredient.ingredientId ||
        ingredient.qnt === undefined ||
        ingredient.qnt <= 0 ||
        !ingredient.measureId
    );

    if (invalidIngredient) {
        const error = new Error(
            'Os campos "ingredientId", "qnt" e "measureId" devem ser introduzidos corretamente'
        );

        error.status = 400;
        throw error;
    }

    if(!Array.isArray(steps) || steps.length === 0){
        const error = new Error("A receita deve ter pelo menos um passo");
        error.status = 400;
        throw error;
    }
 
    //Evitar IDs falsos que quebram o banco
    const ingredientIds = ingredients.map(i => i.ingredientId);
    const measureIds = ingredients.map(i => i.measureId);

    const dbIngredients = await prisma.ingredient.findMany({ 
        where: { 
            id: { 
                in: ingredientIds 
            } 
        } 
    });

    const dbMeasures = await prisma.measure.findMany({ 
        where: { 
            id: { 
                in: measureIds 
            } 
        } 
    });

    const uniqueIngredientsSent = new Set(ingredientIds).size;
    const uniqueMeasuresSent = new Set(measureIds).size;

    if (dbIngredients.length !== uniqueIngredientsSent || dbMeasures.length !== uniqueMeasuresSent) {
        const error = new Error("Um ou mais ingredientes/medidas informados não existem no sistema.");
        error.status = 400;
        throw error;
    }

    await prisma.ingredientsInTheRecipe.deleteMany({
        where: { recipeId: id },
    });

    return prisma.recipe.update({
        where: { id },
        data: {
            name,
            image,
            steps,
            ingredients: {
                create: ingredients.map((ingredient) => ({
                    ingredientId: ingredient.ingredientId,
                    qnt: ingredient.qnt,
                    measureId: ingredient.measureId,
                })),
            },
            categoryId,
            difficultyId,
            isPublic
        },
        include: {
            creator: true,
            ingredients: {
                include: {
                    ingredient: true,
                    measure: true,
                },
            },
            category: true,
            difficulty: true,
        },
    });
};

const deleteRecipe = async (id, creatorId) => {
    const existingRecipe = await prisma.recipe.findUnique({
        where: {
            id,
        },
    });

    if(!existingRecipe){
        const error = new Error("Receita não encontrada");
        error.status = 404;
        throw error;
    }

    if(existingRecipe.creatorId !== creatorId){
        const error = new Error("Não tem permissão para deletar esta receita");
        error.status = 403;
        throw error;
    }

    await prisma.ingredientsInTheRecipe.deleteMany({
        where: { recipeId: id },
    });

    await prisma.recipe.delete({
        where: { id },
    });
};

const searchRecipeByName = async (name) => {
    return prisma.recipe.findMany({
        where: {
            name: {
                contains: name,
                mode: "insensitive",
            },
            isPublic: true
        },
        include: {
            creator: true,
            category: true,
            difficulty: true,
        },
        ingredients: {
                include: {
                    ingredient: true
                }
            },
        orderBy: {
            name: "asc",
        },
    });
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipeByName,
}