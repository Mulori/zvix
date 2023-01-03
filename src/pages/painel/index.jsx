import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import api from "../../controller/api";
import MinhaConta from "./minhaConta";
import $ from 'jquery';

function Painel() {
  const [render, setRender] = useState(null)
  let navigate = useNavigate();

  useEffect(() => {
    StyleBody();
    VerificaToken();
  }, []);

  function VerificaToken() {
    const zvix_access_token = localStorage.getItem("zvix_token");

    api
      .get("/api/v1/ok", {
        headers: {
          authorization: "Bearer ".concat(
            zvix_access_token ? zvix_access_token : ""
          ),
        },
      })
      .then(() => {
        console.log("Autorizado");
      })
      .catch((erro) => {
        Logout();
      });
  }

  function Logout() {
    localStorage.clear();
    return navigate("/login");
  }

  function StyleBody() {
    document.body.style = "background: white;";
    document.title = "ZVIX | Painel";
  }

  function HandleMeuPerfil(){
    setRender(MinhaConta);
  }

  return (
    <div class="wrapper bg-panel">
      <nav class="navbar navbar-expand-lg nav-bar-color">
        <div class="container-fluid">
          <a class="navbar-brand text-light">
            Zvix
          </a>
          <button
            class="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon "></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active text-light"
                  aria-current="page"
                  href="#"
                >
                  <i class="fa fa-ticket" aria-hidden="true"></i> Tickets
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-light"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa fa-wrench" aria-hidden="true"></i>{" "}
                  Ferramentas
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item " href="#">
                      Usuários
                    </a>
                  </li>
                  <li class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item " href="#">
                      Empresas
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa fa-user" aria-hidden="true"></i> Minha Conta
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item " href="#" id="btn-meu-perfil" onClick={HandleMeuPerfil}>
                      Meu Perfil
                    </a>
                  </li>
                  <li class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item " href="#" onClick={Logout}>
                      Desconectar
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="content">
        {
          render
        }
      </div>
    </div>
  );
}

export default Painel;
