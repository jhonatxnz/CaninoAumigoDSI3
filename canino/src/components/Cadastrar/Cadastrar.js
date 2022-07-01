import './Cadastrar.css';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/conta";

const initialState = {
  novoCadastro: { senha: '', cpf: 0, nome: '', telefone: '', email: '', endereco: '', idade: 0, idCidade: 0 },
  lista: []
}
export default function Cadastrar(props) {
  const [novoCadastro, setNovoCadastro] = useState(initialState.novoCadastro)

  function atualizarNovoCadastro(event) {
    const { name, value } = event.target

    console.log(name, value)

    setNovoCadastro({
      ...novoCadastro,
      [name]: value
    })

    console.log(novoCadastro)
  }

  function enviarFormulario(event) {
    event.preventDefault();

    novoCadastro.idCidade = Number(novoCadastro.idCidade)
    novoCadastro.cpf = Number(novoCadastro.cpf)
    novoCadastro.idade = Number(novoCadastro.idade)
    novoCadastro.telefone = Number(novoCadastro.telefone)

    console.log(novoCadastro)

    axios.post('https://localhost:7042/api/cadastro', novoCadastro)

  }
  return (
    <div className="content">
      <main className="mainCadastrar">
        <h1>Cadastro</h1>
        <div className="formulario">
          <form className="inclui-containerr" onSubmit={enviarFormulario}>
            <label>Nome:</label>
            <input type="text" name="nome" value={novoCadastro.nome} onChange={atualizarNovoCadastro} className="input-grande" />

            <label>Cpf:</label>
            <input type="text" name="cpf" value={novoCadastro.raca} onChange={atualizarNovoCadastro} className="input-pequeno" />

            <label>Telefone:</label>
            <input type="text" name="telefone" value={novoCadastro.cor} onChange={atualizarNovoCadastro} className="input-pequeno" />

            <label>Idade:</label>
            <input type="number" name="idade" value={novoCadastro.idade} onChange={atualizarNovoCadastro} className="input-pequeno" />

            <label>Endereço:</label>
            <input type="text" name="endereco" placeholder="Coloque a descrição do seu bichinho" value={novoCadastro.descricao} onChange={atualizarNovoCadastro} className="input-grande" />

            <label>Email:</label>
            <input type="text" name="email" value={novoCadastro.genero} onChange={atualizarNovoCadastro} className="input-pequeno" />

            <label>Estado:</label>
            <select name="estado" className="input-pequeno">
              <option value="1">São Paulo</option>
            </select>

            <label>Cidade:</label>
            <select name="idCidade" onChange={atualizarNovoCadastro} value={novoCadastro.idCidade} className="input-pequeno">
              <option value="1">Sumare</option>
              <option value="2">Campinas</option>
            </select>
            <label>Senha:</label>
            <input type="password" name="senha" value={novoCadastro.senha} onChange={atualizarNovoCadastro} className="input-pequeno" />

            <button className="btnCadastrar"
              onClick={e => enviarFormulario(e)} >
              Cadastrar
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}