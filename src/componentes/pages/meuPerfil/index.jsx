import React, {useEffect, useState} from 'react';
import './styles.css'
import api from '../../../controller/api';
import FormataDataHora from '../../../libs/FormataDataHora';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MeuPerfil() {
    //Informações da Conta
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [tipo, setTipo] = useState('');
    const [cadastrado, setCadastrado] = useState('');
    const [alterado, setAlterado] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    
    //Modal Altera Senha
    const [showModalAlteraSenha, setShowModalAlteraSenha] = useState();
    const handleCloseModalAlteraSenha = () => setShowModalAlteraSenha(false);
    const handleShowModalAlteraSenha = () => setShowModalAlteraSenha(true);

    useEffect(() => {
        GetConta();
    }, []) 

    function handleSubmitAlteraSenha(e){
        e.preventDefault();

        if(codigo === ''){
            return;
        }

        let objJson = {
            senhaAntiga: senhaAntiga.trim(),
            senhaNova: senhaNova.trim(),
            confirmacaoSenhaNova: confirmaSenha.trim()
        }

        api.put('/api/v1/conta/' + localStorage.getItem('zvix_codigo_usuario') + '/atualizarsenha', objJson, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('zvix_token')) } })
        .then((e) => {
            GetConta();
            notifySucess(e.data)
            setShowModalAlteraSenha(false);
        })
        .catch((e) => {
            console.log(e)
            notifyErro(e.response.data);
        })
    }

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

    function handleSubmitAlteraCadastro(e){
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
            GetConta();
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
        <div className="card-header" id="label-title-page">Meu Perfil #{codigo}</div>
            <div className="card-body">
                <form method='POST' onSubmit={handleSubmitAlteraCadastro} className="container">
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
                            value={tipo === '1' ? 'Administrador' : 'Padrão'}
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
                        <button type="button" className='btn btn-info w-100 input-field text-light' id='btn-altera-senha' onClick={handleShowModalAlteraSenha} >Alterar Senha</button>
                    </div>                
                </div>   
            </form>
        </div>   

        <Modal show={showModalAlteraSenha} onHide={handleCloseModalAlteraSenha} centered className="modal center" animation={false}>
            <form onSubmit={handleSubmitAlteraSenha} method="POST">
                <Modal.Header closeButton>
                    <Modal.Title>Alteração de Senha #{codigo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mb-3">
                        <label for="txt-senha-antiga" className='form-label'>Senha Antiga</label>
                        <input className="form-control input-field" type="password" id="txt-senha-antiga" name="senhaAntiga" placeholder='Informe a senha antiga' onChange={(e) => setSenhaAntiga(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label for="txt-senha-nova" className='form-label'>Senha Nova</label>
                        <input className="form-control input-field" type="password" id="txt-senha-nova" name="senhaNova" placeholder='Informe a nova senha' onChange={(e) => setSenhaNova(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label for="txt-confirma-senha" className='form-label'>Confirme a Senha</label>
                        <input className="form-control input-field" type="password" id="txt-confirma-senha" name="confirmaSenha" placeholder='Confirme a senha' onChange={(e) => setConfirmaSenha(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>                        
                    <Button className='btn btn-success' type='submit'>
                        Alterar Senha
                    </Button>
                    <Button className='btn btn-secondary' onClick={handleCloseModalAlteraSenha}>
                        Voltar
                    </Button>
                </Modal.Footer>
            </form>                
        </Modal>

        <ToastContainer />
    </div>
  );
}

export default MeuPerfil;
