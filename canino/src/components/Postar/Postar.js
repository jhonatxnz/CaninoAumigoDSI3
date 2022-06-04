import './Postar.css';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/animal";

const initialState = {
  novoProcurado: { nome: '', email: '', complemento: '', imagem: '', idCidade: 0 },
  lista: []
}

export default function Postar(props) {

  const [novoProcurado, setnovoProcurado] = useState(initialState.novoProcurado)

  function atulizarnovoProcurado(event) {
    const { name, value } = event.target

    console.log(name, value)

    setnovoProcurado({
      ...novoProcurado,
      [name]: value
    })

    console.log(novoProcurado)
  }

  function enviarFormulario(event) {
    event.preventDefault();

    novoProcurado.idCidade = Number(novoProcurado.idCidade)

    console.log(novoProcurado)

    axios.post('https://localhost:7042/api/animal', novoProcurado)

    window.alert("Incluiu animal, ou era pra ter inserido ")

  }

  return (
    <div className="content">
      <main className="mainPostar">

        <h1>Perdeu seu bichinho?</h1>
        <h2>Preencha o formulário!</h2>

        <div className="formulario">
          <form className="inclui-container" onSubmit={enviarFormulario}>
            <label>Nome:</label>
            <input type="text" name="nome" value={novoProcurado.nome} onChange={atulizarnovoProcurado} className="input-grande" placeholder="Nome do animal" />

            <label>Email:</label>
            <input type="text" name="email" value={novoProcurado.email} onChange={atulizarnovoProcurado} className="input-pequeno" placeholder="Email principal" />

            <label>Telefone:</label>
            <input type="text" name="telefone" value={novoProcurado.telefone} onChange={atulizarnovoProcurado} className="input-pequeno" placeholder="(XX)XXXXX-XXXX" />

            

            <label>Cidade:</label>
            <select name="idCidade" onChange={novoProcurado} value={novoProcurado.idCidade} className="input-pequeno">
              <option value="1">Sumare</option>
              <option value="2">Campinas</option>
            </select>


            <label>Complemento:</label>
            <input type="text" name="complemento" placeholder="Onde viu o animal pela ultima vez" value={novoProcurado.descricao} onChange={atulizarnovoProcurado} className="input-grande" />


            <input type="file" className="input-imagem" accept="image/*" ></input>

            <button className="btnSalvar"
              onClick={e => enviarFormulario(e)} >
              Salvar
            </button>
          </form>
        </div>
      </main>
    </div>

  )
}