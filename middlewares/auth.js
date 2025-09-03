const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;


function authMiddleware(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ erro: "Token não fornecido" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ erro: "Token inválido" });
    req.user = decoded;
    next();
  });
}

module.exports = { authMiddleware, SECRET}