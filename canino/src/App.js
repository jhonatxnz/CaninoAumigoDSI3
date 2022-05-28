import './App.css'
import Menu from './components/template/Menu';
import Rodape from './components/template/Rodape';
import Rotas from './Routes';
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