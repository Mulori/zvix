import React, {useEffect, useState} from 'react';
import './styles.css'
import api from '../../../controller/api';
import FormataCPFCNPJ from '../../../libs/FormataCPFCNPJ';
import FormataDataHora from '../../../libs/FormataDataHora';

function MeuPerfil() {
    const [data, setData] = useState(null);
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [cnpfCnpj, setCpfCnpj] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [tipo, setTipo] = useState('');
    const [cadastrado, setCadastrado] = useState('');
    const [alterado, setAlterado] = useState('');

    useEffect(() => {
        GetConta();
    }, [])

    async function GetConta(){
        const zvix_token = localStorage.getItem('zvix_token');
        console.log(zvix_token)
        await api.get('/api/v1/conta/15', { headers: { Authorization: 'Bearer '.concat(zvix_token) } })
        .then((ret) => {
            setCodigo(ret.data.codigo);
            setNome(ret.data.nome);
            setCpfCnpj(ret.data.cpf_cnpj);
            setNomeUsuario(ret.data.nome_usuario);
            setTipo(ret.data.type);
            setCadastrado(ret.data.cadastrado);
            setAlterado(ret.data.alterado);
        })
        .catch((e) => {
            console.log(e)
        })
    }

  return (
      <div className="card card-background my-auto w-100">
        <div className="card-header" id="label-title-page">Minha Conta #{codigo}</div>
        <div className="card-body">
          <form className="container">
            <div className="row">
                <div className="col-md-5 form-group mb-3">
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
                    <label for="inputPassword4" className="form-label">
                        CPF/CNPJ
                    </label>
                    <input
                        type="text"
                        className="form-control input-field"
                        readOnly={true}
                        value={FormataCPFCNPJ(cnpfCnpj)}
                        onChange={(e) => setCpfCnpj(e.target.value)}
                        id="txt-cpf-cnpj"
                    /> 
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
                    <select className="form-select input-field" aria-label=".form-select example" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option selected >Selecione o tipo de conta</option>
                        <option value="1">Administrador</option>
                        <option value="2">Padrão</option>
                    </select> 
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
                    <button className='btn btn-success w-100 input-field'>Salvar Alterações</button>
                </div>
                <div className="col-md-2 form-group mb-3">
                    <button className='btn btn-info w-100 input-field text-light'>Alterar Senha</button>
                </div>                
            </div>   
          </form>
        </div>
      </div>
  );
}

export default MeuPerfil;
