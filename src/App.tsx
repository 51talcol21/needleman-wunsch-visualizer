import { useState, useEffect } from 'react';
import './App.css';
import InputComponent from './components/InputForm';
import needlemanWunsch from './utils/NeedlemanWunsch';
import MatrixDisplay from './components/DisplayMatrix';

function App() {
    const [sequenceData, setSequenceData] = useState({
        sequenceOne: "GCATGCG",
        sequenceTwo: "GATTACA",
        matchScore: 1,
        mismatchScore: -1,
        gapScore: -1
    });

    const [scoringData, setScoringData] = useState({
        score: 0,
        scoreMatrix: Array.from({ length: 5 }, () => Array(5).fill(null)),
        directionMatrix: Array.from({ length: 5 }, () => Array(5).fill(null)),
        alignedSequences: [['', '']],
    });

    useEffect(() => {
        const result = needlemanWunsch(
            sequenceData.sequenceOne,
            sequenceData.sequenceTwo,
            sequenceData.matchScore,
            sequenceData.mismatchScore,
            sequenceData.gapScore
        );
        setScoringData(result);
        console.log(result, sequenceData);
    }, [sequenceData]);

    function handleSequenceData(sequences: {sequenceOne: string, sequenceTwo: string, matchScore: number, mismatchScore: number, gapScore: number}) {
        setSequenceData({...sequences});
    }

    return (
    <>
        <div className="grid grid-cols-2 gap-8 w-full my-6">
            <div className="flex flex-col pt-2">
                <InputComponent onSubmit={handleSequenceData} />
                <div className="grid grid-cols-[max-content_auto] gap-x-2 gap-y-1 mt-auto text-start">
                    <span className="font-semibold">Input Sequence One:</span>
                    <span className="justify-self-end">{sequenceData.sequenceOne}</span>

                    <span className="font-semibold">Input Sequence Two:</span>
                    <span className="justify-self-end">{sequenceData.sequenceTwo}</span>

                    <span className="font-semibold">Score:</span>
                    <span className="justify-self-end-safe">{scoringData.score}</span>
                </div>
            </div>
            <div className="flex flex-row gap-2 flex-wrap overflow-y-scroll max-h-96">
                {scoringData.alignedSequences.map(([seqA, seqB], index) => (
                    <div
                        key={index}
                        className="p-2 bg-blue-800 rounded-md text-white font-mono my-2 h-min"
                    >
                        <div className="flex gap-1 mb-1">
                            {seqA.split('').map((char, i) => (
                                <span key={i} className="min-w-[1ch] text-center">{char}</span>
                            ))}
                        </div>
                        <div className="flex gap-1">
                            {seqB.split('').map((char, i) => (
                                <span key={i} className="min-w-[1ch] text-center">{char}</span>
                            ))}
                        </div>
                    </div>
                    ))}
            </div>
        </div>
        <MatrixDisplay matrix={scoringData.scoreMatrix} 
            directionsMatrix={scoringData.directionMatrix}
            scoreMatrix={scoringData.scoreMatrix}
            rowLabels={['', ...sequenceData.sequenceOne.split('')]}
            colLabels={['', ...sequenceData.sequenceTwo.split('')]}/>
    </>
    )
}

export default App
