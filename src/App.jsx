import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [enquetes, setEnquetes] = useState([]);
  const [pergunta, setPergunta] = useState("");
  const [alternativaA, setAlternativaA] = useState("");
  const [alternativaB, setAlternativaB] = useState("");
  const [alternativaC, setAlternativaC] = useState("");
  const [inputSelected, setInputSelected] = useState();

  useEffect(() => {
    console.log("ENQUETES:", enquetes);
  }, [enquetes]);

  const registrarEnquete = (e) => {
    e.preventDefault();

    const novaEnquete = {
      id: uuidv4(),
      pergunta,
      alternativaA,
      alternativaB,
      alternativaC,
    };

    setEnquetes([...enquetes, novaEnquete]);

    setPergunta("");
    setAlternativaA("");
    setAlternativaB("");
    setAlternativaC("");
  };

  const excluirEnquete = (id) => {
    const result = enquetes.filter((item) => {
      return item.id !== id;
    });
    setEnquetes(result);
  };

  const registrarResposta = (id, resposta) => {
    console.log("ID:", id);
    console.log("RESPOSTA:", resposta);
  };

  return (
    <div>
      <h2>Agora vai</h2>
      <button>Criar Enquente</button>
      <button>Remover Enquente</button>
      <button>Registrar Resposta</button>
      <button>Mostrar Respostas</button>
      <hr />
      <br />
      <form>
        <label>
          Insira a pergunta:
          <input
            onChange={(e) => setPergunta(e.target.value)}
            value={pergunta}
            type="text"
          />
        </label>
        <p>Insira 3 alternativas</p>

        <label>
          a:
          <input
            type="text"
            onChange={(e) => setAlternativaA(e.target.value)}
            value={alternativaA}
          />
        </label>
        <label>
          b:
          <input
            type="text"
            onChange={(e) => setAlternativaB(e.target.value)}
            value={alternativaB}
          />
        </label>
        <label>
          c:
          <input
            type="text"
            onChange={(e) => setAlternativaC(e.target.value)}
            value={alternativaC}
          />
        </label>
        <button type="submit" onClick={registrarEnquete}>
          Registrar Enquete
        </button>
      </form>

      <hr />
      {enquetes.map((enquete) => (
        <div key={enquete.id}>
          <form>
            <h3>{enquete.pergunta}</h3>
            <label>
              <input
                type="radio"
                name={enquete.pergunta}
                value={enquete.alternativaA}
                onChange={(e) => setInputSelected(e.target.value)}
              />
              {enquete.alternativaA}
            </label>
            <label>
              <input
                type="radio"
                name={enquete.pergunta}
                value={enquete.alternativaB}
                onChange={(e) => setInputSelected(e.target.value)}
              />
              {enquete.alternativaB}
            </label>
            <label>
              <input
                type="radio"
                name={enquete.pergunta}
                value={enquete.alternativaC}
                onChange={(e) => setInputSelected(e.target.value)}
              />
              {enquete.alternativaC}
            </label>
            <button
              onClick={() => registrarResposta(enquete.id, inputSelected)}
              type="button"
            >
              Enviar resposta
            </button>
            <button onClick={() => excluirEnquete(enquete.id)}>
              Excluir Enquete
            </button>
            <hr />
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
