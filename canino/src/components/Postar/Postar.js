//importa o css
import './Postar.css';
//usa-se useEffect no lugar
import { useState } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//const que contem o endereco da tabela que queremos acessar
const urlAPI = "https://localhost:7042/api/animalperdido";

//inicializa o estado, todos valores começam "vazios" 
//variavel com dados do novoProcurado, e variavel lista onde está o data
const initialState = {
  novoProcurado: { nome: '', telefone: '', email: '', complemeto: '', imagem: '', idCidade: 0 },
  lista: []
}

//feita por função, utiliza useEffect ao invés de componentDidMount 
export default function Postar(props) {
  //useState, variável  e setter da variável???
  const [novoProcurado, setnovoProcurado] = useState(initialState.novoProcurado)

  //função para atualizar novoProcurado
  function atulizarnovoProcurado(event) {
    //.target acionou um evento , assim conseguimos recuperar a propriedade/atributo
    const { name, value } = event.target
    //printa nome e value
    console.log(name, value)
    //atualiza novoProcurado
    setnovoProcurado({
      ...novoProcurado,
      [name]: value
    })
    //printa novoProcurado
    console.log(novoProcurado)
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

        //atualiza novoProcurado agora com a imagem
        setnovoProcurado({
          ...novoProcurado,
          imagem,
        })
      }
    }
    //se nao
    else {
      //alertamos o usuário que a imagem é muito grande
      alert('Imagem muito grande! A imagem deve ter 100kb ou menos.')
    }
  }
  //função que envia o formulário/os dados para o BD
  function enviarFormulario(event) {
    event.preventDefault();
    //converte pra número só para ter certeza que não vai conflitar com o BD ou o .net
    novoProcurado.idCidade = Number(novoProcurado.idCidade)
    
    //printa novoProcurado
    console.log(novoProcurado)
    //axios faz requisiçõa de post com o novoProcurado
    axios.post('https://localhost:7042/api/animalperdido', novoProcurado)
    //alert para o usuário
    window.alert("Incluiu animal perdido, ou era pra ter inserido ")

  }
//retorna JSX
  return (
    <div className="content">
      <main className="mainPostar">

        <h1>Perdeu seu bichinho?</h1>
        <h2>Preencha o formulário!</h2>

        <div className="formulario">
          {/* envia formulário */}
          <form className="inclui-container" onSubmit={enviarFormulario}>
            <label>Nome:</label>
            {/* value recebe o nome do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novoProcurado*/}
            <input type="text" maxLength="30" name="nome" value={novoProcurado.nome} onChange={atulizarnovoProcurado} className="input-grande" placeholder="Nome do animal" />
            <label>Telefone:</label>
            {/* value recebe o telefone do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novoProcurado*/}
            <input type="text" maxLength="30" name="telefone" value={novoProcurado.telefone} onChange={atulizarnovoProcurado} className="input-grande" placeholder="Somente números" />
            <label>Email:</label>
            {/* value recebe o email do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novoProcurado*/}
            <input type="email" maxLength="40" name="email" value={novoProcurado.email} onChange={atulizarnovoProcurado} className="input-grande" placeholder="Email principal" />
            <label>Estado:</label>
            {/* value recebe o estado do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novoProcurado*/}
            <select name="estado" className="input-pequeno">
              <option value="1">São Paulo</option>
            </select>

            <label>Cidade:</label>
            {/* value recebe o endereco do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
            {/* daria para pegar cidade do banco mas rolê */}
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
            {/* value recebe o complemento do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novoProcurado*/}
            <input type="text" maxLength="400" name="complemeto" placeholder="Ex:onde viu seu animal pela última vez" value={novoProcurado.complemeto} onChange={atulizarnovoProcurado} className="input-grande" />
            {/* value recebe o senha do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado adicionarImagem*/}
            <input type="file" name="imagem" className="input-imagem" accept="image/*" onChange={adicionarImagem} hidden ></input>
            {/* botão for clicado onClick será acionado e irá enviar o formulário */}
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