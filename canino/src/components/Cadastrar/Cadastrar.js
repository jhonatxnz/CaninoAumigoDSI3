import './Cadastrar.css';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/conta";

const initialState = {
  novoCadastro: { senha:'', cpf: 0, nome: '', telefone: 0, email: '', endereco: '', idade: 0, idCidade: 0 },
  lista: []
}
export default function Cadastrar(props) {
  const [novoCadastro, setNovoCadastro] = useState(initialState.novoCadastro)

  function atulizarNovoCadastro(event) {
    const { name, value } = event.target

    console.log(name, value)

    setNovoCadastro({
      ...novoCadastro,
      [name]: value
    })

    console.log(novoCadastro)
  }
  function adicionarImagem(event) {
    const { files } = event.target

    console.log(files[0].size)

    if (files[0].size <= 500000) {
      const reader = new FileReader()

      reader.readAsDataURL(files[0])
  
      reader.onload = () => {
        const imagem = reader.result
  
        setNovoCadastro({ 
          ...novoCadastro, 
          imagem,
        })
      }
    }
    else
    {
      alert('Imagem muito grande! A imagem deve ter 100kb ou menos.')
    }
  }
  function enviarFormulario(event) {
    event.preventDefault();
    novoCadastro.idade = Number(novoCadastro.idade)
    novoCadastro.idCidade = Number(novoCadastro.idCidade)

    console.log(novoCadastro)

    axios.post('https://localhost:7042/api/conta', novoCadastro)

  }
  return (
    <div className="content">
      <main className="mainCadastrar">
        <div className="form">

          <div className="headerCadastrar">

            <form className="incluir-container" onSubmit={enviarFormulario}>

              <h1 className='label-cadastro'>Cadastre-se</h1>

              <div className='input-group'>
                <div className="input-box">
                  <label>CPF:</label>
                  <input type="text" maxLength="11" name="cpf" value={novoCadastro.cpf} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite seu CPF' />
                </div>

                <div className="input-box">
                  <label>Nome:</label>
                  <input type="text" maxLength="30" name="nome" value={novoCadastro.nome} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite seu Nome' />
                </div>

                <div className="input-box">
                  <label>Telefone:</label>
                  <input type="tel" maxLength="11" name="telefone" value={novoCadastro.telefone} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='(xx) xxxxx-xxxx' />
                </div>

                <div className="input-box">
                  <label>Email:</label>
                  <input type="text" maxLength="40" name="email" value={novoCadastro.email} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite seu Email' />
                </div>

                <div className="input-box">
                  <label>Endereço:</label>
                  <input type="text" maxLength="100" name="endereco" value={novoCadastro.endereco} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite seu Endereço' />
                </div>

                <div className="input-box">
                  <label>Cidade:</label>
                  <select name="idCidade" onChange={atulizarNovoCadastro} value={novoCadastro.idCidade} className="input-cadastrar" placeholder='Selecione sua Cidade' >
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
                </div>

                <div className="input-box">
                  <label>Idade:</label>
                  <input type="number" min="0" max="130" name="idade" value={novoCadastro.idade} onChange={atulizarNovoCadastro} className="input-cadastrar" />
                </div>

                <div className="input-box">
                  <label>Senha:</label>
                  <input type="password" maxLength="20" name="senha" value={novoCadastro.senha} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite sua senha' />
                </div>
                <input type="file" name="imagem" className="input-imagem" accept="image/*" onChange={adicionarImagem}  hidden ></input>
                
                <div className='oBotao'>
                  <button className="btnSalvarC"
                    onClick={e => enviarFormulario(e)} >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </main>
    </div>
  )
}