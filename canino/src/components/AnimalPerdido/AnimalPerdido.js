import './AnimalPerdido.css';
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
//JANELA POP UP
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
//JANELA POP UP

const urlAPI = "https://localhost:7042/api/animalperdido";

const initialState = {
    animalPerdido: { nome: '', telefone:'', email: '', complemeto: '', imagem: '', idCidade: 0 },
    lista: []
}

export default function AnimalPerdido(props) {
    const [open, setOpen] = useState(false);

    const handleClose = (event) => {
        setOpen(false);
    };

    const [animalPerdido, setAnimalPerdido] = useState(initialState.animalPerdido)

    const [cidade, setCidade] = useState('');


    const { idAnimalPerdido } = useParams()

    useEffect(() => {
        axios.get(`${urlAPI}/${idAnimalPerdido}`)
            .then((resp) => {
                setAnimalPerdido(resp.data)
            })
            axios(`https://localhost:7042/api/cidade/${idAnimalPerdido}`)
            .then(resp => {
                const cidade = resp.data
                setCidade(cidade.nome);
            })

            
    }, [])
    function adotar(animalPerdido) {


        const url = urlAPI + "/" + animalPerdido.idAnimalPerdido;
        if (window.confirm("Se você viu o animalzinho: " + animalPerdido.nome.toUpperCase() + " Aperte em 'OK' ")) {

            axios['delete'](url, animalPerdido).then(resp => {
                const lista = this.getListaAtualizada(animalPerdido, false);
                this.setState({ animalPerdido: initialState.animalPerdido, lista });
            })
            setOpen(true);
        }
    }
    return (
        <div className="content">
            <main className="mainAnimalPerdido">
                <div className="dupla">
                    <div className="esquerda">
                        <img src={animalPerdido.imagem} className="imageAnimal" alt="animal" />
                    </div>
                    <div className="direita">
                        <h1>{animalPerdido.nome.toUpperCase()}</h1>

                        <h2>Telefone: </h2>
                        <p>{animalPerdido.telefone}</p>

                        <h2>Email: </h2>
                        <p>{animalPerdido.email}</p>

                        <h2>Complemento: </h2>
                        <p>{animalPerdido.complemento}</p>

                        

                        <h2>Cidade</h2>
                        <p>{cidade}</p>

                        <button className="btnAdotar" onClick={() => adotar(animalPerdido)}>
                            Viu esse animal?
                        </button>
                    </div>

                </div>
            </main>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Olá somos da equipe do CaninoAumigo!
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <strong>Por favor entre em contato com a pessoa que perdeu esse animal:</strong> <br />
                        <p>Telefone: ...</p>                       <br />
                        <p>Email: ...</p>                        <br />
                        
                        <p>Agora estamos retirando esse animal da página de perdidos!</p>


                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>

    )
}