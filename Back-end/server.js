require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const app = express()

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

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ message: "Erro no interior do servidor" })
})

app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`)
})