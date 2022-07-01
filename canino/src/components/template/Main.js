//importa o css
import './Main.css';
//por classe necessita de importar o Component
import React, { Component } from 'react';
//importa o Banner
import Banner from './Banner';
import { useState } from 'react';
//importamos axios para consumir a api
import axios from 'axios';
//const que contem o endereco da tabela que queremos acessar
const urlAPI = "https://localhost:7042/api/animal";
//inicializa o estado todos valores começam "vazios" 
//variavel com dados do animal, e variavel lista onde estará o data

const initialState = {
    animal: { nome: '', raca: '', cor: '', idade: 0, descricao: '', genero: '', vacinacao: '', idPorte: 0, idCidade: 0, imagem: '', cidade: {} },
    lista: []
}

//inicializa o estado todos valores começam "vazios" 
//variavel com dados do animalPerdido, e variavel lista onde estará o data
const initialStateAnimalPerdido = {
    animalPerdido: { nome: '', telefone: '', email: '', complemeto: '', imagem: '', idCidade: 0 },
    listaAnimaisPerdidos: []
}

//feita por classe, utiliza  componentDidMount ao invés de useEffect, maneira caindo em desUso
export default class Main extends Component {
    //Desestruturação, estamos quebrando a estrutura do objeto em fragmentos, para tornar o código mais limpo
    state = { ...initialState, ...initialStateAnimalPerdido }

    //quando a página renderizar os elementos o o método é chamado, utilizado para buscar dados de uma api externa
    componentDidMount() {
        //axios busca no endereço passado como parâmetro os dados
        axios("https://localhost:7042/api/cidade")
            //quando der certo fará isso
            .then(resp => {//arrow function com a resposta 
                const cidades = resp.data   //cidades recebe os dados que foram buscados naquele endereço
                //axios busca no endereço passado como parâmetro os dados, no caso agora a gente vai buscar os animais perdidos da nossa tabela
                axios(urlAPI).then(resp => {
                    //vetor animais 
                    const animais = []
                    //mapea animais perdidos, pega todos eles
                    resp.data.map(animal => {
                        //constante cidade, arrow function pega o idCidade da cidade e compara com o idCidade que o animal tem
                        const cidade = cidades.filter(c => c.idCidade === animal.idCidade)[0]
                        //coloca  no vetor de animais  os dados do animal perdido,agora juntamente da cidade
                        animais.push({ ...animal, cidade })
                    })

                    this.setState({ lista: animais.slice(0, 5) })
                    console.log(animais)
                })
                //axios busca no endereço passado como parâmetro os dados + perdido
                axios(urlAPI + 'perdido').then(resp => {
                    //vetor animaisPerdidos 
                    const animaisPerdidos = []
                    //mapea animais perdidos, pega todos eles
                    resp.data.map(animalPerdido => {
                        //constante cidade, arrow function pega o idCidade da cidade e compara com o idCidade que o animal tem
                        const cidade = cidades.filter(c => c.idCidade === animalPerdido.idCidade)[0]
                        //coloca  no vetor de animais perdidos os dados do animal perdido,agora juntamente da cidade
                        animaisPerdidos.push({ ...animalPerdido, cidade })

                    })
                    //muda o estado, seta a lista com as informações atualizadadas
                    this.setState({ listaAnimaisPerdidos: animaisPerdidos.slice(0, 8) })
                })
            })
    }
    //pega a lista de animais perdidos e retorna
    getListaAtualizada(animal, add = true) {
        const lista = this.state.lista.filter(a => a.id !== animal.id);
        if (add) lista.unshift(animal);
        return lista;
    }
    //atualiza o animal perdido
    carregar(animal) {
        this.setState({ animal });
    }
    //renderiza os elementos Jsx
    render() {
        return (

            <div className="content">
                <main className="main">
                    <div>
                        <Banner />

                        <div className="espaço">
                            <a href="/adotar" className="botoes">Quero Adotar</a>
                            <br/>
                            <a href="/doar" className="botoes">Quero divulgar um animal</a>
                        </div>

                        <h2>Conheça alguns de nossos aumigos!</h2>

                        <div className="animalAlinhado">
                            {/* mapea todos os animais que estão armazenados na lista, cria um card para cada um */}
                            {this.state.lista.map((animal) =>
                                <div className="cartao" key={animal.idAnimal}>
                                    {/* pega o campo imagem do animal e passa pro source da img */}
                                    <img src={animal.imagem} alt="imagem do animal" className="imgAnimal"></img>
                                    <div id="container">
                                        {/* endereco muda, acessa outra tabela, e por fim o id do animal */}
                                        <a href={`/animal/${animal.idAnimal}`}>
                                            {/* nome do animal */}
                                            {animal.nome}
                                        </a>

                                        <p>
                                            {/* cidade do animal */}
                                            {animal.cidade.nome}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="solo">
                            <a href="/adotar" className="botoes">Veja mais! </a>
                        </div>
                        <div className="zzz">
                            <div className="animalPerdidoAlinhado">
                                <h3>Ajude a encontrar esse aumigos que desapareceram!</h3>

                                <div className='grid'>
                                    {/* mapea todos os animais perdidos que estão armazenados na lista, cria um card para cada um */}
                                    {this.state.listaAnimaisPerdidos.map((animalPerdido) =>
                                        <div className="cartao2" key={animalPerdido.idAnimalPerdido}>
                                            {/* pega o campo imagem do animalPerdido e passa pro source da img */}
                                            <img src={animalPerdido.imagem} alt="imagem do animal" className="imgAnimal"></img>
                                            <div id="container2">
                                                 {/* endereco muda, acessa outra tabela, e por fim o id do animalPerdido */}
                                                <a href={`/animalperdido/${animalPerdido.idAnimalPerdido}`}>
                                                    {/* nome do animalPerdido */}
                                                    {animalPerdido.nome}
                                                </a>

                                                <p>
                                                    {/* cidade do animaPerdido */}
                                                    {animalPerdido.cidade.nome}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <a href="/achar"id="kkk" className="botoes">Veja mais!</a>
                            </div>
                            
                        </div>
                        <h2>Por que adotar?</h2>
                        <div className="cardsPQ">
                            <div className="oCard">
                                <h3>Felicidade para o lar</h3>
                                <p>Do mesmo modo em que você pratica o bem para o pet, ele também se esforça para proporcionar momentos de alegria para sua vida. Na verdade, o sentimento de felicidade estará
                                    presente para a família toda.</p>
                            </div>
                            <div className="oCard">
                                <h3>Resgate de uma vida</h3>
                                <p>Como os pets de rua estão vulneráveis a diversos tipos de maus-tratos e riscos de vida, ao adotar, você estará garantindo que ele tenha uma oportunidade de sobreviver e de desfrutar de uma vida feliz e saudável com alguém que o ama.</p>
                            </div>
                            <div className="oCard">
                                <h3>Faz bem para a saúde</h3>
                                <p>Vários estudos já mostraram o bem que um pet faz à saúde das pessoas. Além disso, ter um animalzinho em casa resulta em passeios que estimulam os exercícios, melhoram a pressão sanguínea e evita que o dono apresente indícios de depressão, ansiedade ou estresse.</p>
                            </div>

                        </div>
                        <h2>Cuidados ao adotar!</h2>
                        <div className="cardsCuidado">
                            <div className="oCuidado">
                                <h3>Preparar a casa para adotar um cachorro</h3>
                                <p>Essa é uma preocupação que poucas pessoas têm, porém, é muito importante para garantir a segurança do pet. Uma casa pode ter vários itens tóxicos ou perigosos para animais, como plantas, objetos cortantes na altura do animal, alimentos que ele não pode consumir na altura do pet, entre outros itens deste tipo.</p>
                            </div>
                            <div className="oCuidado">
                                <h3>Levar o animal no veterinário</h3>
                                <p>Esse cuidado pode variar dependendo da forma como o cãozinho foi adotado. Caso você tenha resgatado seu amiguinho da rua, é importante levá-lo ao veterinário antes mesmo de trazê-lo para casa.</p>
                            </div>
                            <div className="oCuidado">
                                <h3>Adotar um cachorro castrado ou castrá-lo</h3>
                                <p>As ONGS e clínicas veterinárias que oferecem animais para adoção geralmente realizam a castração do pet antes mesmo deles serem adotados. Isso porque há um consenso global de que castrar evita inúmeras doenças nos pets, assim como reduz as chances de mais animais serem abandonados.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}