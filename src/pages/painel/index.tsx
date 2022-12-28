import React from "react";
import "./styles.css";

function Painel(){

    function Logout(){
        window.location.href = "../../App";
        localStorage.clear();
    }

    return(
    <div className="wrapper">
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Zvix</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Minha Conta
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Meu Perfil</a></li>
                        <li className="dropdown-divider"></li>
                        <li><a className="dropdown-item" href="#" onClick={Logout}>Desconectar</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        <div id="content" className="bg-danger">

        </div>
    </div>
    )
}

export default Painel