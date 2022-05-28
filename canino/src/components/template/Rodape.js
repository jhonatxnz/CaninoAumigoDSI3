import "./Rodape.css"
import Logo from "./Logo"

export default function Rodape(props) {
    return (
        <footer>
            <div>

                <div>
                    <Logo/>
                </div>

                <div>
                    <h2>Como ajudar?</h2>
                    <a href="/adotar">Quero adotar</a><br/>
                    <a href="/doar">Quero doar</a>
                </div>

                <div>
                    <h2>Suporte</h2>
                    <a href="/email">Email</a><br/>
                    <a href="/contato">Contato</a>
                </div>

                <div>
                    <h2>Redes sociais</h2>
                    <a href="/facebook">Facebook</a><br/>
                    <a href="/instagram">Instagram</a>
                </div>

                <div>
                    <h2><a href="/sobre">Sobre nós</a> </h2>
                </div>
            </div>
            
        </footer>
    );
}