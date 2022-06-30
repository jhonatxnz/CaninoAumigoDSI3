//importa o css
import './Adotar.css';
//por classe necessita de importar o Component
import React, { Component } from 'react';
import { useState } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//const que contem o endereco da tabela que queremos acessar
const urlAPI = "https://localhost:7042/api/animal";

//inicializa o estado todos valores começam "vazios" 
//variavel com dados do animal, e variavel lista onde estará o data
const initialState = {
    animal: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: '' },
    lista: []
}

//feita por classe, utiliza  componentDidMount ao invés de useEffect, maneira caindo em desUso
export default class Adotar extends Component {
    //Desestruturação, estamos quebrando a estrutura do objeto em fragmentos, para tornar o código mais limpo
    state = { ...initialState }
    //quando a página renderizar os elementos o o método é chamado, utilizado para buscar dados de uma api externa
    componentDidMount() {
        //axios busca no endereço passado como parâmetro os dados
        axios("https://localhost:7042/api/cidade")
        //quando der certo fará isso
            .then(resp => { //arrow function com a resposta 
                const cidades = resp.data //cidades recebe os dados que foram buscados naquele endereço
                //axios busca no endereço passado como parâmetro os dados, no caso agora a gente vai buscar os animais da nossa tabela
                axios(urlAPI).then(resp => {
                    //vetor animaisPerdidos 
                    const animais = []
                    //mapea animais, pega todos eles
                    resp.data.map(animal => {
                        //constante cidade, arrow function pega o idCidade da cidade e compara com o idCidade que o animal tem
                        const cidade = cidades.filter(c => c.idCidade === animal.idCidade)[0]
                        //coloca  no vetor de animais perdidos os dados do animal perdido,agora juntamente da cidade
                        animais.push({ ...animal, cidade })
                    })
                    //muda o estado, seta a lista com as informações atualizadadas
                    this.setState({ lista: animais })
                })
            })

    }
    //pega a lista de animais e retorna
    getListaAtualizada(animal, add = true) {
        const lista = this.state.lista.filter(a => a.id !== animal.id);
        if (add) lista.unshift(animal);
        return lista;
    }
    //atualiza o animal perdido
    carregar(animal) {
        this.setState({ animal });
    }
    //função para resgatar animais por porte
    atualizarPorte = (event) => {
        const { value } = event.target

        // console.log(name, value)

        //axios busca no endereço passado como parâmetro os dados(cidades)
        axios("https://localhost:7042/api/cidade")
        //quando der certo fará isso
            .then(resp => { //arrow function com a resposta 
                
                const cidades = resp.data //cidades recebe os dados que foram buscados naquele endereço
                
                //axios busca no endereço passado como parâmetro os dados, entra na tabela porte e pega  o value do porte passado
                axios(`https://localhost:7042/api/animal/porte/${value}`)
                //quando der certo fará isso
                .then(resp => {
                    //vetor animaisPerdidos 
                    const animais = []
                    //mapea animais com o porte indicado, pega todos eles
                    resp.data.map(animal => {
                        //constante cidade, arrow function pega o idCidade da cidade e compara com o idCidade que o animal tem
                        const cidade = cidades.filter(c => c.idCidade === animal.idCidade)[0]
                        //coloca  no vetor de animais os dados do animal perdido,agora juntamente da cidade
                        animais.push({ ...animal, cidade })
                    })
                    //muda o estado, seta a lista com as informações atualizadadas
                    this.setState({ lista: animais })
                })
            })
    }
     //renderiza os elementos Jsx
    render() {
        return (
            <div className="content">
                <main className="mainAdotar">
                    <div>

                        <h2>Aqui estão todos os nossos aumigos!</h2>
                        {/* Quando o usuário mudar o select de porte função de atualizar porte será ativada */}
                        <select name="idPorte" className="input-pequeno" onChange={this.atualizarPorte}>
                            <option value="1">Grande</option>
                            <option value="2">Médio</option>
                            <option value="3">Pequeno</option>
                        </select>

                        <div className="animalAlinhado">
                            {console.log("lista " + this.state.lista)}
                            {/* mapea todos os animais que estão armazenados na lista, cria um card para cada um */}
                            {this.state.lista.map((animal) =>
                                <div className="cartao">
                                    {/* pega o campo imagem do animalPerdido e passa pro source da img */}
                                    <img src={animal.imagem} alt="imagem do animal" className="imgAnimal"></img>
                                    <div id="container">
                                         {/* endereco muda, acessa outra tabela, e por fim o id do animal*/}
                                        <a href={`/animal/${animal.idAnimal}`}>
                                            <p>
                                                {/* acessa o nome do animal */}
                                                {animal.nome}
                                            </p>
                                        </a>

                                        <p>
                                            {/* acessa o nome da cidade do animal */}
                                            {animal.cidade.nome}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}