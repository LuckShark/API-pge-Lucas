const contribuintes = [
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

function validar(contribuinte){
  const erros = [];
  if (!contribuinte?.cpf) erros.push("cpf é obrigatório");
  if (!/^\d{11}$/.test(contribuinte.cpf || "")) erros.push("cpf inválido");
  if (!contribuinte?.nome) erros.push("nome é obrigatório");
  if (!contribuinte?.data_nascimento) erros.push("data_nascimento é obrigatória");
  if (!contribuinte?.nome_mae) erros.push("nome_mae é obrigatório");
    console.log(erros);
  if (erros.length) {
    const err = new Error("Validação falhou");
    err.details = erros;
    throw err;
  }
}

async function buscar(){
  return contribuintes;
}

async function criar(input){
  validar(input);

  const existe = contribuintes.find((c) => c.cpf === input.cpf);
  if (existe) throw new Error("CPF já cadastrado");

  contribuintes.push({ ...input });
  return input;
}

async function atualizar(cpf, patch){
  const idx = contribuintes.findIndex(x => x.cpf === cpf);
  if(idx === -1) throw new Error("Contribuinte não encontrado");
  if(patch.cpf && patch.cpf !== cpf) throw new Error("Não é permitido alterar o CPF");
  contribuintes[idx] = {...contribuintes[idx], ...patch};
  return contribuintes[idx];
}

async function deletar(cpf){
  const idx = contribuintes.findIndex(x => x.cpf === cpf);
  if(idx === -1) throw new Error("Contribuinte não encontrado");
  contribuintes.splice(idx,1);
}

module.exports = {buscar, criar, atualizar, deletar};
