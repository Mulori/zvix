import { useState } from "react";
import "./styles.css";
import logo from "../../../img/zvix-logo-color.svg";
import {Navigate, useNavigate, Link} from 'react-router-dom';
import IsAuthenticated from "../../../libs/Auth";
import api from "../../../controller/api";
import md5 from 'md5';

//React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navegacao = useNavigate();

  StyleBody();

  if(IsAuthenticated()){
    return(
      <Navigate to="/" replace={true} />
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (email.length <= 0) {
      notifyErro('O e-mail é um campo obrigatório.')
      return;
    }

    if (password.length < 6) {
      notifyErro('A senha deve conter no minimo 6 caracteres.')
      return;
    }

    let json = {
      email: email.trim(),
      senha: password.trim()
    }
    
    api.post("/campanha/registra/acesso", json)
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        notifyErro(err.response.data)
        return;
      });
  }

  function StyleBody(){
    document.body.style = 'background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12); background-repeat: no-repeat; background-size: cover; background-attachment:fixed;';
    document.title = 'ZVIX | Login';
  }

  const notifyErro = (e) => {
      toast.error(e, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
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
                <div className="form-group mt-4">
                  <label id="title-form-login" style={{color: 'white', fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '25px'}}>
                    Acesso ao Painel
                  </label>
                  <input
                    type="text"
                    id="txtEmail"
                    name="email"
                    required={true}
                    className="form-control input-field"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
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
                <div className="row">
                  <div className="col-12 d-flex justify-content-center mt-3 w-100">
                    <label className="form-label text-light">Ainda não tem conta? <Link to="/registre" className="btn-registrar-conta">Clique Aqui</Link></label>
                  </div>
                </div>
              </form>
            </div>
            <div className="footer mx-auto p-1 text-light d-flex justify-content-center" style={{color: '#6c7489'}}>
                <div className="col-12 d-flex justify-content-center mt-3 w-100">
                  <label className="form-label text-light">© 2023 zvix.com.br - Powered by: <a href="http://mgtech.com.br" className="link-site-hashtag">@murilogarcia23</a></label>
                </div>
            </div>
          </div>
          <div className="col d-none d-md-block col-right "></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
