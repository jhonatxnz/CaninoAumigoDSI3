//importa o css
import './Animal.css';
//por função não necessita de Component 
import React, { Component } from 'react';
//usa-se useEffect no lugar
import { useState, useEffect } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//importamos outra hoo, o useParams para conseguirmos acessar valores dos id
import { useParams } from 'react-router-dom'
//imports para poder mostrar uma JANELA POP UP
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
//JANELA POP UP

//const que contem o endereco da tabela que queremos acessar
const urlAPI = "https://localhost:7042/api/animal";

//inicializa o estado, todos valores começam "vazios" 
//variavel com dados do animaç, e variavel lista onde está o data
const initialState = {
    animal: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: '' },
    lista: []
}

//feita por função, utiliza useEffect ao invés de componentDidMount 
export default function Animal(props) {
    //useState, variável  e setter da variável
    const [open, setOpen] = useState(false);

    //constante passa um evento por parâmetro, muda setOpen pra false atualiza variável
    const handleClose = (event) => {
        setOpen(false);
    };

    //useState, variável  e setter da variável???
    const [animal, setAnimal] = useState(initialState.animal)

    const [cidade, setCidade] = useState('');

    const [porte, setPorte] = useState('');

    const { idAnimal } = useParams()
    //quando a página renderizar os elementos o o método é chamado, utilizado para buscar dados de uma api externa
    useEffect(() => {
        //axios busca no endereço passado como parâmetro os dados, concatena url padrao + id do animal
        axios.get(`${urlAPI}/${idAnimal}`)
            //quando der certo fará isso
            .then((resp) => { //arrow function com a resposta
                //atualiza dados do animal
                setAnimal(resp.data)
            })
        //axios busca a cidade do animal que foi concatenado
        axios(`https://localhost:7042/api/cidade/${idAnimal}`)
            //quando der certo fará isso    
            .then(resp => {
                //cidade recebe os dados
                const cidade = resp.data
                //atualiza a cidade agora com o nome dela ao invés do id dela
                setCidade(cidade.nome);
            })
        //axios busca o porte do animal que foi concatenado
        axios(`https://localhost:7042/api/porte/${idAnimal}`)
            //quando der certo fará isso      
            .then(resp => {
                //porte recebe os dados
                const porte = resp.data
                //atualiza o porte agora com o nome dele ao invés do id dele
                setPorte(porte.tamanho);
            })
    }, [])//???
    //função que irá remover o animal da página [delete]
    function adotar(animal) {

        //const url recebe o endereco + o idAnimal para sabermos qual o animal será removido pelo seu id
        const url = urlAPI + "/" + animal.idAnimal;
        //se usuário confirmar remoção
        if (window.confirm("Confirmar adoção do animal: " + animal.nome.toUpperCase())) {
            //axios deletará no endereco com o id do animal
            axios['delete'](url, animal)
            //quando der certo fará isso      
            .then(resp => {
                //lista sumir com o animal
                const lista = this.getListaAtualizada(animal, false);
                //seta os dados , lista agora está atualizada
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
                         {/* pega o campo imagem do animal e passa pro source da img */}
                        <img src={animal.imagem} className="imageAnimal" alt="animal" />
                    </div>
                    <div className="direita">
                        <div className="nomeEbotao">
                            <p></p>
                            {/* acessa o nome do animal */}
                            <h1>{animal.nome.toUpperCase()}</h1>
                            <button className="btnEditar" onClick={() => adotar(animal)}>
                                Adotar
                            </button>
                        </div>

                        {/* pega campos do animal */}
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
                        <p>{porte}</p>

                        <h2>Cidade</h2>
                        <p>{cidade}</p>
                        
                        {/* quando o botão for clicado função onclick será acionada e vai "adotar o animal"*/}
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