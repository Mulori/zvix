import React, { useState } from "react";
import "./styles.css";
import logo from "../../../img/zvix-logo-color.svg";
import { Navigate, useNavigate } from 'react-router-dom';
import IsAuthenticated from "../../../libs/Auth";
import api from "../../../controller/api";

//React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cadastre() {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmeSenha, setConfirmeSenha] = useState("");

    const Navegacao = useNavigate();

    StyleBody();

    if (IsAuthenticated()) {
        return (
            <Navigate to="/" replace={true} />
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(nome.length < 1){
            notifyErro('O campo nome é obrigatório.');
            return;
        }

        if(sobrenome.length < 1){
            notifyErro('O campo sobrenome é obrigatório.');
            return;
        }

        if(email.length < 1){
            notifyErro('O campo e-mail é obrigatório.');
            return;
        }

        if(nomeUsuario.length < 1){
            notifyErro('Informe seu nome de usuário.');
            return;
        }

        if(nomeUsuario.length < 1){
            notifyErro('Informe seu nome de usuário.');
            return;
        }

        if(senha.length < 1){
            notifyErro('Informe uma senha.');
            return;
        }

        if(confirmeSenha.length < 1){
            notifyErro('Confirme a senha.');
            return;
        }

        if(senha !== confirmeSenha){
            notifyErro('As senhas não coincidem.');
            return;
        }

        let json = {
            nome: nome.trim(),
            sobrenome: sobrenome.trim(),
            email: email.trim(),
            nomeUsuario: nomeUsuario.trim(),
            senha: senha.trim(),
        }

        api.post('/api/v1/signup', json)
        .then((response) => {
          localStorage.setItem("zvix_codigo", response.data.codigo);
          localStorage.setItem("zvix_nome", json.nome.trim());
          localStorage.setItem("zvix_sobrenome", json.sobrenome.trim());
          localStorage.setItem("zvix_nome_usuario", json.nomeUsuario.trim());
          localStorage.setItem("zvix_email", json.email.trim());
          localStorage.setItem("zvix_token", response.data.token);
          Navegacao("/");
        })
        .catch((err) => {
          notifyErro(err.response.data)
          return;
        });
    }


    function StyleBody() {
        document.body.style = 'background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12); background-repeat: no-repeat; background-size: cover; background-attachment:fixed;';
        document.title = 'ZVIX | Registre-se';
    }

    const notifyErro = (e) => {
        toast.error(e, {
            position: "top-center",
            autoClose: 3000,
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
                        <div className="container-form mx-auto w-100 p-5">
                            <form onSubmit={handleSubmit} method="POST">
                                <label id="title-form-login" style={{color: 'white', fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '25px'}}>
                                    Registre-se
                                </label>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="txtNome"
                                        name="nome"
                                        className="form-control input-field"
                                        required={true}
                                        placeholder="Seu nome"
                                        maxLength={80}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="text"
                                        id="txtSobrenome"
                                        name="sobrenome"
                                        className="form-control input-field"
                                        required={true}
                                        placeholder="Seu sobrenome"
                                        maxLength={80}
                                        onChange={(e) => setSobrenome(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="email"
                                        id="txtEmail"
                                        name="email"
                                        required={true}
                                        maxLength={200}
                                        className="form-control input-field"
                                        placeholder="Seu melhor e-mail"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="text"
                                        id="txtNomeUsuario"
                                        name="nomeUsuario"
                                        required={true}
                                        maxLength={50}
                                        className="form-control input-field"
                                        placeholder="Informe um nome de usuário"
                                        onChange={(e) => setNomeUsuario(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="password"
                                        id="txtSenha"
                                        name="senha"
                                        required={true}
                                        maxLength={15}
                                        className="form-control input-field"
                                        placeholder="Informe uma senha forte"
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="password"
                                        id="txtConfirmeSenha"
                                        name="confirmeSenha"
                                        required={true}
                                        maxLength={15}
                                        className="form-control input-field"
                                        placeholder="Confirme a senha informada acima"
                                        onChange={(e) => setConfirmeSenha(e.target.value)}
                                    />
                                </div>
                                <div className="row h-100">
                                    <div className="col w-100 mt-3">
                                        <button
                                            className="btn w-100 btn-login"
                                            type="submit"
                                        >
                                            Registrar-se
                                        </button>
                                    </div>
                                    <div className="col w-100 mt-3">
                                        <button
                                            className="btn w-100 btn-login"
                                            type="submit"
                                            onClick={() => {Navegacao(-1)}}
                                        >
                                            Já possuo uma conta
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="footer mx-auto p-1 text-light" style={{ color: '#6c7489' }}>
                            © 2023 zvix.com.br - Powered by:{" "}
                            <a href="http://mgtech.com.br">
                                <strong id="link-powered" className="text-light" style={{ color: '#6c7489' }}>
                                    @murilogarcia23
                                </strong>
                            </a>
                        </div>
                    </div>
                    <div className="col d-none d-md-block col-right "></div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Cadastre;
