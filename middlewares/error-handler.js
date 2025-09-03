module.exports = (err, req, res, next) => {
  const status = err.statusCode || 400;
  const payload = { erro: err.message || "Erro inesperado" };
  if (err.details) payload.details = err.details;
  res.status(status).json(payload);
};
