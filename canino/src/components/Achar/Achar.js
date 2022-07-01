//importa o css
import './Achar.css';
//por classe necessita de importar o Component
import React, { Component } from 'react';
import { useState } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//const que contem o endereco da tabela que queremos acessar
const urlAPI = "https://localhost:7042/api/animalPerdido";

//inicializa o estado todos valores começam "vazios" 
//variavel com dados do animalPerdido, e variavel lista onde estará o data
const initialState = {
    animalPerdido: { nome: '', telefone: '', email: '', complemeto: '', imagem: '', idCidade: 0 },
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
                //axios busca no endereço passado como parâmetro os dados, no caso agora a gente vai buscar os animais perdidos da nossa tabela
                axios(urlAPI).then(resp => {
                    //vetor animaisPerdidos 
                    const animaisPerdidos = []
                    //mapea animais perdidos, pega todos eles
                    resp.data.map(animalPerdido => {
                        //constante cidade, arrow function pega o idCidade da cidade e compara com o idCidade que o animal tem
                        const cidade = cidades.filter(c => c.idCidade === animalPerdido.idCidade)[0]//??
                        //coloca  no vetor de animais perdidos os dados do animal perdido,agora juntamente da cidade
                        animaisPerdidos.push({ ...animalPerdido, cidade })
                    })
                    //muda o estado, seta a lista com as informações atualizadadas
                    this.setState({ lista: animaisPerdidos })
                })
            })
    }
    //pega a lista de animais perdidos e retorna
    getListaAtualizada(animalPerdido, add = true) {
        const lista = this.state.lista.filter(a => a.id !== animalPerdido.id);
        if (add) lista.unshift(animalPerdido);
        return lista;
    }
    //atualiza o animal perdido
    carregar(animalPerdido) {
        this.setState({ animalPerdido });
    }
    //renderiza os elementos Jsx
    render() {
        return (
            <div className="content">
                <main className="mainAchar">
                    <div>

                        <h2>Aqui estão todos os nossos aumigos perdidos!</h2>
                        
                        <div className="animalAlinhado">
                            {/* mapea todos os animais perdidos que estão armazenados na lista, cria um card para cada um */}
                            {this.state.lista.map((animalPerdido) =>
                                <div className="cartao" key={animalPerdido.idAnimalPerdido}>
                                    {/* pega o campo imagem do animalPerdido e passa pro source da img */}
                                    <img src={animalPerdido.imagem} alt="imagem do animalPerdido" className="imgAnimal"></img>
                                    <div id="container">
                                        {/* endereco muda, acessa outra tabela, e por fim o id do animalPerdido */}
                                        <a href={`/animalPerdido/${animalPerdido.idAnimalPerdido}`}>
                                            <p>
                                                {/* acessa o nome do animalPerdido */}
                                                {animalPerdido.nome}
                                            </p>
                                        </a>

                                        <p>
                                            {/* acessa o nome da cidade do animalPerdido */}
                                            {animalPerdido.cidade.nome}
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