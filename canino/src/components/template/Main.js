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
    animalPerdido: { nome: '', telefone:'', email: '', complemeto: '', imagem: '', idCidade: 0 },
    lista: []
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
                    })

                    axios("https://localhost:7042/api/animalperdido").then(resp => {
                        const animaisPerdidos = []

                        resp.data.map(animal => {
                            const cidade = cidades.filter(c => c.idCidade === animal.idCidade)[0]

                            animaisPerdidos.push({ ...animal, cidade })
                        })

                        this.setState({ lista: animais.slice(0, 5) })
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
                        </div>
                        </div>
                        
                    
                    </div>
                </main>
            </div>
        )
    }
}