//importa o css
import './Entrar.css';
//usa-se useEffect no lugar
import { useState } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//const que contem o endereco da tabela que queremos acessar
const urlAPI = "https://localhost:7042/api/conta";


//inicializa o estado, todos valores começam "vazios" 
//variavel com dados do contaExistente, e variavel lista onde está o data
const initialState = {
  contaExistente: { email: '', senha: '' },
  lista: []

}
//feita por função, utiliza useEffect ao invés de componentDidMount 
export default function Entrar(props) {
  //useState, variável  e setter da variável???
  const [contaExistente, setContaExistente] = useState(initialState.contaExistente)
  
  //função para atualizar novo cadastro
  function atualizarConta(event) {
    //.target acionou um evento , assim conseguimos recuperar a propriedade/atributo
    const { name, value } = event.target
    //printa nome e value
    console.log(name, value)
    //atualiza novo cadastro
    setContaExistente({
      ...contaExistente,
      [name]: value
    })
    //printa contaExistente
    console.log(contaExistente)
  }
  //retorna JSX
  return (
    <div className="content">
      <main className="mainEntrar">
        <div class="container">
          <div class="title">Entrar</div>
          <form action="#">
            <div class="user-details">
              <div class="input-box">
                <span class="details">Email:</span>
                {/* value recebe o email do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando a contaExistente*/}
                <input type="text" maxLength="40" name="email" value={contaExistente.email}  onChange={atualizarConta} id="email" placeholder="Insira seu Email" required />
              </div>
              <div class="input-box">
                <span class="details">Senha:</span>
                {/* value recebe a senha do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando a contaExistente*/}
                <input type="password" maxLength="20" name="senha" value={contaExistente.senha} onChange={atualizarConta} id="senha" placeholder="Insira sua Senha" required />
              </div>
            </div>
            {/* botão for clicado onClick será acionado e irá enviar o formulário */}
            <div class="botao">
              <a className="btnEntrar" href="/conta" >
                Entrar
              </a>
            </div>
          </form>

        </div>
      </main>
    </div>
  )
}