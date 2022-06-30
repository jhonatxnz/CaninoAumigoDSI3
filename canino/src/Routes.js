import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';
import Adotar from './components/Adotar/Adotar';
import Doar from './components/Doar/Doar';
import Postar from './components/Postar/Postar';
import Achar from './components/Achar/Achar';
import Sobre from './components/Sobre/Sobre';
import Entrar from './components/Entrar/Entrar';
import Cadastrar from './components/Cadastrar/Cadastrar';
import Animal from './components/Animal/Animal';
import AnimalPerdido from './components/AnimalPerdido/AnimalPerdido';
import Conta from './components/User/User';

export default function Rotas() {
    return (
        <Routes>
            <Route exact path='/'element={<Main/>}/>

            <Route path='/adotar' element={<Adotar />} />
            <Route path='/doar' element={<Doar />} />
            <Route path='/postar' element={<Postar />} />
            <Route path='/achar' element={<Achar />} />
            <Route path='/sobre' element={<Sobre />} />
            <Route path='/entrar' element={<Entrar />} />
            <Route path='/cadastrar' element={<Cadastrar />} />
            <Route path='/conta/:idConta' element={<Conta />} />    {/* use params */}
            <Route path='/animal/:idAnimal' element={<Animal />} /> {/* use params */}
            <Route path='/animalPerdido/:idAnimalPerdido' element={<AnimalPerdido />} />    {/* use params */}

            <Route path="*" to='/' />
        </Routes>
    )
}