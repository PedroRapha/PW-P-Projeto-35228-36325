const prisma = require("../prisma/prismaClient");

//No futuro podemos desenvolver mais isto, se quisermos criar um editor de categorias para admins

const getAllRecipeCategories = async () => {
    return prisma.recipeCategory.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

module.exports = {
    getAllRecipeCategories
}