const prisma = require('../prisma/prismaCliente');

// - Criar Ingrediente
const createIngredient = async (data) => {
    const { name, categoryId, suggestedById } = data;

    // Validação: Evitar que o MESMO usuário crie ingredientes com nomes duplicados
    const existingIngredient = await prisma.ingredient.findFirst({
        where: {
            name: { equals: name, mode: 'insensitive' }, // Ignora maiúsculas/minúsculas
            suggestedById
        }
    });

    if (existingIngredient) {
        const error = new Error('Você já cadastrou um ingrediente com este nome.');
        error.status = 409;
        throw error;
    }

    return await prisma.ingredient.create({
        data: {
            name,
            categoryId,
            suggestedById,
            isApproved: false
        }
    });
}

// - Listar Ingredientes visíveis para o usuário
const listAllIngredient = async (userId) => {
    return await prisma.ingredient.findMany({
        where: {
            OR: [
                { isApproved: true },   // Itens oficiais/aprovados que todos podem ver
                { suggestedById: userId }   // Itens privados que este usuário específico criou
            ]
        },
        include: {
            category: true // Já traz os dados da categoria associada
        },
        orderBy: {
            name: 'asc' // Ordem alfabética
        }
    });
}

// - Buscar um ingrediente específico por ID
const findIngredientById = async (id, userId) => {
    const ingredient = await prisma.ingredient.findUnique({
        where: { id: id },
        include: { category: true }
    });

    if (!ingredient) {
        const error = new Error('Ingrediente não encontrado.');
        error.status = 404;
        throw error;
    }

    // Segurança: Se o ingrediente não for aprovado E não for do usuário logado, bloqueia o acesso
    if (!ingredient.isApproved && ingredient.suggestedById !== userId) {
        const error =  new Error('Acesso negado a este ingrediente.');
        error.status = 409;
        throw error;
    }

    return ingredient;
}

// - Atualizar Ingrediente
const updateIngredient = async (id, userId, data) => {
    const { name, categoryId } = data;

    // Verificar se o ingrediente existe e se pertence ao usuário
    const ingredient = await prisma.ingredient.findUnique({
        where: { id: id }
    });

    if (!ingredient) {
        const error = new Error('Ingrediente não encontrado.');
        error.status = 404;
        throw error;
    }

    // Segurança: Usuário comum só pode editar os ingredientes que ele mesmo criou
    if (ingredient.suggestedById !== userId || ingredient.isApproved) {
        const error = new Error('Você não tem permissão para editar este ingrediente.');
        error.status = 409;
        throw error;
    }

    return await prisma.ingredient.update({
        where: { id: id },
        data: {
            name,
            categoryId
        }
    });
}

// - Deletar Ingrediente
const deleteIngredient = async (id, userId) => {
    const ingredient = await prisma.ingredient.findUnique({
        where: { id: id }
    });

    if (!ingredient) {
        const error = new Error('Ingrediente não encontrado.');
        error.status = 404;
        throw error;
    }

    // Segurança: Usuário comum só pode deletar os seus próprios ingredientes
    if (ingredient.suggestedById !== userId || ingredient.isApproved) {
        const error = new Error('Você não tem permissão para eliminar este ingrediente.');
        error.status = 409;
        throw error;
    }

    return await prisma.ingredient.delete({
        where: { id: id }
    });
}

module.exports = {
    createIngredient,
    listAllIngredient,
    findIngredientById,
    updateIngredient,
    deleteIngredient
}