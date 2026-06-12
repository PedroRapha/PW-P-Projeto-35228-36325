const difficultyService = require("../services/difficultyService")

const getAllDifficulties = async(req, res, next) => {
    try {
        const difficulties = await difficultyService.getAllDifficulties();
        res.status(200).json(difficulties);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllDifficulties,
};