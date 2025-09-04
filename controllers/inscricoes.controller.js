const service = require("../services/inscricoes.service");

/**
 * @swagger
 * /api/inscricoes/{cpf}:
 *   get:
 *     summary: Lista inscrições por CPF
 *     tags: [Inscrições]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Lista de inscrições }
 *       404: { description: Nenhuma inscrição encontrada }
 */
async function listarPorCpf(req, res, next) {
  try {
    const { cpf } = req.params;
    const itens = await service.listarPorCpf(cpf);
    if (!itens || itens.length === 0) return res.status(404).json({ erro: "Nenhuma inscrição encontrada" });
    res.json(itens);
  } catch (e) { next(e); }
}

module.exports = { listarPorCpf };
