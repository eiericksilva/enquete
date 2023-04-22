import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const style = {
  bg: `min-h-screen  w-screen p-4 bg-[#2F80ED]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto mb-2 rounded-md shadow-lg p-4`,
  heading: `text-center flex-auto text-lg font-semibold text-slate-900`,
  input: `mb-2 mt-2 focus:ring-6 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm`,
  button: `border p-2 bg-indigo-900 text-slate-200 text-sm hover:bg-indigo-700`,
  register: `bg-green-900 text-slate-200 hover:bg-green-700`,
  delete: `bg-red-900 text-slate-200 hover:bg-red-700`,
  container_input: `p-1 space-x-1 bg-gray-200 my-2 h-10 flex items-center`,
};

function App() {
  const [enquetes, setEnquetes] = useState([]);
  const [pergunta, setPergunta] = useState("");
  const [alternativaA, setAlternativaA] = useState("");
  const [alternativaB, setAlternativaB] = useState("");
  const [alternativaC, setAlternativaC] = useState("");
  const [optionSelected, setOptionSelected] = useState("");
  const [enqueteSelected, setEnqueteSelected] = useState("");

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
        <select
          className={style.input}
          onChange={(e) => setEnqueteSelected(e.target.value)}
        >
          {enquetes.map((enquete) => (
            <option value={enquete.pergunta}>{enquete.pergunta}</option>
          ))}
        </select>
      </div>
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
          <div key={enquete.id} className={style.container}>
            <form>
              <h3 className={style.heading}>{enquete.pergunta}</h3>
              {enquete.options.map((option) => (
                <div key={option.id} className={style.container_input}>
                  <input
                    id={option.id}
                    type="radio"
                    name={enquete.pergunta}
                    value={option.text}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={option.id}
                  >{`${option.text} - ${option.count}`}</label>
                </div>
              ))}
              <div className={style.container_buttons}>
                <button
                  className={`${style.button} ${style.register}`}
                  onClick={() => registrarResposta(enquete.id, optionSelected)}
                  type="button"
                >
                  Enviar resposta
                </button>
                <button
                  className={`${style.button} ${style.delete}`}
                  onClick={() => excluirEnquete(enquete.id)}
                >
                  Excluir Enquete
                </button>
              </div>
              <hr />
            </form>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
