require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

//importação de middleware de erro do servidor
const errorMiddleware = require("./src/middlewares/error.middleware")

//importação de rota dos usuários
const routeUsuario = require("./src/routes/userRoute")

//importação da rota de ingredientes
const routeIngredient = require("./src/routes/ingredientRoute")

//importação da rota de receitas
const routeRecipe = require("./src/routes/recipeRoute")

const PORT = process.env.SERVER_PORT || 3000

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/auth/", routeUsuario)
app.use("/ingredients", routeIngredient)
app.use("/recipe/", routeRecipe)

//Middlewares de erros
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" })
})

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`)
})