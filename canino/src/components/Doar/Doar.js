//importa o css
import './Doar.css';
//usa-se useEffect no lugar
import { useState } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//const que contem o endereco da tabela que queremos acessar
const urlAPI = "http://localhost:5271/api/animal";

//nem usamos
const tam = {
  width: '100%',

};

//inicializa o estado, todos valores começam "vazios" 
//variavel com dados do novaDoacao, e variavel lista onde está o data
const initialState = {
  novaDoacao: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: ''},
  lista: []
}
//feita por função, utiliza useEffect ao invés de componentDidMount 
export default function Doar(props) {
  //useState, variável  e setter da variável???
  const [novaDoacao, setNovaDoacao] = useState(initialState.novaDoacao)

  //função para atualizar novaDoacao
  function atulizarNovaDoacao(event) {
    //.target acionou um evento , assim conseguimos recuperar a propriedade/atributo
    const { name, value } = event.target
    //printa nome e value
    console.log(name, value)
    //atualiza novaDoacao
    setNovaDoacao({
      ...novaDoacao,
      [name]: value
    })
    //printa novaDoacao
    console.log(novaDoacao)
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
        //atualiza novaDoacao agora com a imagem
        setNovaDoacao({ 
          ...novaDoacao, 
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
    novaDoacao.idCidade = Number(novaDoacao.idCidade)
    //converte pra número só para ter certeza que não vai conflitar com o BD ou o .net
    novaDoacao.idPorte = Number(novaDoacao.idPorte)
    //converte pra número só para ter certeza que não vai conflitar com o BD ou o .net
    novaDoacao.idade = Number(novaDoacao.idade)

    //printa novaDoacao
    console.log(novaDoacao)
    //axios faz requisiçõa de post com o novaDoacao
    axios.post('https://localhost:7042/api/animal', novaDoacao)
    //alert para o usuário
    window.alert("Incluiu animal, ou era pra ter inserido ")

  }
  //retorna JSX
  return (
    <div className="content">
      <main className="mainDoar">

        <h1>Doar um bichinho?</h1>
        <h2>Preencha o formulário!</h2>
        
        <div className="formulario">
          {/* envia formulário */}
          <form className="inclui-container" onSubmit={enviarFormulario}>
            <label>Nome:</label>
            {/* value recebe o nome do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novaDoacao*/}
            <input type="text" maxLength="30" name="nome" value={novaDoacao.nome} onChange={atulizarNovaDoacao} className="input-grande" />

            <label>Raça:</label>
            {/* value recebe a raça do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novaDoacao*/}
            <input type="text" maxLength="30" name="raca" value={novaDoacao.raca} onChange={atulizarNovaDoacao} className="input-pequeno" />

            <label>Cor:</label>
            {/* value recebe o cor do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novaDoacao*/}
            <input type="text" maxLength="20" name="cor" value={novaDoacao.cor} onChange={atulizarNovaDoacao} className="input-pequeno" />

            <label>Idade:</label>
            {/* value recebe a idade do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novaDoacao*/}
            <input type="number" min="0" max="16" name="idade" value={novaDoacao.idade} onChange={atulizarNovaDoacao} className="input-pequeno" />

            <label>Descrição:</label>
            {/* value recebe a descrição do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novaDoacao*/}
            <input type="text" maxLength="200" name="descricao" placeholder="Coloque a descrição do seu bichinho" value={novaDoacao.descricao} onChange={atulizarNovaDoacao} className="input-grande" />

            <label>Sexo:</label>
            {/* value recebe o genero do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novaDoacao*/}
            <input type="text" maxLength="11" name="genero" value={novaDoacao.genero} onChange={atulizarNovaDoacao} className="input-pequeno" />

            <label>Informações cruciais:</label>
            {/* value recebe a vacinação do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novaDoacao*/}
            <input type="text" maxLength="200" name="vacinacao" placeholder="Ex:vacinação" value={novaDoacao.vacinacao} onChange={atulizarNovaDoacao} className="input-grande" />

            <label>Porte:</label>
            {/* value recebe o idPorte do atributo novaDoacao e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
            {/* daria para pegar porte do banco mas rolê */}
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
            {/* value recebe o endereco do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado atualizando novo cadastro*/}
            {/* daria para pegar cidade do banco mas rolê */}
            <select name="idCidade" onChange={atulizarNovaDoacao} value={novaDoacao.idCidade} className="input-pequeno">
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

            {/* value recebe o senha do atributo novoCadastro e quando usuário atualizar o campo onChange será acionado adicionarImagem*/}
            <input type="file" name="imagem" className="input-imagem" accept="image/*" onChange={adicionarImagem}  hidden ></input>
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