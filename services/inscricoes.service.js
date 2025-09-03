const inscricoesPorCpf = {
  "12345678900": [
    { 
        cpf: "12345678900", 
        numero: "001", 
        descricao: "Dívida ativa", 
        valor: 1000.0,   
        data_inscricao: "2024-01-01",
        data_prazo: "2024-12-31"
    }
  ]
};

async function listarPorCpf(cpf) {
  return inscricoesPorCpf[cpf] || [];
}

module.exports = { listarPorCpf };
