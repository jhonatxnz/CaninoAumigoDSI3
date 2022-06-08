import './Main.css';
import React, { Component } from 'react';
import Banner from './Banner';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/animal";

const initialState = {
    animal: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: '' },
    lista: []
}

export default class Main extends Component {
    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data.slice(0, 5) })
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
                                            <p>
                                                {animal.nome}
                                            </p>
                                        </a>

                                        <p>
                                            {animal.idCidade}
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