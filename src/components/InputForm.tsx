import { useState } from 'react';

function InputComponent({ onSubmit }) {
    const [inputs, setInputs] = useState({
        sequenceOne: '',
        sequenceTwo: '',
        matchScore: 1,
        mismatchScore: -1,
        gapScore: -1

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(inputs);
    };

  return (
    <div className="flex flex-col items-center">
        <div className="self-start flex justify-between w-full">
            <label htmlFor="sequenceOne">
                First Sequence: 
            </label>
            <input
                name="sequenceOne"
                placeholder="First Sequence"
                value={inputs.sequenceOne}
                onChange={handleChange} />
        </div>
        <div className="self-start flex justify-between w-full">
            <label htmlFor="sequenceTwo">
                Second Sequence: 
            </label>
            <input
                name="sequenceTwo"
                placeholder="Second Sequence"
                value={inputs.sequenceTwo}
                onChange={handleChange} />
        </div>
        <div className="flex flex-row">
            <div className="flex flex-col items-start">
                <label htmlFor="sequenceTwo">
                    Match Score
                </label>
                <input
                    name="matchScore"
                    type="number"
                    placeholder="Match Score"
                    value={inputs.matchScore}
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
                    onChange={handleChange} />
            </div>
        </div>
        <button onClick={handleSubmit}>Calculate Score</button>
    </div>
    );
}

export default InputComponent;