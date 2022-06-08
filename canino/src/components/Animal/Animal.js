import './Animal.css';
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

const urlAPI = "https://localhost:7042/api/animal";

const initialState = {
    animal: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: '' },
    lista: []
}

export default function Animal(props) {
    const [open, setOpen] = useState(false);

    const handleClose = (event) => {
        setOpen(false);
    };

    const [animal, setAnimal] = useState(initialState.animal)

    const { idAnimal } = useParams()

    useEffect(() => {
        axios.get(`${urlAPI}/${idAnimal}`)
            .then((resp) => {
                setAnimal(resp.data)
            })
    }, [])
    function adotar(animal) {


        const url = urlAPI + "/" + animal.idAnimal;
        if (window.confirm("Confirmar adoção do animal: " + animal.nome.toUpperCase())) {

            axios['delete'](url, animal).then(resp => {
                const lista = this.getListaAtualizada(animal, false);
                this.setState({ animal: initialState.animal, lista });
            })
            setOpen(true);
        }
    }
    return (
        <div className="content">
            <main className="mainAnimal">
                <div className="dupla">
                    <div className="esquerda">
                        <img src={animal.imagem} className="imageAnimal" alt="animal" />
                    </div>
                    <div class="direita">
                        <h1>{animal.nome.toUpperCase()}</h1>

                        <h2>Raça </h2>
                        <p>{animal.raca}</p>

                        <h2>Cor</h2>
                        <p>{animal.cor}</p>

                        <h2>Idade</h2>
                        <p>{animal.idade}</p>

                        <h2>Descrição de {animal.nome.toUpperCase()}</h2>
                        <p>{animal.descricao}</p>

                        <h2>Sexo: </h2>
                        <p>{animal.genero}</p>

                        <h2>Importante</h2>
                        <p>{animal.vacinacao}</p>

                        <h2>Porte</h2>
                        <p>{animal.idPorte}</p>

                        <h2>Cidade</h2>
                        <p>{animal.idCidade}</p>

                        <button className="btnAdotar" onClick={() => adotar(animal)}>
                            Adotar
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
                        <strong>Para adotar esse animal entre em contato com o seu doador:</strong> <br />
                        <p>Telefone: ...</p>                       <br />
                        <p>Email: ...</p>                        <br />
                        <strong>Saiba que ao estar adotando um animal
                        você está assumindo uma grande responsabilidade!
                        </strong>     <br />
                        <p>Agora estamos retirando esse animal da página de adoção!</p>


                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>

    )
}