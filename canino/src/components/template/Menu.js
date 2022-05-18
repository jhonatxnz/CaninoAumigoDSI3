import './Menu.css';
import Logo from './Logo'

export default function Menu(props) {

  return (
    <nav>
      <div>
        <Logo />

        <div>
          <a className="link" href="/adotar">Adotar</a>
          <a className="link" href="/doar">Doar</a>
          <a className="link" href="/postar">Postar</a>
          <a className="link" href="/sobre">Sobre nós</a>
          <a className="link" href="/entrar">Entrar</a>
          <a className="link" href="/cadastrar">Cadastrar-se</a>
        </div>
      </div>
    </nav>
  )
}