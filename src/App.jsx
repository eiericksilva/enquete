import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const style = {
  bg: `h-screen w-screen p-4 bg-[#2F80ED]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto mb-2 rounded-md shadow-x1 p-4`,
  heading: `text-3x1 font-bold text-center text-gray-800 p-2`,
  input: `border p-2 w-full text-x1 mb-2`,
  button: `border p-2 bg-purple-500 text-slate-200`,
};

function App() {
  const [enquetes, setEnquetes] = useState([]);
  const [pergunta, setPergunta] = useState("");
  const [alternativaA, setAlternativaA] = useState("");
  const [alternativaB, setAlternativaB] = useState("");
  const [alternativaC, setAlternativaC] = useState("");
  const [optionSelected, setOptionSelected] = useState("");

  useEffect(() => {
    console.log("ENQUETES:", enquetes);
  }, [enquetes, optionSelected]);

  const registrarEnquete = (e) => {
    e.preventDefault();

    const novaEnquete = {
      id: uuidv4(),
      pergunta,
      options: [
        { id: uuidv4(), text: alternativaA, count: 0 },
        { id: uuidv4(), text: alternativaB, count: 0 },
        { id: uuidv4(), text: alternativaC, count: 0 },
      ],
    };

    const set = new Set([alternativaA, alternativaB, alternativaC]);
    if (set.size !== 3) {
      throw new Error("As alternativas devem ser diferentes uma das outras");
    }
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
    const enquete = enquetes.find((enquete) => enquete.id === id);
    const res = enquete.options.find((option) => option.text === response);
    res.count++;
  };

  const handleChange = (e) => {
    setOptionSelected(e.target.value);
  };

  return (
    <div className={style.bg}>
      <h3 className={style.heading}>Gestão de Enquetes</h3>
      <hr />
      <br />
      <div className={style.container}>
        <form>
          <label>
            Pergunta:
            <input
              className={style.input}
              onChange={(e) => setPergunta(e.target.value)}
              value={pergunta}
              type="text"
              placeholder="Insira sua pergunta"
            />
          </label>
          <p>Alternativas:</p>

          <label>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setAlternativaA(e.target.value)}
              value={alternativaA}
              placeholder="Insira a alternativa A"
            />
          </label>
          <label>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setAlternativaB(e.target.value)}
              value={alternativaB}
              placeholder="Insira a alternativa B"
            />
          </label>
          <label>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setAlternativaC(e.target.value)}
              value={alternativaC}
              placeholder="Insira a alternativa C"
            />
          </label>
          <button
            className={style.button}
            type="submit"
            onClick={registrarEnquete}
          >
            Registrar Enquete
          </button>
        </form>
      </div>
      {enquetes.length < 1 ? (
        <div>Vazio</div>
      ) : (
        enquetes.map((enquete) => (
          <div key={enquete.id}>
            <form>
              <h3>{enquete.pergunta}</h3>
              {enquete.options.map((option) => (
                <label key={option.id}>
                  <input
                    type="radio"
                    name={enquete.pergunta}
                    value={option.text}
                    onChange={handleChange}
                  />
                  {option.text}
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
