require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

//importação de middleware de erro do servidor
const errorMiddleware = require("./src/middlewares/error.middleware")

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

const PORT = process.env.SERVER_PORT || 3000

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({ adapter })


app.get("/teste", (req, res) =>{
    res.send("API já está a funcionar!")
})



//Middlewares de erros
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" })
})

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`)
})