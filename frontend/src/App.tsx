import { useState } from 'react';
import { generateRandomMatrix } from './api/matrix';
import { RandomAlgorithms } from './repository/Algorithms';
import './App.css'

function App() {
  const [matrizSize, setMatrixSize] = useState<number>();
  const [numOfCahnges, setNumOfCahnges] = useState<number>();
  const [randomAlgorithm, setRandomAlgorithm] = useState<RandomAlgorithms>();
  const initialMatrix = Array.from({ length: matrizSize ? matrizSize : 0 }, () => Array.from({ length: matrizSize ? matrizSize : 0 }, () => 0));
  const [matrix, setMatrix] = useState(initialMatrix);

  const handleNumberOfChangesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfCahnges(parseInt(event.target.value));
  }

  const handleMatrixSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatrixSize(parseInt(event.target.value));
  }

  const handleRandomAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAlgorithm = event.target.value as RandomAlgorithms;
    setRandomAlgorithm(selectedAlgorithm);
  }

  const genrateEmpyMatrixHandler = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (matrizSize) {
      const emptyMatrix = Array.from({ length: matrizSize }, () => Array.from({ length: matrizSize }, () => 0));
      setMatrix(emptyMatrix);
    }
  }  

  const generateRandomMatrixHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(numOfCahnges, matrizSize, randomAlgorithm);
    if(numOfCahnges && matrizSize && randomAlgorithm) {
      const matrix = await generateRandomMatrix(
        {
          numChanges: numOfCahnges,
          size: matrizSize,
          randomAlgorithm: randomAlgorithm
        }
      );
      console.log(matrix)
      setMatrix(matrix);
    }
  }
 
  return (
    <div className="container">
      {/* Formulario en la parte izquierda */}
      <div className="formContainer">
        <h1>Random Matrix</h1>
        <form className="form">
          <input type="number" placeholder="Matrix size" className="inputField" value={matrizSize} onChange={handleMatrixSizeChange}/>
          <button type="submit" className="createInitMatrix" onClick={genrateEmpyMatrixHandler}>Create</button>
        </form>
        <form className="form">
          <input type="number" placeholder="Number of random 1´s" className="inputField" value={numOfCahnges} onChange={handleNumberOfChangesChange}/>
          <select
          value={randomAlgorithm}
          onChange={handleRandomAlgorithmChange}
          className="selectField"
        >
          {Object.values(RandomAlgorithms).map((opcion, index) => (
            <option key={index} value={opcion}>{opcion}</option>
          ))}
        </select>
          <button type="submit" className="submitButton" onClick={generateRandomMatrixHandler}>Generate</button>
        </form>
      </div>

      {/* Matriz de 30x30 en la parte derecha */}
      <div className="matrixContainer">
        <table className="matrixTable">
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="matrixCell" style={{backgroundColor: cell == 1 ? 'lightcoral' : 'azure'}}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App
