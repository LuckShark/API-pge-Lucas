const jwt = require("jsonwebtoken");
const { SECRET } = require("../middlewares/auth");

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Faz login e retorna um token
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [usuario, senha]
 *             properties:
 *               usuario: { type: string }
 *               senha: { type: string }
 *     responses:
 *       200: { description: Token de acesso }
 *       400: { description: Usuário ou senha inválidos }
 */
function login(req, res) {
  const { usuario, senha } = req.body;
  if (usuario === "admin" && senha === "password") {
    const token = jwt.sign({ usuario }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  return res.status(400).json({ erro: "Usuário ou senha inválidos" });
}

module.exports = { login };
