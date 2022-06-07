import './Animal.css';
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const urlAPI = "https://localhost:7042/api/animal";

const initialState = {
    animal: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: '' },
    lista: []
}

export default function Animal(props) {
    const [animal, setAnimal] = useState(initialState.animal)

    const { idAnimal } = useParams()

    useEffect(() => {
        axios.get(`${urlAPI}/${idAnimal}`)
            .then((resp) => {
                setAnimal(resp.data)
            })
    }, [])

    return (
        <div className="content">
            <main className="mainAnimal">
                <div className="dupla">
                    <div className="aImagem">
                        <img src={animal.imagem} className="imageAnimal"/>
                    </div>
                    <div class="aInfo">
                        <h1>{animal.nome}</h1>
                        <p>Raça: {animal.raca}</p>
                        <p>Cor: {animal.cor}</p>
                        <p>Idade: {animal.idade}</p>
                        <label>Descrição de {animal.nome}: </label>
                        <p>{animal.descricao}</p>
                        <p>Sexo: {animal.genero}</p>
                        <p>Importante: {animal.vacinacao}</p>
                        <p>Porte: {animal.idPorte}</p>
                        <p>Cidade: {animal.idCidade}</p>
                        <button className="btnAdotar">Adotar</button><br/>
                    </div>
                </div>
            </main>
        </div>
    )
}