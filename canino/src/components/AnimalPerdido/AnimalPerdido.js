//importa o css
import './AnimalPerdido.css';
//por função não necessita de Component 
import React from 'react';
//usa-se useEffect no lugar
import { useState, useEffect } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//importamos outra hoo, o useParams para conseguirmos acessar valores dos id
import { useParams } from 'react-router-dom'
//imports para poder mostrar uma JANELA POP UP
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
//imports para poder mostrar uma JANELA POP UP

//const que contem o endereco da tabela que queremos acessar
const urlAPI = "https://localhost:7042/api/animalperdido";

//inicializa o estado, todos valores começam "vazios" 
//variavel com dados do animalPerdido, e variavel lista onde está o data
const initialState = {
    animalPerdido: { nome: '', telefone:'', email: '', complemeto: '', imagem: '', idCidade: 0 },
    lista: []
}

//feita por função, utiliza useEffect ao invés de componentDidMount 
export default function AnimalPerdido(props) {
    //useState, variável  e setter da variável
    const [open, setOpen] = useState(false);
    
    //constante passa um evento por parâmetro, muda setOpen pra false atualiza variável
    const handleClose = (event) => {
        setOpen(false);
    };

    //useState, variável  e setter da variável???
    const [animalPerdido, setAnimalPerdido] = useState(initialState.animalPerdido)

    const [cidade, setCidade] = useState('');


    const { idAnimalPerdido } = useParams()
    //quando a página renderizar os elementos o o método é chamado, utilizado para buscar dados de uma api externa
    useEffect(() => {
        //axios busca no endereço passado como parâmetro os dados, concatena url padrao + id do animalPerdido
        axios.get(`${urlAPI}/${idAnimalPerdido}`)
            //quando der certo fará isso
            .then((resp) => { //arrow function com a resposta
                //atualiza dados do animalPerdido
                setAnimalPerdido(resp.data)
            })
            //axios busca a cidade do animalPerdido que foi concatenado
            axios(`https://localhost:7042/api/cidade/${idAnimalPerdido}`)
            //quando der certo fará isso   
            .then(resp => {
                //cidade recebe os dados
                const cidade = resp.data
                //atualiza a cidade agora com o nome dela ao invés do id dela
                setCidade(cidade.nome);
            })
    }, [])//???
    //função que irá remover o animal da página [delete]
    function achar(animalPerdido) {
        //const url recebe o endereco + o idAnimalPerdido para sabermos qual o animal será removido pelo seu id
        const url = urlAPI + "/" + animalPerdido.idAnimalPerdido;
        //se usuário confirmar remoção
        if (window.confirm("Se você viu o animalzinho: " + animalPerdido.nome.toUpperCase() + " Aperte em 'OK' ")) {
            //axios requisita deleção no endereco com o id do animal
            axios['delete'](url, animalPerdido)
             //quando der certo fará isso
            .then(resp => {
                //lista sumir com o animalPerdido
                const lista = this.getListaAtualizada(animalPerdido, false);
                //seta os dados , lista agora está atualizada
                this.setState({ animalPerdido: initialState.animalPerdido, lista });
            })
            //abre janela popUp
            setOpen(true);
        }
        window.location.href = 'http://localhost:3000/achar';
    }
    //retorna JSX
    return (
        <div className="content">
            <main className="mainAnimalPerdido">
                <div className="dupla">
                    <div className="esquerda">
                        {/* pega o campo imagem do animalPerdido e passa pro source da img */}
                        <img src={animalPerdido.imagem} className="imageAnimal" alt="animal" />
                    </div>
                    <div className="direita">
                        {/* acessa o nome do animal */}
                        <h1>{animalPerdido.nome.toUpperCase()}</h1>
                        {/* pega campos do animal */}
                        <h2>Telefone: </h2>
                        <p>{animalPerdido.telefone}</p>

                        <h2>Email: </h2>
                        <p>{animalPerdido.email}</p>

                        <h2>Complemento: </h2>
                        <p>{animalPerdido.complemento}</p>

                        <h2>Cidade</h2>
                        <p>{cidade}</p>
                        {/* quando o botão for clicado função onclick será acionada e vai "achar o animal"*/}
                        <button className="btnAdotar" onClick={() => achar(animalPerdido)}>
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