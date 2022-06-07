import { useState } from 'react';
import './Doar.css';
import axios from 'axios';
const urlAPI = "http://localhost:5271/api/animal";
/////////////here

const tam = {
  width: '100%',

};
const initialState = {
  novaDoacao: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: ''},
  lista: []
}

export default function Doar(props) {

  const [novaDoacao, setNovaDoacao] = useState(initialState.novaDoacao)

  function atulizarNovaDoacao(event) {
    const { name, value } = event.target

    console.log(name, value)

    setNovaDoacao({
      ...novaDoacao,
      [name]: value
    })

    console.log(novaDoacao)
  }

  function adicionarImagem(event) {
    const { files } = event.target

    console.log(files[0].size)

    if (files[0].size <= 50000) {
      const reader = new FileReader()

      reader.readAsDataURL(files[0])
  
      reader.onload = () => {
        const imagem = reader.result
  
        setNovaDoacao({ 
          ...novaDoacao, 
          imagem,
        })
      }
    }
    else
    {
      alert('Imagem muito grande! A imagem deve ter 50kb ou menos.')
    }
  }

  function enviarFormulario(event) {
    event.preventDefault();

    novaDoacao.idCidade = Number(novaDoacao.idCidade)
    novaDoacao.idPorte = Number(novaDoacao.idPorte)
    novaDoacao.idade = Number(novaDoacao.idade)

    console.log(novaDoacao)

    axios.post('https://localhost:7042/api/animal', novaDoacao)
      
    window.alert("Incluiu animal, ou era pra ter inserido ")

  }

  return (
    <div className="content">
      <main className="mainDoar">

        <h1>Doar um bichinho?</h1>
        <h2>Preencha o formulário!</h2>
        
        <div className="formulario">
          <form className="inclui-container" onSubmit={enviarFormulario}>
            <label>Nome:</label>
            <input type="text" name="nome" value={novaDoacao.nome} onChange={atulizarNovaDoacao} className="input-grande" />

            <label>Raça:</label>
            <input type="text" name="raca" value={novaDoacao.raca} onChange={atulizarNovaDoacao} className="input-pequeno" />

            <label>Cor:</label>
            <input type="text" name="cor" value={novaDoacao.cor} onChange={atulizarNovaDoacao} className="input-pequeno" />

            <label>Idade:</label>
            <input type="number" name="idade" value={novaDoacao.idade} onChange={atulizarNovaDoacao} className="input-pequeno" />

            <label>Descrição:</label>
            <input type="text" name="descricao" placeholder="Coloque a descrição do seu bichinho" value={novaDoacao.descricao} onChange={atulizarNovaDoacao} className="input-grande" />

            <label>Gênero:</label>
            <input type="text" name="genero" value={novaDoacao.genero} onChange={atulizarNovaDoacao} className="input-pequeno" />

            <label>Informações cruciais:</label>
            <input type="text" name="vacinacao" placeholder="Ex:vacinação" value={novaDoacao.vacinacao} onChange={atulizarNovaDoacao} className="input-grande" />

            <label>Porte:</label>
            <select name="idPorte" onChange={atulizarNovaDoacao} value={novaDoacao.idPorte} className="input-pequeno">
              <option value="1">Grande</option>
              <option value="2">Médio</option>
              <option value="3">Pequeno</option>
            </select>

            <label>Estado:</label>
            <select name="estado" className="input-pequeno">
              <option value="1">São Paulo</option>
            </select>

            <label>Cidade:</label>
            <select name="idCidade" onChange={atulizarNovaDoacao} value={novaDoacao.idCidade} className="input-pequeno">
              <option value="1">Sumare</option>
              <option value="2">Campinas</option>
            </select>

            <input type="file" name="imagem" className="input-imagem" accept="image/*" onChange={adicionarImagem}  hidden ></input>

            <button className="btnSalvar"
              onClick={e => enviarFormulario(e)} >
              Salvar
            </button>
          </form>
        </div>
        <div className="cartao">
                        <img src={novaDoacao.imagem} alt="gatinho" style={tam}></img>
                        <div id="container">
                            <a href="/gato">
                                <h2>
                                    {novaDoacao.nome}
                                </h2>
                            </a>

                            <p>
                                {novaDoacao.idCidade}
                            </p>
                        </div>
                    </div>
      </main>
    </div>

  )
}