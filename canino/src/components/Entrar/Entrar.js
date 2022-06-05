import './Entrar.css';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/conta";
const initialState = {
  contaExistente: { email: '', senha: '' },
  lista: []

}
export default function Entrar(props) {
  const [contaExistente, setContaExistente] = useState(initialState.contaExistente)
  return (
    <div className="content">
      <main className="mainEntrar">
        <div class="container">
          <div class="title">Entrar na Minha Conta</div>
          <form action="#">
            <div class="user-details">
              <div class="input-box">
                <span class="details">Email:</span>
                <input type="text" value={contaExistente.email} id="email" placeholder="Insira seu Email" required />
              </div>
              <div class="input-box">
                <span class="details">Senha:</span>
                <input type="text" value={contaExistente.senha} id="senha" placeholder="Insira sua Senha" required />
              </div>
            </div>

            <div class="botao">
              <button className="btnEntrar" >
                Entrar
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  )
}