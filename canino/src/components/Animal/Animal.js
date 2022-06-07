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
            <main className="main">
                <div>
                    <h1>{animal.nome}</h1>
                    <img src={animal.imagem} />
                </div>
            </main>
        </div>
    )
}