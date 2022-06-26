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
    atualizarPorte(event){
        const { name, value } = event.target
        this.setState({
            ...initialState,
            [name]: value
        })
        console.log(initialState)
    }
    render() {
        return (
            <div className="content">
                <main className="mainAdotar">
                    <div>

                        <h2>Aqui estão todos os nossos aumigos!</h2>
                        <select name="idPorte"  className="input-pequeno" onChange={this.atualizarPorte}>
                            <option value="1">Grande</option>
                            <option value="2">Médio</option>
                            <option value="3">Pequeno</option>
                        </select>
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