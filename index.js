const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const SECRET = "segredo123";

const contribuintesMock = [
  { cpf: "11111111111", nome: "Peter Parker", data_nascimento: "1990-01-01", nome_mae: "May Parker" },
  { cpf: "22222222222", nome: "Uzumaki Naruto", data_nascimento: "1985-02-02", nome_mae: "Uzumaki Kushina" },
  { cpf: "33333333333", nome: "Joseph Joestar", data_nascimento: "1979-03-03", nome_mae: "Lisa Joestar" },
  { cpf: "44444444444", nome: "Peter Quill", data_nascimento: "2000-04-04", nome_mae: "Patricia Quill" },
  { cpf: "55555555555", nome: "Marcos Dias", data_nascimento: "1995-05-05", nome_mae: "Rita Dias" },
  { cpf: "66666666666", nome: "Paula Mendes", data_nascimento: "1988-06-06", nome_mae: "Fernanda Mendes" },
  { cpf: "77777777777", nome: "Felipe Castro", data_nascimento: "1992-07-07", nome_mae: "Sandra Castro" },
  { cpf: "88888888888", nome: "Juliana Matos", data_nascimento: "1980-08-08", nome_mae: "Veronica Matos" },
  { cpf: "99999999999", nome: "Renato Teixeira", data_nascimento: "1991-09-09", nome_mae: "Cecilia Teixeira" },
  { cpf: "12345678900", nome: "Camila Gomes", data_nascimento: "1993-10-10", nome_mae: "Adriana Gomes" }
];

const contribuintes = [...contribuintesMock];

const inscricoesMock = {
  "12345678900": [
    {
      cpf: "12345678900",
      numero: "001",
      descricao: "Dívida ativa",
      valor: 1000.0,
      data_inscricao: "2024-01-01",
      data_prazo: "2024-12-31",
    },
  ],
};

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Lucas PGE",
      version: "1.0.0",
      description: "API simulada para cadastro e consulta de inscrições protestadas",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "x-access-token",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./index.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function authMiddleware(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ erro: "Token não fornecido" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ erro: "Token inválido" });
    req.user = decoded;
    next();
  });
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz login e retorna um token
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - senha
 *             properties:
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de acesso
 *       400:
 *         description: Usuário ou senha inválidos
 */
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === "admin" && senha === "password") {
    const token = jwt.sign({ usuario }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  return res.status(400).json({ erro: "Usuário ou senha inválidos" });
});

/**
 * @swagger
 * /contribuintes:
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
app.post("/contribuintes", authMiddleware, (req, res) => {
  const { cpf, nome, data_nascimento, nome_mae } = req.body;

  if (!cpf || !nome || !data_nascimento || !nome_mae) {
    return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos" });
  }

  if (!/^\d{11}$/.test(cpf)) {
    return res.status(400).json({ erro: "CPF inválido" });
  }

  const exists = contribuintes.find((c) => c.cpf === cpf);
  if (exists) {
    return res.status(400).json({ erro: "CPF já cadastrado" });
  }

  contribuintes.push({ cpf, nome, data_nascimento, nome_mae });
  return res.status(201).json({ mensagem: "Contribuinte cadastrado com sucesso" });
});

/**
 * @swagger
 * /inscricoes/{cpf}:
 *   get:
 *     summary: Lista inscrições protestadas do contribuinte
 *     tags: [Inscrições]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do contribuinte
 *     responses:
 *       200:
 *         description: Lista de inscrições
 *       404:
 *         description: Nenhuma inscrição encontrada
 */
app.get("/inscricoes/:cpf", authMiddleware, (req, res) => {
  const { cpf } = req.params;
  const inscricoes = inscricoesMock[cpf];

  if (!inscricoes) {
    return res.status(404).json({ erro: "Nenhuma inscrição encontrada para o CPF fornecido" });
  }

  return res.json(inscricoes);
});

swaggerSpec.components = {
  securitySchemes: {
    bearerAuth: {
      type: "apiKey",
      in: "header",
      name: "x-access-token",
    },
  },
};

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/docs`);
});