import './Logo.css';
import logo from '../../assets/imagens/logo_site.png';

export default function Logo(props) {
    return (
        <a href="/">
            <img src={logo} alt="Logo" />
        </a>
    )
}