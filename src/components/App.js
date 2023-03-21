import { useEffect, useState } from "react";
import Header from "./Header";
import Dummy from "./Dummy";
import SolutionLetters from "./SolutionLetters";
import Form from "./Form";
import Footer from "./Footer";
import Instruction from "./Instruction";
import { Route, Routes } from "react-router-dom";
// api
import getWordFromApi from "../services/api";
// styles
import "../styles/App.scss";
import "../styles/Dummy.scss";
import "../styles/Letters.scss";
import "../styles/Form.scss";
import "../styles/Header.scss";
import Options from "./Options";

function App() {
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState("");

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter(
      (letter) =>
        word.toLocaleLowerCase().includes(letter.toLocaleLowerCase()) === false
    );
    return errorLetters.map((letter, index) => {
      return (
        <li key={index} className="letter">
          {letter}
        </li>
      );
    });
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  const handleChange = (value) => {
    value= value.toLocaleLowerCase();
    setWord(value);
    setLastLetter('');
    setUserLetters(['']);

  }

  return (
    <div className="page">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/instructions" element={<Instruction />} />
          <Route
            path="/"
            element={
              <>
                {" "}
                <section>
                  <SolutionLetters word={word} userLetters={userLetters} />

                  <div className="error">
                    <h2 className="title">Letras falladas:</h2>
                    <ul className="letters">{renderErrorLetters()}</ul>
                  </div>
                  <Form
                    lastLetter={lastLetter}
                    handleLastLetter={handleLastLetter}
                  />
                </section>
                <Dummy numberOfErrors={getNumberOfErrors()} />
              </>
            }
          />
          <Route path="/options" element={<Options handleChange={handleChange} word={word} />}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
