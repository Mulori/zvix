import React, {useEffect, useState} from 'react';
import './styles.css'
import api from '../../../controller/api';
import FormataDataHora from '../../../libs/FormataDataHora';

//React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MeuPerfil() {
    const [data, setData] = useState(null);
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [tipo, setTipo] = useState('');
    const [cadastrado, setCadastrado] = useState('');
    const [alterado, setAlterado] = useState('');

    useEffect(() => {
        GetConta();
    }, [])

    async function GetConta(){        
        await api.get('/api/v1/conta/' + localStorage.getItem('zvix_codigo_usuario') + '', { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('zvix_token')) } })
        .then((ret) => {
            setCodigo(ret.data.codigo);
            setNome(ret.data.nome);
            setNomeUsuario(ret.data.nome_usuario);
            setTipo(ret.data.type);
            setCadastrado(ret.data.cadastrado);
            setAlterado(ret.data.alterado);
        })
        .catch((e) => {
            console.log(e)
        })
    }

    function handleSubmit(e){
        e.preventDefault();

        if(codigo === ''){
            return;
        }

        let objJson = {
            nomeCompleto: nome.trim(),
            nomeUsuario: nomeUsuario.trim()
        }

        api.put('/api/v1/conta/' + localStorage.getItem('zvix_codigo_usuario') + '/atualizarinformacao', objJson, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('zvix_token')) } })
        .then((e) => {
            notifySucess(e.data)
        })
        .catch((e) => {
            console.log(e)
            notifyErro(e.response.data);
        })
    }

    const notifySucess = (e) => {
        toast.success(e, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })  
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
    <div className="card card-background my-auto w-100">
        <div className="card-header" id="label-title-page">Minha Conta #{codigo}</div>
            <div className="card-body">
                <form method='POST' onSubmit={handleSubmit} className="container">
                <div className="row">
                    <div className="col-md-7 form-group mb-3">
                        <label
                            for="inputEmail4"
                            className="form-label"
                            placeholder="Nome Completo"
                        >
                            Nome Completo
                        </label>
                        <input type="text" className="form-control input-field" value={nome} maxLength={200} onChange={(e) => setNome(e.target.value)} id="txt-nome-completo" />
                    </div>
                    <div className="col-md-2 form-group mb-3">
                        <label for="inputAddress" className="form-label">
                            Nome de Usuário
                        </label>
                        <input
                            type="text"
                            className="form-control input-field"
                            id="txt-nome-usuario"
                            value={nomeUsuario}
                            onChange={(e) => setNomeUsuario(e.target.value)}
                            maxLength={50}
                            placeholder="Nome de Usuário"
                        />
                    </div>  
                    <div className="col-md-3 form-group mb-3">
                        <label for="inputAddress" className="form-label">
                        Tipo de Conta
                        </label>
                        <input
                            type="text"
                            className="form-control input-field"
                            id="txt-nome-usuario"
                            readOnly={true}
                            value={tipo == '1' ? 'Administrador' : 'Padrão'}
                            placeholder="Tipo de Conta"
                        />
                    </div>              
                </div>
                <div className="row">
                    <div className="col-md-3 form-group mb-3">
                        <label for="inputAddress" className="form-label">
                            Data da Criação
                        </label>
                        <input
                            type="text"
                            className="form-control input-field"
                            id="txt-criado"
                            readOnly={true}
                            value={FormataDataHora(cadastrado)}
                            onChange={(e) => setCadastrado(e.target.value)}
                            placeholder="Data da criação"
                        />
                    </div>
                    <div className="col-md-3 form-group mb-3">
                        <label for="inputAddress" className="form-label">
                            Data da Alteração
                        </label>
                        <input
                            type="text"
                            className="form-control input-field"
                            id="txt-alterado"
                            readOnly={true}
                            value={FormataDataHora(alterado)}
                            onChange={(e) => setAlterado(e.target.value)}
                            placeholder="Data da alteração"
                        />
                    </div>
                </div>   
                <div className="row">
                    <div className="col-md-2 form-group mb-3">
                        <button type='submit' className='btn btn-success w-100 input-field'>Salvar Alterações</button>
                    </div>
                    <div className="col-md-2 form-group mb-3">
                        <button className='btn btn-info w-100 input-field text-light' id='btn-altera-senha' onClick={() => notifySucess('Deu certo')}>Alterar Senha</button>
                    </div>                
                </div>   
            </form>
        </div>
        <ToastContainer />
    </div>
  );
}

export default MeuPerfil;
