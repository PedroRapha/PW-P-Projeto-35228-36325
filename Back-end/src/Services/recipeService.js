const prisma = require("../prisma/PrismaClient");

const getAllRecipes = async (query, userId = null) => {
    const page = parseInt(query.page)  || 1;
    const limit = parseInt(query.limit) || 5;
    const sort = query.sort || "name";

    const allowedSortFields = ["name", "difficultyId", "categoryId"];
    if(!allowedSortFields.includes(sort)){
        const error = new Error('O campo da ordenação deve ser "name", "difficultyId" ou "categoryId"');
        error.statusCode = 400;
        throw error;
    }

    const skip = (page - 1) * limit;
    const take = limit;
    let orderBy = { [sort]: "asc" };

    const where = userId ? { OR: [
                { isPublic: true },
                { creatorId: userId }
            ] } : { isPublic : true };

    const recipes = await prisma.recipe.findMany({
        where,
        skip,
        take,
        orderBy,
        select: {
            id: true,
            name: true,
            image: true,
            isPublic: true,
            category: {
                select: {
                    id: true,
                    name: true,
                }
            },
            difficulty: {
                select: {
                    id: true,
                    name: true,
                }
            },
            creator: {
                select: {
                    id : true,
                    name: true,
                },
            },
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
    const limit = parseInt(query.limit) || 5;
    const sort = query.sort || "name";

    const skip = (page - 1) * limit;
    const take = limit;
    let orderBy = { [sort]: "asc" };

    const allowedSortFields = ["name", "difficultyId", "categoryId"];
    if(!allowedSortFields.includes(sort)){
        const error = new Error('O campo da ordenação deve ser "name", "difficultyId" ou "categoryId"');
        error.statusCode = 400;
        throw error;
    }

    const recipes = await prisma.recipe.findMany({
        where: {
            creatorId: userId
        },
        skip,
        take,
        orderBy,
        select: {
            id: true,
            name: true,
            image: true,
            isPublic: true,
            category: {
                select: {
                    id: true,
                    name: true,
                }
            },
            difficulty: {
                select: {
                    id: true,
                    name: true,
                }
            },
            creator: {
                select: {
                    id : true,
                    name: true,
                },
            },
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
            creator: { 
                select: {  
                    id: true,
                    name: true,
                } 
            },
            category: {
                select: {
                    id: true,
                    name: true,
                }
            },
            difficulty: {
                select: {
                    id: true,
                    name: true,
                }
            },
            ingredients: {
                select: {
                    qnt: true,
                    measure: true,
                    ingredient: true,
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

    if(!name || !steps || !ingredients || !categoryId || !difficultyId) {
        const error = new Error("Campos obrigatórios em falta");
        error.statusCode = 400;
        throw error;
    }

    if(isPublic !== undefined && typeof isPublic !== "boolean") {
        const error = new Error('O campo isPublic só pode ser "true" ou "false"' );
        error.statusCode = 400;
        throw error;
    }

    const categoria = await prisma.recipeCategory.findUnique({
        where: { id: categoryId },
    })

    if(!categoria) {
        const error = new Error("A categoria indicada não existe");
        error.statusCode = 404;
        throw error;
    };

    const difficulty = await prisma.difficulty.findUnique({
        where: { id: difficultyId },
    })

    if(!difficulty) {
        const error = new Error("A dificuldade indicada não existe");
        error.statusCode = 404;
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
            isPublic: isPublic ?? true //Garantindo como true caso venha undefined
        },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                },
            },
            ingredients: true,
            category: true,
            difficulty: true,
        },
    });
};

const updateRecipe = async (id, data, userId) => {
    const { name, image, steps, ingredients, categoryId, difficultyId, isPublic } = data;

    const existingRecipe = await prisma.recipe.findFirst({
        where: {
            id,
            OR: [
                { isPublic: true },
                { creatorId: userId },
            ]
        },
    });

    if(!existingRecipe){
        const error = new Error("Receita não encontrada");
        error.statusCode = 404;
        throw error;
    }

    if(!name || !categoryId || !difficultyId) {
        const error = new Error("Campos obrigatórios em falta");
        error.statusCode = 400;
        throw error;
    }

    if(isPublic !== undefined && typeof isPublic !== "boolean") {
        const error = new Error('O campo isPublic só pode ser "true" ou "false"' );
        error.statusCode = 400;
        throw error;
    }

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

    if (existingRecipe.creatorId !== userId) {
        const error = new Error('Não tem permissão para editar esta receita!');
        error.statusCode = 403; 
        throw error;
    }

    if(!Array.isArray(ingredients) || ingredients.length === 0) {
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
            isPublic
        },
        select: {
            creator: {
                select: {
                    id: true,
                    name: true,
                }
            },
            ingredients: true,
            category: true,
            difficulty: true,
        },
    });
};

const deleteRecipe = async (id, userId) => {
    const existingRecipe = await prisma.recipe.findFirst({
        where: {
            id,
        },
    });

    if(!existingRecipe){
        const error = new Error("Receita não encontrada");
        error.statusCode = 404;
        throw error;
    }

    if(existingRecipe.creatorId !== userId){
        const error = new Error("Não tem permissão para deletar esta receita");
        error.statusCode = 403;
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
        select: {
            id: true,
            name: true,
            image: true,
            isPublic: true,
            category: {
                select: {
                    id: true,
                    name: true,
                }
            },
            difficulty: {
                select: {
                    id: true,
                    name: true,
                }
            },
            creator: {
                select: {
                    id : true,
                    name: true,
                },
            },
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