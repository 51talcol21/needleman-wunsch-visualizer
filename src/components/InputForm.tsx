import { useState } from 'react';

type InputsType = {
    sequenceOne: string;
    sequenceTwo: string;
    matchScore: number;
    mismatchScore: number;
    gapScore: number;
  };

type InputComponentProps = {
    onSubmit: (inputs: InputsType) => void;
};

function InputComponent({ onSubmit }: InputComponentProps) {
    const [inputs, setInputs] = useState({
        sequenceOne: 'GCATGCG',
        sequenceTwo: 'GATTACA',
        matchScore: 1,
        mismatchScore: -1,
        gapScore: -1

    });

    const handleChange = (e: { target: { name: any; value: any; type: any; }; }) => {
        const { name, value, type } = e.target;
        setInputs((prev) => ({ 
            ...prev, 
            [name]: type === 'number' ? Number(value) : value }));
    };

    const handleSubmit = () => {
        onSubmit(inputs);
    };

  return (
    <div className="flex flex-col items-center max-w-3xl flex-wrap">
        <div className="self-start flex justify-between w-full">
            <label htmlFor="sequenceOne">
                First Sequence: 
            </label>
            <input
                name="sequenceOne"
                placeholder="First Sequence"
                value={inputs.sequenceOne}
                className="bg-stone-700 rounded-md px-2 py-1 text-amber-50"
                onChange={handleChange} />
        </div>
        <div className="self-start flex justify-between w-full mt-1">
            <label htmlFor="sequenceTwo">
                Second Sequence: 
            </label>
            <input
                name="sequenceTwo"
                placeholder="Second Sequence"
                value={inputs.sequenceTwo}
                className="bg-stone-700 rounded-md px-2 py-1"
                onChange={handleChange} />
        </div>
        <div className="flex flex-row w-full justify-between mt-4 flex-wrap gap-1">
            <div className="flex flex-col items-start">
                <label htmlFor="sequenceTwo">
                    Match Score
                </label>
                <input
                    name="matchScore"
                    type="number"
                    placeholder="Match Score"
                    value={inputs.matchScore}
                    className="bg-stone-700 rounded-md px-2 py-1 text-amber-50"
                    onChange={handleChange} />
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="sequenceTwo">
                    Mismatch Score
                </label>
                <input
                    name="mismatchScore"
                    type="number"
                    placeholder="Mismatch Score"
                    value={inputs.mismatchScore}
                    className="bg-stone-700 rounded-md px-2 py-1 text-amber-50"
                    onChange={handleChange} />
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="sequenceTwo">
                    Gap Score
                </label>
                <input
                    name="gapScore"
                    type="number"
                    placeholder="Gap Score"
                    value={inputs.gapScore}
                    className="bg-stone-700 rounded-md px-2 py-1 text-amber-50"
                    onChange={handleChange} />
            </div>
        </div>
        <button className="mt-4 bg-stone-600 outline-2 outline-blue-50" onClick={handleSubmit}>Calculate Score</button>
    </div>
    );
}

export default InputComponent;