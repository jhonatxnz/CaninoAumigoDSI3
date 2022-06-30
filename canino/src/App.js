import './App.css'
import Menu from './components/template/Menu';
import Rodape from './components/template/Rodape';
//importa rotas
import Rotas from './Routes';
//importa BrowserRouter
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
        <div className="app">
            <Menu/>
            <Rotas />
            <Rodape/>
        </div>
        </BrowserRouter>
    );
}
export default App;