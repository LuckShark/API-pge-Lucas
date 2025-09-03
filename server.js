const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/docs`);
});