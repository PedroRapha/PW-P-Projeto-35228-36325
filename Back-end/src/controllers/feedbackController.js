const feedbackService = require('../services/feedbackService');

const handleFavorite = async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const userId = req.user.id; 

        const result = await feedbackService.toggleFavorite(recipeId, userId);
        
        return res.status(200).json(result);
    } catch (error) {
        next(error); 
    }
};


const handleReview = async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const userId = req.user.id;
        const { rating, comment } = req.body; 
       
        const review = await feedbackService.upsertReview(recipeId, userId, { rating, comment });
        
        return res.status(201).json({
            success: true,
            message: "Avaliação registada ou atualizada com sucesso!",
            data: review
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleFavorite,
    handleReview
};