const express = require("express")
const { create, listAll, findById, update, remove } = require ('../controllers/IngredientController.js')
const authenticateToken = require("../middlewares/auth.middleware.js")

const router = express.Router();

router.use(authenticateToken)

// Rotas do CRUD de Ingredientes
router.post('/', create);         // POST /ingredients -> Criar
router.get('/', listAll);         // GET /ingredients  -> Listar todos do usuário + aprovados
router.get('/:id', findById);     // GET /ingredients/:id -> Buscar um específico
router.put('/:id', update);       // PUT /ingredients/:id -> Atualizar
router.delete('/:id', remove);    // DELETE /ingredients/:id -> Deletar

module.exports = router;