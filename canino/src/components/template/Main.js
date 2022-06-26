import './Main.css';
import React, { Component } from 'react';
import Banner from './Banner';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/animal";

const initialState = {
    animal: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: '', cidade: {} },
    lista: []
}

const initialStateAnimalPerdido = {
    animalPerdido: { nome: '', telefone: '', email: '', complemeto: '', imagem: '', idCidade: 0 },
    listaAnimaisPerdidos: []
}

export default class Main extends Component {
    state = { ...initialState, ...initialStateAnimalPerdido }

    componentDidMount() {
        axios("https://localhost:7042/api/cidade")
            .then(resp => {
                const cidades = resp.data

                axios(urlAPI).then(resp => {
                    const animais = []

                    resp.data.map(animal => {
                        const cidade = cidades.filter(c => c.idCidade === animal.idCidade)[0]

                        animais.push({ ...animal, cidade })
                    })

                    this.setState({ lista: animais.slice(0, 5) })
                    console.log(animais)
                })

                axios(urlAPI + 'perdido').then(resp => {
                    const animaisPerdidos = []

                    resp.data.map(animalPerdido => {
                        const cidade = cidades.filter(c => c.idCidade === animalPerdido.idCidade)[0]

                        animaisPerdidos.push({ ...animalPerdido, cidade })

                    })

                    this.setState({ listaAnimaisPerdidos: animaisPerdidos.slice(0, 8) })
                })
            })
    }
    getListaAtualizada(animal, add = true) {
        const lista = this.state.lista.filter(a => a.id !== animal.id);
        if (add) lista.unshift(animal);
        return lista;
    }
    carregar(animal) {
        this.setState({ animal });
    }
    render() {
        return (

            <div className="content">
                <main className="main">
                    <div>
                        <Banner />

                        <div className="espaço">
                            <a href="/adotar" className="botoes">Quero Adotar</a>
                            <br/>
                            <a href="/doar" className="botoes">Quero divulgar um animal</a>
                        </div>

                        <h2>Conheça alguns de nossos aumigos!</h2>

                        <div className="animalAlinhado">
                            {this.state.lista.map((animal) =>
                                <div className="cartao">
                                    <img src={animal.imagem} alt="imagem do animal" className="imgAnimal"></img>
                                    <div id="container">
                                        <a href={`/animal/${animal.idAnimal}`}>
                                            {animal.nome}
                                        </a>

                                        <p>
                                            {animal.cidade.nome}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="solo">
                            <a href="/adotar" className="botoes">Veja mais! </a>
                        </div>
                        <div className="zzz">
                            <div className="animalPerdidoAlinhado">
                                <h3>Ajude a encontrar esse aumigos que desapareceram!</h3>

                                <div className='grid'>

                                    {this.state.listaAnimaisPerdidos.map((animalPerdido) =>
                                        <div className="cartao2">
                                            <img src={animalPerdido.imagem} alt="imagem do animal" className="imgAnimal"></img>
                                            <div id="container2">
                                                <a href={`/animalperdido/${animalPerdido.idAnimalPerdido}`}>
                                                    {animalPerdido.nome}
                                                </a>

                                                <p>
                                                    {animalPerdido.cidade.nome}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <a href="/achar"id="kkk" className="botoes">Veja mais!</a>
                            </div>
                            
                        </div>
                        <h2>Por que adotar?</h2>
                        <div className="cardsPQ">
                            <div className="oCard">
                                <h3>Felicidade para o lar</h3>
                                <p>Do mesmo modo em que você pratica o bem para o pet, ele também se esforça para proporcionar momentos de alegria para sua vida. Na verdade, o sentimento de felicidade estará
                                    presente para a família toda.</p>
                            </div>
                            <div className="oCard">
                                <h3>Resgate de uma vida</h3>
                                <p>Como os pets de rua estão vulneráveis a diversos tipos de maus-tratos e riscos de vida, ao adotar, você estará garantindo que ele tenha uma oportunidade de sobreviver e de desfrutar de uma vida feliz e saudável com alguém que o ama.</p>
                            </div>
                            <div className="oCard">
                                <h3>Faz bem para a saúde</h3>
                                <p>Vários estudos já mostraram o bem que um pet faz à saúde das pessoas. Além disso, ter um animalzinho em casa resulta em passeios que estimulam os exercícios, melhoram a pressão sanguínea e evita que o dono apresente indícios de depressão, ansiedade ou estresse.</p>
                            </div>

                        </div>
                        <h2>Cuidados ao adotar!</h2>
                        <div className="cardsCuidado">
                            <div className="oCuidado">
                                <h3>Preparar a casa para adotar um cachorro</h3>
                                <p>Essa é uma preocupação que poucas pessoas têm, porém, é muito importante para garantir a segurança do pet. Uma casa pode ter vários itens tóxicos ou perigosos para animais, como plantas, objetos cortantes na altura do animal, alimentos que ele não pode consumir na altura do pet, entre outros itens deste tipo.</p>
                            </div>
                            <div className="oCuidado">
                                <h3>Levar o animal no veterinário</h3>
                                <p>Esse cuidado pode variar dependendo da forma como o cãozinho foi adotado. Caso você tenha resgatado seu amiguinho da rua, é importante levá-lo ao veterinário antes mesmo de trazê-lo para casa.</p>
                            </div>
                            <div className="oCuidado">
                                <h3>Adotar um cachorro castrado ou castrá-lo</h3>
                                <p>As ONGS e clínicas veterinárias que oferecem animais para adoção geralmente realizam a castração do pet antes mesmo deles serem adotados. Isso porque há um consenso global de que castrar evita inúmeras doenças nos pets, assim como reduz as chances de mais animais serem abandonados.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}