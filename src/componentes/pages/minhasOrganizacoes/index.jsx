import { Modal } from "react-bootstrap";
import { useEffect, useState } from 'react';
import api from "../../../controller/api";
import FormataDataHora from "../../../libs/FormataDataHora";
import logo from '../../../img/zvix-logo-color.svg'
import './styles.css';

//React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MinhaOrganizacao(){
    const [listaOrganizacao, setListaOrganizacao] = useState(null);
    const [listControle, setListaControle] = useState(null);

    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState(null);

    //Modal Altera Senha
    const [showModalCriaOrganizacao, setShowModalCriaOrganizacao] = useState();
    const handleCloseModalCriaOrganizacao = () => setShowModalCriaOrganizacao(false);
    const handleShowModalCriaOrganizacao = () => setShowModalCriaOrganizacao(true);

    useEffect(() => {
        ListarMinhasOrganizacoes();
        //ListarControles();
    }, [])

    function handleSubmitNovaOrganizacao(e){
        e.preventDefault();

        const token = localStorage.getItem('zvix_token');
        const codigo_conta = localStorage.getItem('zvix_codigo');

        let json = {
            conta_codigo: parseInt(codigo_conta),
            nome: nome.trim(),
            codigo_tipo_controle: 1
        }

        console.log(json)

        api.post('/api/v1/organizacao', json, { headers: { Authorization: 'Bearer '.concat(!token ? '' : token) } })
        .then((e) => {
            notifySucess(e.data);
            ListarMinhasOrganizacoes();
            handleCloseModalCriaOrganizacao();
        })
        .catch((e) => {
            notifyErro(e.response.data);
        })
    }

    function ListarMinhasOrganizacoes(){
        const token = localStorage.getItem('zvix_token');

        api.get('/api/v1/organizacao/conta/' + localStorage.getItem('zvix_codigo'), { headers: { Authorization: 'Bearer '.concat(!token ? '' : token) } })
        .then((e) => {
            setListaOrganizacao(e.data)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function ListarControles(){
        const token = localStorage.getItem('zvix_token');

        api.get('/api/v1/controle', { headers: { Authorization: 'Bearer '.concat(!token ? '' : token) } })
        .then((e) => {
            setListaControle(e.data)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function ConverteTipoControle(tipo){
        if(tipo === "Ticket"){
            return(
                <span>Ticket <i class="fa fa-ticket" style={{color: '#004d7a'}} aria-hidden="true"></i></span>
            )
        }
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

    const notifyInfo = (e) => {
        toast.info(e, {
            position: "top-right",
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
            <div className="card-header" id="label-title-page">
                <div className="row">
                    <div className="col-6 d-flex">
                        <label>Minhas Organizações</label>                    
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <button className="btn btn-primary btn-cria-organizacao" onClick={handleShowModalCriaOrganizacao}>
                            Nova Organização
                        </button>
                    </div>  
                </div>                              
            </div>
            <div className="card-body">
                {
                    listaOrganizacao ? null : 
                    <div className="alert alert-dark d-flex justify-content-center" role="alert">
                        <strong><i class="fa fa-frown-o" aria-hidden="true"></i> Você ainda não possui nenhuma organização.</strong>
                    </div>  
                }
                <div className="row">
                {
                    !listaOrganizacao ? null                                         
                    :                    
                    listaOrganizacao && listaOrganizacao.map(org =>
                        <div className="col-sm-3 my-3 px-2 container-card-organizacao" key={org.codigo}>
                            <div className="card card-organizacao" style={{minHeight: "100%"}} >
                                <div className="card-body">
                                    <div className="row w-100 d-flex">
                                        <div className="col-md-3 d-flex justify-content-center">
                                            <img src={logo} style={{ width: '100px', height: '100px' }} />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <h5 className="card-title">{org.nome}</h5>
                                            </div>
                                            <div className="row">
                                                <label className="card-text">{ConverteTipoControle("Ticket")}</label>
                                            </div>
                                            <div className="row">
                                                <label className="card-text">Criado em: {FormataDataHora(org.cadastrado)}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }  
                </div>
                
            </div>  
            <Modal show={showModalCriaOrganizacao} onHide={handleCloseModalCriaOrganizacao} centered className="modal center" animation={true}>
                <form method="POST" onSubmit={handleSubmitNovaOrganizacao}>
                    <Modal.Header closeButton>
                        <Modal.Title><i class="fa fa-file-text" aria-hidden="true"></i> Nova Organização</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <div className="row p-2">
                            <div className="form-group mb-3">
                                <label className="form-label">Nome da Organização {tipo}</label>
                                <input type="text" className="form-control form-input input-field" required={true} onChange={(e) => setNome(e.target.value)} placeholder="Informe o nome da organização" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Tipo da Organização</label>
                                <input type="text" className="form-control form-input input-field" required={true} value='Ticket' readOnly onChange={(e) => setTipo(e.target.value)} placeholder="Informe o nome da organização" />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" type="button" onClick={handleCloseModalCriaOrganizacao}><i class="fa fa-chevron-left" aria-hidden="true"></i> Voltar</button>
                        <button className="btn" style={{backgroundColor: '#004d7a', color: '#FFF'}} type="submit"><i class="fa fa-plus" aria-hidden="true"></i> Criar</button>
                    </Modal.Footer>
                </form>
            </Modal>
            <ToastContainer />
    </div>
    )
}

export default MinhaOrganizacao