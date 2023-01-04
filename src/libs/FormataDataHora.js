function FormataDataHora(dataHora) {
  var datetime = new Date(dataHora).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  return datetime;
}

export default FormataDataHora;
