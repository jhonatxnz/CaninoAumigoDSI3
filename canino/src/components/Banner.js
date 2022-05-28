import banner from '../assets/imagens/banner_site.png';
import './Banner.css';
export default function Banner(props) {
    return (
        <img src={banner} alt="banner" className="banner" />
    )
}