import React, { useState } from "react";
import "./styles.css";
import logo from "../../../img/zvix-logo-color.svg";
import validaCpfCnpj from "../../../libs/ValidaCPFCNPJ";
import {Navigate, useNavigate} from 'react-router-dom';
import IsAuthenticated from "../../../libs/Auth";
import api from "../../../controller/api";
import md5 from 'md5';
import RemoverFormatacao from "../../../libs/RemoverFormatacao";

function Login() {
  const [cpfcnpj, setCpfCnpj] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const Navegacao = useNavigate();

  StyleBody();

  if(IsAuthenticated()){
    return(
      <Navigate to="/" replace={true} />
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validaCpfCnpj(cpfcnpj)) {
      ExibirMessagemErro("CPF ou CNPJ incorreto.");
      return;
    }

    if (username.length <= 0) {
      ExibirMessagemErro("Informe o nome de usuário.");
      return;
    }

    if (password.length < 6) {
      ExibirMessagemErro("A senha deve conter no minimo 6 caracteres.");
      return;
    }

    let json = {
      cpf_cnpj: RemoverFormatacao(cpfcnpj.trim()),
      nome_usuario: username.trim(),
      senha: md5(password)
    }
    
    api.post("/api/v1/signin", json)
      .then((response) => {
        console.log(response.data.conta.codigo);
        localStorage.setItem("zvix_codigo_usuario", response.data.conta.codigo);
        localStorage.setItem("zvix_nome_usuario", response.data.conta.nome_usuario);
        localStorage.setItem("zvix_tipo_usuario", response.data.conta.type);
        localStorage.setItem("zvix_nome", response.data.conta.nome);
        localStorage.setItem("zvix_documento", json.cpf_cnpj);
        localStorage.setItem("zvix_token", response.data.token);
        Navegacao("/");
      })
      .catch((err) => {
        console.log(err)
        ExibirMessagemErro(err.response.data)
        return;
      });
  }

  function ExibirMessagemErro(mensagem) {
    setMessage(mensagem);
    setError(true);

    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  function StyleBody(){
    document.body.style = 'background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);';
    document.title = 'ZVIX | Login';
  }

  return (
    <div className="wrapper">
      <div className="container-fluid body-login">
        <div className="row" id="col-form">
          <div className="col d-none d-md-block col-left"></div>
          <div className="col d-flex flex-column col-form-login">
            <div className="d-flex justify-content-between mx-auto">
              <img className="img-logo" src={logo} />
            </div>
            <div className="container-form mx-auto w-100 p-5 h-50">
              <form onSubmit={handleSubmit} method="POST">
                <div className="form-group">
                  {!error ? null : (
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  )}
                  <label id="title-form-login" style={{color: 'white', fontWeight: 'bold'}}>
                    Acesso ao Painel
                  </label>
                  <input
                    type="text"
                    id="txtdoc"
                    name="doc"
                    className="form-control input-field"
                    required={true}
                    aria-describedby="docHelp"
                    placeholder="CPF/CNPJ"
                    maxLength={18}
                    value={cpfcnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                  />
                </div>
                <div className="form-group mt-4">
                  <input
                    type="text"
                    id="txtusername"
                    name="username"
                    required={true}
                    className="form-control input-field"
                    placeholder="Nome de Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mt-4">
                  <input
                    type="password"
                    id="txtsenha"
                    name="password"
                    required={true}
                    className="form-control input-field"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="row h-100">
                  <div className="col w-100 mt-3">
                    <button
                      className="btn w-100 btn-login"
                      type="submit"
                    >
                      Acessar
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="footer mx-auto p-1 text-light" style={{color: '#6c7489'}}>
              © 2023 zvix.com.br - Powered by:{" "}
              <a href="http://mgtech.com.br">
                <strong id="link-powered" className="text-light" style={{color: '#6c7489'}}>
                  @murilogarcia23
                </strong>
              </a>
            </div>
          </div>
          <div className="col d-none d-md-block col-right "></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
