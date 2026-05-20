const prisma = require("../prisma/PrismaClient");

const getAllRecipes = async (query) => {
    const page = parseInt(query.page)  || 1;
    const limit = parseInt(query.limit) || 10;
    const sort = query.sort;

    const skip = (page - 1) * limit;
    const take = limit;

    const allowedSortFields = ["name", "difficulty"];
    let orderBy = { name: "asc" };

    const recipes = await prisma.recipe.findMany({
        skip,
        take,
        orderBy,
        include: {
            creator: true,
            category: true,
            difficulty: true,
        },
    });

    const total = await prisma.recipe.count();

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: recipes,
    };
};

const getRecipeById = async (id) => {
    const recipe = await prisma.recipe.findUnique({
        where: { id },
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

const createRecipe = async (data) => {
    const { name, image, steps, ingredients, categoryId, difficultyId, creatorId, isPublic } = data;

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

const updateRecipe = async (id, data) => {
    const { name, image, steps, ingredients, categoryId, difficultyId, creatorId, isPublic } = data;

    const existingRecipe = await prisma.recipe.findUnique({
        where: {
            id,
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

const deleteRecipe = async (id) => {
    const existingRecipe = await prisma.recipe.findUnique({
        where: {
            id,
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

const searchRecipeByName = async (name) => {
    return prisma.recipe.findMany({
        where: {
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
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipeByName,
}