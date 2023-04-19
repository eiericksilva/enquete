import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [enquetes, setEnquetes] = useState([]);
  const [pergunta, setPergunta] = useState("");
  const [alternativaA, setAlternativaA] = useState("");
  const [alternativaB, setAlternativaB] = useState("");
  const [alternativaC, setAlternativaC] = useState("");
  const [optionSelected, setOptionSelected] = useState("");

  useEffect(() => {
    console.log("ENQUETES:", enquetes);
  }, [enquetes]);

  const registrarEnquete = (e) => {
    e.preventDefault();

    const novaEnquete = {
      id: uuidv4(),
      textQuestion: pergunta,
      options: [
        { a: alternativaA, count: 0 },
        { b: alternativaB, count: 0 },
        { c: alternativaC, count: 0 },
      ],
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

  const registrarResposta = (id, response) => {
    console.log(id);
    console.log(response);
  };

  const handleChange = (e) => {
    setOptionSelected(e.target.value);
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
      {enquetes.length < 1 ? (
        <div>Vazio</div>
      ) : (
        enquetes.map((enquete) => (
          <div key={enquete.id}>
            <form>
              <h3>{enquete.textQuestion}</h3>
              {enquete.options.map((option) => (
                <label>
                  <input
                    type="radio"
                    name={enquete.textQuestion}
                    value={option.a || option.b || option.c}
                    onChange={handleChange}
                  />
                  {option.a || option.b || option.c}
                </label>
              ))}
              <button
                onClick={() => registrarResposta(enquete.id, optionSelected)}
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
        ))
      )}
    </div>
  );
}

export default App;
