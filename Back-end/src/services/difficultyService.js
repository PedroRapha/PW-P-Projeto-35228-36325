const prisma = require("../prisma/prismaClient");

//No futuro podemos desenvolver mais isto, se quisermos criar um editor de dificuldades para admins

const getAllDifficulties = async () => {
    return prisma.difficulty.findMany({
        orderBy: {
            id: "asc",
        },
    });
}

module.exports = {
    getAllDifficulties
}