import React, { useState } from "react";
import "./styles.css";
import logo from "../../../img/zvix-logo-color.svg";
import FormatarCNPJCNPJ from "../../../libs/FormataCPFCNPJ";
import { Navigate, useNavigate } from 'react-router-dom';
import IsAuthenticated from "../../../libs/Auth";
import api from "../../../controller/api";

//React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cadastre() {
    const [cpfcnpj, setCpfCnpj] = useState("");
    const [nomeOrganizacao, setNomeOrganizacao] = useState("");
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmeSenha, setConfirmeSenha] = useState("");
    const [tipo, settipo] = useState(1);

    const Navegacao = useNavigate();

    StyleBody();

    if (IsAuthenticated()) {
        return (
            <Navigate to="/" replace={true} />
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(nomeOrganizacao.length < 1){
            notifyErro('Informe o nome de sua organização.');
            return;
        }

        if(cpfcnpj.length < 1){
            notifyErro('Informe o CPF ou CNPJ.');
            return;
        }

        if(nomeCompleto.length < 1){
            notifyErro('Informe seu nome completo.');
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
            cpfCnpj: cpfcnpj,
            nomeOrganizacao: nomeOrganizacao.trim(),
            nomeCompleto: nomeCompleto.trim(),
            nomeUsuario: nomeUsuario.trim(),
            senha: senha.trim(),
            tipoConta: "1"
        }

        console.log(json)

        api.post('/api/v1/signup', json)
        .then((response) => {
          localStorage.setItem("zvix_codigo_usuario", response.data.codigo);
          localStorage.setItem("zvix_nome_usuario", response.data.nome_usuario);
          localStorage.setItem("zvix_tipo_usuario", response.data.type);
          localStorage.setItem("zvix_nome", response.data.nome);
          localStorage.setItem("zvix_documento", json.cpf_cnpj);
          localStorage.setItem("zvix_token", response.data.token);
          Navegacao("/");
        })
        .catch((err) => {
          notifyErro(err.response.data)
          return;
        });
    }


    function StyleBody() {
        document.body.style = 'background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);';
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
                                        id="txtNomeOrganizacao"
                                        name="NomeOrganizacao"
                                        className="form-control input-field"
                                        required={true}
                                        placeholder="Informe o nome de sua organização"
                                        maxLength={150}
                                        onChange={(e) => setNomeOrganizacao(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="text"
                                        id="txtdoc"
                                        name="doc"
                                        className="form-control input-field"
                                        required={true}
                                        aria-describedby="docHelp"
                                        placeholder="Informe o CPF/CNPJ de sua organização"
                                        maxLength={18}
                                        value={FormatarCNPJCNPJ(cpfcnpj)}
                                        onChange={(e) => setCpfCnpj(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="text"
                                        id="txtNomeCompleto"
                                        name="nomeCompleto"
                                        required={true}
                                        maxLength={200}
                                        className="form-control input-field"
                                        placeholder="Informe seu nome completo"
                                        onChange={(e) => setNomeCompleto(e.target.value)}
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
