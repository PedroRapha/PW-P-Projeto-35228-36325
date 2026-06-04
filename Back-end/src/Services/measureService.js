const prisma = require("../prisma/prismaClient");

//No futuro podemos desenvolver mais isto, se quisermos criar um editor de medidas para admins

const getAllMeasures = async () => {
    return prisma.measure.findMany()
}

module.exports = {
    getAllMeasures
}