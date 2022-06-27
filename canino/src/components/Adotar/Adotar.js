import './Adotar.css';
import React, { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/animal";
const initialState = {
    animal: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: '' },
    lista: []
}
export default class Adotar extends Component {
    state = { ...initialState }
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

                    this.setState({ lista: animais })
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

    atualizarPorte = (event) => {
        const { value } = event.target
        // console.log(name, value)

        axios("https://localhost:7042/api/cidade")
            .then(resp => {
                const cidades = resp.data

                axios(`https://localhost:7042/api/animal/porte/${value}`).then(resp => {
                    const animais = []

                    resp.data.map(animal => {
                        const cidade = cidades.filter(c => c.idCidade === animal.idCidade)[0]

                        animais.push({ ...animal, cidade })
                    })

                    this.setState({ lista: animais })
                })
            })
        // .then(resp => {
        //     const resposta = resp.data
        //     // this.setState({ lista: animais })
        //     const animais = [];
        //     resposta.map((animal) => {
        //         animais.push(animal);
        //     })

        //     this.setState({ lista: animais})
        //     console.log("lista " + this.state.lista)
        //     // this.state.lista = animais
        // })

    }

    // this.setState({
    //   animal,
    //   [name]: value
    // })
    render() {
        return (
            <div className="content">
                <main className="mainAdotar">
                    <div>

                        <h2>Aqui estão todos os nossos aumigos!</h2>
                        <select name="idPorte" className="input-pequeno" onChange={this.atualizarPorte}>
                            <option value="1">Grande</option>
                            <option value="2">Médio</option>
                            <option value="3">Pequeno</option>
                        </select>

                        <div className="animalAlinhado">
                            {console.log("lista " + this.state.lista)}
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