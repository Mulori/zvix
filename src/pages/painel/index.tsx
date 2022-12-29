import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";    

function Painel(){
    let navigate = useNavigate();
    
    function Logout(){
        localStorage.clear();
        return navigate("/login");      
    }

    return(
    <div className="wrapper">
        <nav className="navbar navbar-expand-lg nav-bar-color">
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="#">Zvix</a>
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active text-light" aria-current="page" href="#"><i className="fa fa-home" aria-hidden="true"></i> Inicio</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active text-light" aria-current="page" href="#"><i className="fa fa-ticket" aria-hidden="true"></i> Tickets</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-wrench" aria-hidden="true"></i> Ferramentas
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item " href="#">Usuários</a></li>
                        <li className="dropdown-divider"></li>
                        <li><a className="dropdown-item " href="#">Empresas</a></li>
                    </ul>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-user" aria-hidden="true"></i> Minha Conta
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item " href="#">Meu Perfil</a></li>
                        <li className="dropdown-divider"></li>
                        <li><a className="dropdown-item " href="#" onClick={Logout}>Desconectar</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        <div id="content" className="bg-light" >
            
        </div>
    </div>
    )
}

export default Painel