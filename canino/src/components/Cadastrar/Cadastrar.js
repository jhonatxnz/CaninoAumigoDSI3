//importa o css
import './Cadastrar.css';
//usa-se useEffect no lugar
import { useState } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//const que contem o endereco da tabela que queremos acessar
const urlAPI = "https://localhost:7042/api/conta";

//inicializa o estado, todos valores começam "vazios" 
//variavel com dados do novoCadastro, e variavel lista onde está o data
const initialState = {
  novoCadastro: { senha:'', cpf: 0, nome: '', telefone: 0, email: '', endereco: '', idade: 0, idCidade: 0 },
  lista: []
}
//feita por função, utiliza useEffect ao invés de componentDidMount 
export default function Cadastrar(props) {
  //useState, variável  e setter da variável???
  const [novoCadastro, setNovoCadastro] = useState(initialState.novoCadastro)

  //função para atualizar novo cadastro
  function atulizarNovoCadastro(event) {
    //.target acionou um evento , assim conseguimos recuperar a propriedade/atributo
    const { name, value } = event.target
    //printa nome e value
    console.log(name, value)
    //atualiza novo cadastro
    setNovoCadastro({
      ...novoCadastro,
      [name]: value
    })
    //printa novoCadastro
    console.log(novoCadastro)
  }
  function adicionarImagem(event) {
    //.target acionou um evento , assim conseguimos recuperar a propriedade/atributo
    const { files } = event.target
    //printa tamanho da primeira imagem
    console.log(files[0].size)

    //se o tamanho da imagem for < que 50kb
    if (files[0].size <= 500000) {
      //nova instancia de leitor de arquivo
      const reader = new FileReader()

      //lê primeira imagem como códigos 
      reader.readAsDataURL(files[0])
      
      //carrega arquivo
      reader.onload = () => {
        //const imagem recebe resulatado dos dados do que o reader leu
        const imagem = reader.result
  
        //atualiza NovoCadastro agora com a imagem
        setNovoCadastro({ 
          ...novoCadastro, 
          imagem,
        })
      }
    }
    //se nao
    else
    {
      //alertamos o usuário que a imagem é muito grande
      alert('Imagem muito grande! A imagem deve ter 50kb ou menos.')
    }
  }
  //função que envia o formulário/os dados para o BD
  function enviarFormulario(event) {

    event.preventDefault();
    //converte pra número só para ter certeza que não vai conflitar com o BD ou o .net
    novoCadastro.idade = Number(novoCadastro.idade)
    //converte pra número só para ter certeza que não vai conflitar com o BD ou o .net
    novoCadastro.idCidade = Number(novoCadastro.idCidade)

    //printa novoCadastro
    console.log(novoCadastro)

    //axios faz requisiçõa de post com o novo cadastro
    axios.post('https://localhost:7042/api/conta', novoCadastro)

  }
  //retorna JSX
  return (
    <div className="content">
      <main className="mainCadastrar">
        <div className="form">

          <div className="headerCadastrar">
            {/* envia formulário */}
            <form className="incluir-container" onSubmit={enviarFormulario}>

              <h1 className='label-cadastro'>Cadastre-se</h1>

              <div className='input-group'>
                <div className="input-box">
                  <label>CPF:</label>
                  {/* value recebe o cpf do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
                  <input type="text" maxLength="11" name="cpf" value={novoCadastro.cpf} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite seu CPF' />
                </div>

                <div className="input-box">
                  <label>Nome:</label>
                  {/* value recebe o nome do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
                  <input type="text" maxLength="30" name="nome" value={novoCadastro.nome} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite seu Nome' />
                </div>

                <div className="input-box">
                  <label>Telefone:</label>
                  {/* value recebe o telefone do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
                  <input type="tel" maxLength="11" name="telefone" value={novoCadastro.telefone} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='(xx) xxxxx-xxxx' />
                </div>

                <div className="input-box">
                  <label>Email:</label>
                  {/* value recebe o email do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
                  <input type="text" maxLength="40" name="email" value={novoCadastro.email} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite seu Email' />
                </div>

                <div className="input-box">
                  <label>Endereço:</label>
                  {/* value recebe o endereco do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
                  <input type="text" maxLength="100" name="endereco" value={novoCadastro.endereco} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite seu Endereço' />
                </div>

                <div className="input-box">
                  <label>Cidade:</label>
                  {/* value recebe o endereco do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
                  {/* daria para pegar cidade do banco mas rolê */}
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
                  {/* value recebe o idade do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
                  <input type="number" min="18" max="130" name="idade" value={novoCadastro.idade} onChange={atulizarNovoCadastro} className="input-cadastrar" />
                </div>

                <div className="input-box">
                  <label>Senha:</label>
                  {/* value recebe o senha do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
                  <input type="password" maxLength="20" name="senha" value={novoCadastro.senha} onChange={atulizarNovoCadastro} className="input-cadastrar" placeholder='Digite sua senha' />
                </div>
                {/* value recebe o senha do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado adicionarImagem*/}
                <input type="file" name="imagem" className="input-imagem" accept="image/*" onChange={adicionarImagem}  hidden ></input>
                
                <div className='oBotao'>
                  {/* botão for clicado onClick será acionado e irá enviar o formulário */}
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