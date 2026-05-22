const express = require("express")
const router = express.Router();

const { create, listAll, findById, update, remove, getPending, approve } = require ('../controllers/IngredientController.js')
const authenticateToken = require("../middlewares/error.autentication.js")
const adminMiddleware = require('../middlewares/error.admin.js')



router.use(authenticateToken)

// Rotas do CRUD de Ingredientes
router.post('/', create);         // POST /ingredients -> Criar
router.get('/', listAll);         // GET /ingredients  -> Listar todos do usuário + aprovados
router.get('/:id', findById);     // GET /ingredients/:id -> Buscar um específico
router.put('/:id', update);       // PUT /ingredients/:id -> Atualizar
router.delete('/:id', remove);    // DELETE /ingredients/:id -> Deletar
router.get('/admin/pending', adminMiddleware, getPending);
router.put('/admin/review/:id', adminMiddleware, approve);

module.exports = router;