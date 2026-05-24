const prisma = require('../prisma/prismaClient');


const toggleFavorite = async (recipeId, userId) => {
    // Verificar se a receita existe
    const recipe = await prisma.recipe.findUnique({ 
        where: { 
            id: recipeId 
        } 
    });

    if (!recipe) {
        const error = new Error("Receita não encontrada");
        error.statusCode = 404;
        throw error;
    }

    // Verificar se o favorito já existe
    const existingFavorite = await prisma.favorite.findUnique({
        where: {
            userId_recipeId: { userId, recipeId}
        }
    });

    if (existingFavorite) {
        // Se já existe, remove
        await prisma.favorite.delete({
            where: {
                userId_recipeId: { userId, recipeId}
            }
        });
        return { favorited: false, message: "Receita removida dos favoritos." };
    } else {
        // Se não existe, cria
        await prisma.favorite.create({
            data: { userId, recipeId}
        });
        return { favorited: true, message: "Receita adicionada aos favoritos!" };
    }
};

const upsertReview = async (recipeId, userId, reviewData) => {
    const { rating, comment } = reviewData;

    // Validação básica da nota
    if (!rating || rating < 1 || rating > 5) {
        const error = new Error("A avaliação deve ser um número inteiro entre 1 e 5.");
        error.statusCode = 400;
        throw error;
    }

    const recipe = await prisma.recipe.findUnique({ 
        where: { 
            id: recipeId
        } 
    });

    if (!recipe) {
        const error = new Error("Receita não encontrada");
        error.statusCode = 404;
        throw error;
    }

    // Usa o upsert do Prisma: atualiza se existir, cria se não existir
    return await prisma.review.upsert({
        where: {
            userId_recipeId: { userId, recipeId}
        },
        update: {
            rating: Number(rating),
            comment
        },
        create: {
            userId,
            recipeId,
            rating: Number(rating),
            comment
        },
        include: {
            user: { 
                select: { 
                name: true 
            } }
        }
    });
};

module.exports = {
    toggleFavorite,
    upsertReview
};