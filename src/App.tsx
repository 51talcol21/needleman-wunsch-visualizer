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
    }, [sequenceData]);

    function handleSequenceData(sequences: {sequenceOne: string, sequenceTwo: string, matchScore: number, mismatchScore: number, gapScore: number}) {
        setSequenceData({...sequences});
    }

    return (
    <div className="max-w-screen p-4 bg-stone-900">
        <h2 className="text-4xl">
            Needleman-Wunsch Algorithm Website (global)
        </h2>
        <p className="max-w-3xl mt-4">
            Hey! This is my website so visualize and calculate the Needleman-Wunsch algorithm for gene alignment. Simply post the two sequences, put in various scores, and 
            this website will showcase all possible gene alignments with that score (optimal score). The path for each will be highlighted pink and arrows show how you can backtrack!
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 my-6">
            <div className="flex flex-col pt-2">
                <InputComponent onSubmit={handleSequenceData} />
                <div className="grid grid-cols-[max-content_auto] mt-auto text-start gap-2">
                    <span className="font-semibold">Input Sequence One:</span>
                    <span className="justify-self-end text-amber-50">{sequenceData.sequenceOne}</span>

                    <span className="font-semibold">Input Sequence Two:</span>
                    <span className="justify-self-end text-amber-50">{sequenceData.sequenceTwo}</span>

                    <span className="font-semibold">Score:</span>
                    <span className="justify-self-end-safe text-amber-50">{scoringData.score}</span>
                </div>
            </div>
            <div>
                <span className="me-auto"> Aligned Sequences </span>
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
        </div>
        <MatrixDisplay matrix={scoringData.scoreMatrix} 
            directionsMatrix={scoringData.directionMatrix}
            scoreMatrix={scoringData.scoreMatrix}
            rowLabels={['', ...sequenceData.sequenceOne.split('')]}
            colLabels={['', ...sequenceData.sequenceTwo.split('')]}/>
        
        <h2 className="text-4xl mt-12">
            About
        </h2>
        <p className="max-w-3xl mt-4">
            My name is Thaddeus and I'm learning bio-informatics and have an SWE background. I wanted to use my react knowledge to host a website for this and do some DP and learn some genetics!
            Feel free to contact me/look at the source code if needed.
        </p>
    </div>
    )
}

export default App
