import './User.css';
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'


const urlAPI = "https://localhost:7042/api/conta";

const initialState = {
    conta: { senha:'', cpf: 0, nome: '', telefone: 0, email: '', endereco: '', idade: 0, idCidade: 0 },
    lista: []
}

export default function User(props) {
    const [open, setOpen] = useState(false);

    const handleClose = (event) => {
        setOpen(false);
    };

    const [conta, setconta] = useState(initialState.conta)

    const [cidade, setCidade] = useState('');

    const [porte, setPorte] = useState('');

    const { idconta } = useParams()

    useEffect(() => {
        axios.get(`${urlAPI}/${idconta}`)
            .then((resp) => {
                setconta(resp.data)
            })
            axios(`https://localhost:7042/api/cidade/${idconta}`)
            .then(resp => {
                const cidade = resp.data
                setCidade(cidade.nome);
            })

            axios(`https://localhost:7042/api/porte/${idconta}`)
            .then(resp => {
                const porte = resp.data
                setPorte(porte.tamanho);
            })
    }, [])
    function adotar(conta) {


        const url = urlAPI + "/" + conta.idconta;
        if (window.confirm("Confirmar adoção do conta: " + conta.nome.toUpperCase())) {

            axios['delete'](url, conta).then(resp => {
                const lista = this.getListaAtualizada(conta, false);
                this.setState({ conta: initialState.conta, lista });
            })
            setOpen(true);
        }
    }
    return (
        <div className="content">
            <main className="mainconta">
                <div className="dupla">
                    <div className="esquerda">
                        <img src={conta.imagem} className="imageconta" alt="conta" />
                    </div>
                    <div className="direita">
                        <h1>{conta.nome.toUpperCase()}</h1>

                        <h2>Raça </h2>
                        <p>{conta.raca}</p>

                        <h2>Cor</h2>
                        <p>{conta.cor}</p>

                        <h2>Idade</h2>
                        <p>{conta.idade}</p>

                        <h2>Descrição de {conta.nome.toUpperCase()}</h2>
                        <p>{conta.descricao}</p>

                        <h2>Sexo: </h2>
                        <p>{conta.genero}</p>

                        <h2>Importante</h2>
                        <p>{conta.vacinacao}</p>

                        <h2>Porte</h2>
                        <p>{porte}</p>

                        <h2>Cidade</h2>
                        <p>{cidade}</p>

                        <button className="btnAdotar" onClick={() => adotar(conta)}>
                            Adotar
                        </button>
                    </div>

                </div>
            </main>
                    </div>

    )
}