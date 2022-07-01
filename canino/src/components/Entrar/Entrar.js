import './Entrar.css';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/conta";

const initialState = {
  novoLogin: { senha:'', email: ''},
  lista: []
}
export default function Cadastrar(props) {
  const [novoLogin, setNovoLogin] = useState(initialState.novoLogin)

  function atualizarNovoLogin(event) {
    const { name, value } = event.target

    console.log(name, value)

    setNovoLogin({
      ...novoLogin,
      [name]: value
    })

    console.log(novoLogin)
  }

  function logar(event) {
    event.preventDefault();

    console.log(novoLogin)

    axios.post('https://localhost:7042/api/cadastro', novoLogin)

  }
  return (
    <div className="content">
      <main className="mainEntrar">
        <h1>Login</h1>
        <div className="formulario">
          <form className="inclui-containerrr" onSubmit={logar}>
            <label>Email:</label>
            <input type="text" name="email" value={novoLogin.nome} onChange={atualizarNovoLogin} className="input-grandee" />

            <label>Senha:</label>
            <input type="password" name="senha" value={novoLogin.raca} onChange={atualizarNovoLogin} className="input-pequenoo" />

            <button className="btnEntrar"
              onClick={e => logar(e)} >
              Entrar
            </button>
          </form>
        </div>
        
      </main>
    </div>
  )
}
