const prisma = require("../prisma/prismaClient");

const getTotalUsers = async () => {
    return await prisma.user.count();
}

const getTotalRecipes = async () => {
    return await prisma.recipe.count();
}

const getAverageOfReviews = async () => {
    const result = await prisma.review.aggregate({
        _avg: {
            rating: true,
        }
    });

    return result._avg.rating || 0;
}

module.exports = {
    getTotalUsers,
    getTotalRecipes,
    getAverageOfReviews
};