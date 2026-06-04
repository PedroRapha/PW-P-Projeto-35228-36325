const express = require("express")

const router = express.Router();

const { create, listAll, findById, update, remove, getPending, approve } = require ('../controllers/IngredientController.js')


const authenticateToken = require("../middlewares/auth.middleware.js")
const adminMiddleware = require('../middlewares/admin.middleware.js')

// Rotas do CRUD de Ingredientes

//Rotas públicas:
router.get('/', listAll);         // GET /ingredients  -> Listar todos
router.get('/:id', findById);     // GET /ingredients/:id -> Buscar um específico

//Rotas autenticadas:
router.post('/', authenticateToken, create);         // POST /ingredients -> Criar
router.put('/:id', authenticateToken, update);       // PUT /ingredients/:id -> Atualizar
router.delete('/:id', authenticateToken, remove);    // DELETE /ingredients/:id -> Deletar

//Rotas admin:
router.get('/admin/pending', authenticateToken, adminMiddleware, getPending);
router.put('/admin/review/:id', authenticateToken, adminMiddleware, approve);

module.exports = router;