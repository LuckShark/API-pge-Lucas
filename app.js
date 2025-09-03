const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec} = require("./config/swagger");
const { authMiddleware } = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");

const authCtrl = require("./controllers/auth.controller");
const contribCtrl = require("./controllers/contribuintes.controller");
const inscCtrl = require("./controllers/inscricoes.controller");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** Rotas documentadas no Swagger (controllers têm as anotações) **/

/** Auth **/
app.post("/api/login", authCtrl.login);

/** Contribuintes **/
app.get("/api/contribuintes", authMiddleware, contribCtrl.buscar);
app.post("/api/contribuintes", authMiddleware, contribCtrl.criar);
app.put("/api/contribuintes/:cpf", authMiddleware, contribCtrl.atualizar);
app.delete("/api/contribuintes/:cpf", authMiddleware, contribCtrl.deletar);

/** Inscrições **/
app.get("/api/inscricoes/:cpf", authMiddleware, inscCtrl.listarPorCpf);

app.use(errorHandler);

module.exports = app;
