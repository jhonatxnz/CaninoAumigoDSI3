import { useState } from 'react';
import './Doar.css';
import axios from 'axios';


const initialState = {
  novaDoacao: {
    porte: ''
  }
}

export default function Doar(props) {
  const [novaDoacao, setNovaDoacao] = useState(initialState.novaDoacao)

  function atulizarNovaDoacao(event) {
    const { name, value } = event.target

    setNovaDoacao({
      ...novaDoacao,
      [name]: value
    })

    console.log(novaDoacao)
  }

  function enviarFormulario(event) {
    event.preventDefault();

    axios.post('https://localhost:', novaDoacao)
  }

  return (
    <div className="content">
      <main className="mainDoar">
        <h1>Doar um bichinho?</h1>
        <h2>Preencha o formulário!</h2>

        <form className="inclui-container" onSubmit={enviarFormulario}>
          <label>
            Nome:
          </label>
          <input type="text" name="porte" value={novaDoacao.porte} onChange={atulizarNovaDoacao} />
          <label>
            Raça:
          </label>
          <input type="text" name="porte" value={novaDoacao.porte} onChange={atulizarNovaDoacao} />
          <label>
            Cor:
          </label>
          <input type="text" name="porte" value={novaDoacao.porte} onChange={atulizarNovaDoacao} />
          <label>
            Idade:
          </label>
          <input type="number" name="porte" value={novaDoacao.porte} onChange={atulizarNovaDoacao} />
          <label>
            Descrição:
          </label>
          <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder="Coloque a descrição do seu bichinho"></textarea>
          <label>
            Gênero:
          </label>
          <input type="text" name="porte" value={novaDoacao.porte} onChange={atulizarNovaDoacao} />
          <label>
            Informações cruciais:
          </label>
          <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder="Ex:vacinação"></textarea>
          <label>
            Porte:
          </label>
          <select name="cars" id="cars">
            <option value="Grande">Grande</option>
            <option value="Medio">Médio</option>
            <option value="Pequeno">Pequeno</option>
          </select>
          <button>
                    Salvar
                </button>
        </form>
      </main>
    </div>

  )
}