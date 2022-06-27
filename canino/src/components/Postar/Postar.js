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
            <input type="text" maxLength="30" name="nome" value={novoProcurado.nome} onChange={atulizarnovoProcurado} className="input-grande" placeholder="Nome do animal" />
            <label>Telefone:</label>
            <input type="text" maxLength="30" name="telefone" value={novoProcurado.telefone} onChange={atulizarnovoProcurado} className="input-grande" placeholder="Somente números" />
            <label>Email:</label>
            <input type="email" maxLength="40" name="email" value={novoProcurado.email} onChange={atulizarnovoProcurado} className="input-grande" placeholder="Email principal" />
            <label>Estado:</label>
            <select name="estado" className="input-pequeno">
              <option value="1">São Paulo</option>
            </select>

            <label>Cidade:</label>
            <select name="idCidade" onChange={atulizarnovoProcurado} value={novoProcurado.idCidade} className="input-pequeno">
            <option value="1">Americana</option>
                    <option value="2">Artur Nogueira</option>
                    <option value="3">Campinas</option>
                    <option value="4">Cosmópolis</option>
                    <option value="5">Engenheiro Coelho</option>
                    <option value="6">Holambra</option>
                    <option value="7">Hortolândia</option>
                    <option value="8">Indaiatuba</option>
                    <option value="9">Itatiba</option>
                    <option value="10">Jaguariúna</option>
                    <option value="11">Monte Mor</option>
                    <option value="12">Morungaba</option>
                    <option value="13">Nova Odessa</option>
                    <option value="14">Paulínia</option>
                    <option value="15">Pedreira</option>
                    <option value="16">Santa Bárbara d'Oeste</option>
                    <option value="17">Santo Antônio de Posse</option>
                    <option value="18">Sumaré</option>
            </select>
            <label>Complemento:</label>
            
            <input type="text" maxLength="400" name="complemeto" placeholder="Ex:onde viu seu animal pela última vez" value={novoProcurado.complemeto} onChange={atulizarnovoProcurado} className="input-grande" />
            
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