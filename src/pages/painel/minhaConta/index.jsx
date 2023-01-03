import React, { useEffect, useState } from "react";
import './styles.css';
import api from "../../../controller/api";

function MinhaConta() { 
    GetConta();

  async function GetConta(){
    const zvix_token = localStorage.getItem('zvix_token');
    console.log(zvix_token)
    await api.get('/api/v1/conta/15', { headers: { Authorization: 'Bearer '.concat(zvix_token) } })
    .then((ret) => {
        console.log('certo')
        console.log(ret.data.nome)
    })
    .catch((e) => {
        console.log(e)
    })
  }

  return (
    <div class="content">
      <div class="card">
        <div class="card-header label-title-page">Minha Conta</div>
        <div class="card-body">
          <form class="row g-3">
            <div class="col-md-3">
              <label for="inputEmail4" class="form-label" placeholder="Nome Completo">
                Nome Completo
              </label>
              <input type="text" class="form-control" id="txt-nome-completo" />
            </div>
            <div class="col-md-3">
              <label for="inputPassword4" class="form-label">
                CPF/CNPJ
              </label>
              <input type="text" class="form-control" readOnly={true} id="txt-cpf-cnpj" />
            </div>
            <div class="col-md-3">
              <label for="inputAddress" class="form-label">
                Nome de Usuário
              </label>
              <input
                type="text"
                class="form-control"
                id="txt-nome-usuario"
                placeholder="Nome de Usuário"
              />
            </div>
            <div className="col-md-3">
                <label for="inputAddress" class="form-label">
                Tipo de Conta
                </label>
                <select class="form-select" aria-label=".form-select example">
                    <option selected>Selecione o tipo de conta</option>
                    <option value="1">Administrador</option>
                </select>
            </div>
            <div class="col-md-3">
              <label for="inputAddress" class="form-label">
                Data da Criação
              </label>
              <input
                type="text"
                class="form-control"
                id="txt-criado"
                placeholder="Data da criação"
              />
            </div>
            <div className="col-md-3">
                <label for="inputAddress" class="form-label">
                Data da Alteração
                </label>
                <input
                type="text"
                class="form-control"
                id="txt-alterado"
                placeholder="Data da alteração"
              />
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MinhaConta;
