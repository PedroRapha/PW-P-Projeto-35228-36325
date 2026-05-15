const UsuarioService = require("../Services/userService");

// 🔹 REGISTO DE UTILIZADOR
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "Os campos name, email e password são obrigatórios"
        })
    }

    // Chama o service (onde está a lógica)
    const user = await UsuarioService.register(name, email, password);

    // Resposta de sucesso
    return res.status(201).json(user);

  } catch (error) {
    next(error)
  }
}


// 🔹 LOGIN DE UTILIZADOR
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "Os campos email e password são obrigatórios"
        })
    }

    // Chama service de login
    const user = await UsuarioService.login(email, password);

    return res.status(200).json(user);

  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login
};
