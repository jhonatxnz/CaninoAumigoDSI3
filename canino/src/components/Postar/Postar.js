import { useState } from 'react';
import './Postar.css';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/animalperdido";

const initialState = {
  novoProcurado: { nome: '', telefone:'', email: '', complemeto: '', imagem: '', idCidade: 0 },
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
  function adicionarImagem(event) {
    const { files } = event.target

    console.log(files[0].size)

   if (files[0].size <= 500000) {
      const reader = new FileReader()

      reader.readAsDataURL(files[0])

      reader.onload = () => {
        const imagem = reader.result

        setnovoProcurado({
          ...novoProcurado,
          imagem,
        })
      }
    }
    else {
      alert('Imagem muito grande! A imagem deve ter 100kb ou menos.')
    }
  }

  function enviarFormulario(event) {
    event.preventDefault();

    novoProcurado.idCidade = Number(novoProcurado.idCidade)

    console.log(novoProcurado)

    axios.post('https://localhost:7042/api/animalperdido', novoProcurado)

    window.alert("Incluiu animal perdido, ou era pra ter inserido ")

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
            <label>Telefone:</label>
            <input type="text" name="telefone" value={novoProcurado.telefone} onChange={atulizarnovoProcurado} className="input-grande" placeholder="(XX)XXXXX-XXXX" />
            <label>Email:</label>
            <input type="email" name="email" value={novoProcurado.email} onChange={atulizarnovoProcurado} className="input-grande" placeholder="Email principal" />
            <label>Estado:</label>
            <select name="estado" className="input-pequeno">
              <option value="1">São Paulo</option>
            </select>

            <label>Cidade:</label>
            <select name="idCidade" onChange={atulizarnovoProcurado} value={novoProcurado.idCidade} className="input-pequeno">
              <option value="1">Sumare</option>
              <option value="2">Campinas</option>
            </select>
            <label>Complemeto:</label>
            
            <input type="text" name="complemento" placeholder="Ex:onde viu seu animal pela última vez" value={novoProcurado.complemento} onChange={atulizarnovoProcurado} className="input-grande" />
            
            <input type="file" name="imagem" className="input-imagem" accept="image/*" onChange={adicionarImagem} hidden ></input>

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