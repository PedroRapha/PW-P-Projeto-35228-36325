require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//importação de middleware de erro do servidor
const errorMiddleware = require("./src/middlewares/error.middleware");

//importação de rota dos usuários
const routeUsuario = require("./src/routes/userRoute");

//importação da rota das categorias de receitas
const routeIngredientCategories = require("./src/routes/ingredientCategoryRoute");

//importação da rota de ingredientes
const routeIngredient = require("./src/routes/ingredientRoute");

//importação da rota de receitas
const routeRecipe = require("./src/routes/recipeRoute");

//importação da rota de medidas
const routeMeasure = require("./src/routes/measureRoute");

//importação da rota de favorite e review
const routeFavoriteReview = require("./src/routes/feedbackRouter");

//importação da rota de categorias de receitas
const routeRecipeCategories = require("./src/routes/recipeCategoryRoute");

//importação da rota de dificuldades
const routeDifficulties = require("./src/routes/difficultyRoute");

//importação da rota de estatísticas
const routeStats = require("./src/routes/statsRoute");

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/auth/", routeUsuario);
app.use("/ingredients/", routeIngredient);
app.use("/ingredientCategories/", routeIngredientCategories);
app.use("/recipes/", routeRecipe);
app.use("/authRecipe/", routeFavoriteReview);
app.use("/measures/", routeMeasure);
app.use("/recipeCategories/", routeRecipeCategories);
app.use("/difficulties/", routeDifficulties);
app.use("/stats", routeStats);

//Deploy funcionou!
app.get("/", (req, res) => {
    res.json({ message: "API TakeNote online" });
});

//Middlewares de erros
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

app.use(errorMiddleware);

//para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Servidor a correr em http://localhost:${PORT}`);
    });
}

//para a Vercel
module.exports = app;
