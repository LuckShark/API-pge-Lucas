const service = require("../services/contribuintes.service");

/**
 * @swagger
 * /api/contribuintes:
 *   post:
 *     summary: Cadastra um novo contribuinte
 *     tags: [Contribuintes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *               - nome
 *               - data_nascimento
 *               - nome_mae
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *               nome_mae:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contribuinte cadastrado com sucesso
 *       400:
 *         description: Erro de validação
 */
async function criar(req,res,next){
  try {
    const result = await service.criar(req.body);
    res.status(201).json({ mensagem: "Contribuinte cadastrado com sucesso", data: result });
  } catch (e) { next(e); }
}

/**
 * @swagger
 * /api/contribuintes:
 *   get:
 *     summary: Busca todos os contribuintes 
 *     tags: [Contribuintes]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: Buscar }
 *       400: { description: Erro/validação }
 */
async function buscar(req,res,next){
  try {
    const result = await service.buscar();
    res.status(200).json({ mensagem: "Contribuintes cadastrados", data: result });
  } catch (e) { next(e); }
}

/**
 * @swagger
 * /api/contribuintes/{cpf}:
 *   put:
 *     summary: Atualiza um contribuinte (não permite alterar CPF)
 *     tags: [Contribuintes]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *               - nome
 *               - data_nascimento
 *               - nome_mae
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *               nome_mae:
 *                 type: string
 *     responses:
 *       200: { description: Atualizado }
 *       400: { description: Erro/validação }
 */
async function atualizar(req, res, next) {
  try {
    const cpf = req.params.cpf;
    const result = await service.atualizar(cpf, req.body);
    res.json({ mensagem: "Contribuinte atualizado com sucesso", data: result });
  } catch (e) { next(e); }
}

/**
 * @swagger
 * /api/contribuintes/{cpf}:
 *   delete:
 *     summary: Deleta contribuinte por CPF
 *     tags: [Contribuintes]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       400: { description: Erro/validação }
 */
async function deletar(req, res, next) {
  try {
    const cpf = req.params.cpf;
    const result = await service.deletar(cpf);
    res.json({ mensagem: "Contribuinte deletado" });
  } catch (e) { next(e); }
}

module.exports = { criar, atualizar, buscar, deletar };