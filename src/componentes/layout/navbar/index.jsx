import { Link, useNavigate, useLocation } from "react-router-dom"
import logo from '../../../img/zvix-logo-white.svg';
import './styles.css';

function NavBar() {
    var navigate = useNavigate();
    var location = useLocation();

    function Logout() {
        localStorage.clear();
        return navigate("/login");
    }

    if(location.pathname !== '/login' && location.pathname !== '/registre'){
        return (
            <div>
                <nav className="navbar navbar-expand-lg" id="nav-bar">
                    <div className="container-fluid">
                        <Link to="/"><img src={logo} id="img-logo-painel"/></Link>                        
                        <button
                            className="navbar-toggler bg-light"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon "></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link active text-light link-nav" aria-current="page" to="/"><i class="fa fa-home" aria-hidden="true"></i>{" "}Inicio</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <ul
                                        className="nav-link dropdown-toggle text-light link-nav"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fa fa-wrench" aria-hidden="true"></i>{" "}
                                        Ferramentas
                                    </ul>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item link-nav" to="/minhaOrganizacao">
                                                Minha Organizações
                                            </Link>
                                        </li>
                                        <li className="dropdown-divider"></li>
                                        <li>
                                            <Link className="dropdown-item link-nav" to="/colaboracoes">
                                                Colaborações
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle text-light link-nav"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fa fa-user" aria-hidden="true"></i> Minha Conta
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item link-nav" to="/perfil" id="btn-meu-perfil">
                                                Meu Perfil
                                            </Link>
                                        </li>
                                        <li className="dropdown-divider"></li>
                                        <li>
                                            <a className="dropdown-item " href="#" onClick={Logout}>
                                                Desconectar
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
    
}

export default NavBar