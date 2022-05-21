import "./Rodape.css"
import Logo from "./Logo"

export default function Rodape(props) {
    return (
        <footer>
            <div>
                <div>
                    <Logo />
                </div>

                <div>
                    <h2>Ínicio</h2>

                    <a href="/adotar">Adotar</a><br />
                    <a href="/doar">Doar</a>

                </div>
                <div>
                    <h2>Informações</h2>

                    <a href="/facebook">Facebook</a><br />
                    <a href="/instagram">Instagram</a>
                </div>
                <div>
                    <h2>Suporte</h2>

                    <a href="/email">Email</a><br />
                    <a href="/contato">Contato</a>
                </div>
                <div>
                    <h2>Sobre nós</h2>

                    <a href="/telefone">Telefone</a><br />
                    <a href="/telefone">Chat</a>
                </div>
            </div>
            
        </footer>
    );
}