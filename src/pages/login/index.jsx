import React, { useState } from "react";
import "./styles.css";
import logo from "../../img/zvix-logo-color.svg";
import validaCpfCnpj from "../../libs/ValidaCPFCNPJ";
import {Navigate, useNavigate} from 'react-router-dom';
import IsAuthenticated from "../../libs/Auth";

function Login() {
  const [cpfcnpj, setCpfCnpj] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const Navegacao = useNavigate();

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

    if (
      cpfcnpj === "10.510.658/0001-05" &&
      username === "mulori" &&
      password === "230600"
    ) {
      localStorage.setItem("zvix_user_id", "123");
      Navegacao("/");
    } else {
      ExibirMessagemErro("Uma ou mais credenciais estão inválidas.");
      return;
    }
  }

  function ExibirMessagemErro(mensagem) {
    setMessage(mensagem);
    setError(true);

    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  return (
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
                <label id="title-form-login" style={{color: '#043f69', fontWeight: 'bold'}}>
                  Acesso ao Painel
                </label>
                <input
                  type="text"
                  id="txtdoc"
                  name="doc"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
          <div className="footer mx-auto p-1" style={{color: '#6c7489'}}>
            © 2022 mgtech.com.br - Powered by:{" "}
            <a href="http://mgtech.com.br">
              <strong id="link-powered" style={{color: '#6c7489'}}>
                MG Tech
              </strong>
            </a>
          </div>
        </div>
        <div className="col d-none d-md-block col-right "></div>
      </div>
    </div>
  );
}

export default Login;
