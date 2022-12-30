function RemoverFormatacao(texto) {
  var text = "";
  text = texto;
  return text
    .replace(".", "")
    .replace("-", "")
    .replace("/", "")
    .replace(".", "")
    .replace("_", "");
}

export default RemoverFormatacao;
