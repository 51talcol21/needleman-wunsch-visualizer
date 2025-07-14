import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import InputComponent from './components/InputForm';
import needlemanWunsch from './utils/NeedlemanWunsch';

function App() {
    const [sequenceData, setSequenceData] = useState({
        sequenceOne: "GCATGCG",
        sequenceTwo: "GATTACA"
    });

    function handleSequenceData(sequences) {
        setSequenceData({...sequences});
    }

    return (
    <>
        <InputComponent onSubmit={handleSequenceData} />
        <div>
            {sequenceData.sequenceOne} <br />
            {sequenceData.sequenceTwo}
        </div>

        {needlemanWunsch(sequenceData.sequenceOne, sequenceData.sequenceTwo, 1, -1, -1).score} <br />
        <ul>
          {needlemanWunsch(sequenceData.sequenceOne, sequenceData.sequenceTwo, 1, -1, -1).alignedSequences.map((item) => (
            <li key={item[0] + item[1]}>{item[0]} : {item[1]}</li>
          ))}
        </ul>
        {needlemanWunsch(sequenceData.sequenceOne, sequenceData.sequenceTwo, 1, -1, -1).alignedSequenceOne} <br />
        {needlemanWunsch(sequenceData.sequenceOne, sequenceData.sequenceTwo, 1, -1, -1).alignedSequenceTwo} <br />
    </>
    )
}

export default App
