const prisma = require("../prisma/PrismaClient");

const getAllRecipes = async (query, userId = null) => {
    const page = parseInt(query.page)  || 1;
    const limit = parseInt(query.limit) || 10;
    const sort = query.sort;

    const skip = (page - 1) * limit;
    const take = limit;

    const allowedSortFields = ["name", "difficulty"];
    let orderBy = { name: "asc" };

    const where = userId ? { OR: [
                { isPublic: true },
                { creatorId: userId }
            ] } : { isPublic : true };

    const recipes = await prisma.recipe.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
            creator: true,
            category: true,
            difficulty: true,
        },
    });

    const total = await prisma.recipe.count({ where });

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: recipes,
    };
};

const getMyRecipes = async (query, userId) => {
    const page = parseInt(query.page)  || 1;
    const limit = parseInt(query.limit) || 10;
    const sort = query.sort;

    const skip = (page - 1) * limit;
    const take = limit;

    const allowedSortFields = ["name", "difficulty"];
    let orderBy = { name: "asc" };

    const recipes = await prisma.recipe.findMany({
        where: {
            creatorId: userId
        },
        skip,
        take,
        orderBy,
        include: {
            creator: true,
            category: true,
            difficulty: true,
        },
    });

    const total = await prisma.recipe.count({
        where: {
            creatorId: userId
        },
    });

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: recipes,
    };
}

const getRecipeById = async (id, userId = null) => {
    const recipe = await prisma.recipe.findFirst({
        where: {
            id,
            OR: [
                { isPublic: true },
                { creatorId: userId },
            ]
        },
        include: {
            creator: true,
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
        error.statusCode = 404;
        throw error;
    }

    return recipe;
};

//TODO: criar função para validar os dados introduzidos de receitas, já que são linhas de código que se repetem muito

const createRecipe = async (data, userId) => {
    const { name, image, steps, ingredients, categoryId, difficultyId, isPublic } = data;
    const creatorId = userId;

    if(!name || !steps || !ingredients || !categoryId || !difficultyId || !creatorId) {
        const error = new Error("Campos obrigatórios em falta");
        error.statusCode = 400;
        throw error;
    }

    if(isPublic !== undefined && typeof isPublic !== "boolean") {
        const error = new Error('O campo isPublic só pode ser "true" ou "false"' );
        error.statusCode = 400;
        throw error;
    }
    
    const creator = await prisma.user.findUnique({
        where: { id: creatorId },
    });

    if(!creator){
        const error = new Error("O usuário indicado não existe");
        error.statusCode = 400;
        throw error;
    };

    const categoria = await prisma.recipeCategory.findUnique({
        where: { id: categoryId },
    })

    if(!categoria) {
        const error = new Error("A categoria indicada não existe");
        error.statusCode = 400;
        throw error;
    };

    const difficulty = await prisma.difficulty.findUnique({
        where: { id: difficultyId },
    })

    if(!difficulty) {
        const error = new Error("A dificuldade indicada não existe");
        error.statusCode = 400;
        throw error;
    };

    if(!Array.isArray(ingredients) || ingredients.length === 0){
        const error = new Error("A receita deve ter pelo menos um ingrediente");
        error.statusCode = 400;
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

        error.statusCode = 400;
        throw error;
    }

    if(!Array.isArray(steps) || steps.length === 0){
        const error = new Error("A receita deve ter pelo menos um passo");
        error.statusCode = 400;
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

//TODO: validar a existência do ingrediente e das medidas na base de dados

const updateRecipe = async (id, data, userId) => {
    const { name, image, steps, ingredients, categoryId, difficultyId, isPublic } = data;

    const creatorId = userId;

    const existingRecipe = await prisma.recipe.findFirst({
        where: {
            id,
            creatorId
        },
    });

    if(!existingRecipe){
        const error = new Error("Receita não encontrada");
        error.statusCode = 404;
        throw error;
    }

    if(!name || !steps || !ingredients || !categoryId || !difficultyId || !creatorId) {
        const error = new Error("Campos obrigatórios em falta");
        error.statusCode = 400;
        throw error;
    }

    if(isPublic !== undefined && typeof isPublic !== "boolean") {
        const error = new Error('O campo isPublic só pode ser "true" ou "false"' );
        error.statusCode = 400;
        throw error;
    }
    
    const creator = await prisma.user.findUnique({
        where: { id: creatorId },
    });

    if(!creator){
        const error = new Error("O usuário indicado não existe");
        error.statusCode = 400;
        throw error;
    };

    const categoria = await prisma.recipeCategory.findUnique({
        where: { id: categoryId },
    })

    if(!categoria) {
        const error = new Error("A categoria indicada não existe");
        error.statusCode = 400;
        throw error;
    };

    const difficulty = await prisma.difficulty.findUnique({
        where: { id: difficultyId },
    })

    if(!difficulty) {
        const error = new Error("A dificuldade indicada não existe");
        error.statusCode = 400;
        throw error;
    };

    if(!Array.isArray(ingredients) || ingredients.length === 0){
        const error = new Error("A receita deve ter pelo menos um ingrediente");
        error.statusCode = 400;
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

        error.statusCode = 400;
        throw error;
    }

    if(!Array.isArray(steps) || steps.length === 0){
        const error = new Error("A receita deve ter pelo menos um passo");
        error.statusCode = 400;
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
            creatorId,
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

const deleteRecipe = async (id, userId) => {
    const existingRecipe = await prisma.recipe.findFirst({
        where: {
            id,
            creatorId: userId,
        },
    });

    if(!existingRecipe){
        const error = new Error("Receita não encontrada");
        error.statusCode = 404;
        throw error;
    }

    await prisma.ingredientsInTheRecipe.deleteMany({
        where: { recipeId: id },
    });

    await prisma.recipe.delete({
        where: { id },
    });
};

const searchRecipeByName = async (name, userId) => {
    return prisma.recipe.findMany({
        where: {
            OR: [
                { isPublic: true },
                { creatorId: userId },
            ],
            name: {
                contains: name,
                mode: "insensitive",
            },
        },
        include: {
            creator: true,
            category: true,
            difficulty: true,
        },
        orderBy: {
            name: "asc",
        },
    });
};

module.exports = {
    getAllRecipes,
    getMyRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipeByName,
}