const measureService = require("../services/measureService")

const getAllMeasures = async(req, res, next) => {
    try {
        const measures = await measureService.getAllMeasures();
        res.status(200).json(measures);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMeasures,
};