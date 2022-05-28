import './Main.css';
import React from 'react';

import Banner from '../Banner';

export default function Main(props) {
    return (
        <div className="content">
            <main>
                <div>
                        <Banner />


                    <div className="espaço">
                        <a href="/adotar" className="botoes">Quero Adotar</a>
                        <a href="/doar" className="botoes">Quero divulgar um animal</a>
                    </div>
                    <h2>Conheça alguns de nossos aumigos!</h2>
                </div>
            </main>
        </div>
    )
}