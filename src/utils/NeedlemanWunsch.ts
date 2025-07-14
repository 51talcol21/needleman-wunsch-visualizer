interface NeedlemanResult {
    score: number;
    scoreMatrix: Array<Array<number>>;
    directionMatrix: Array<Array<string | string[]>>;
    alignedSequences: [string, string][];
}

interface TracebackSequence {
    i: number;
    j: number;
    alignedSequenceOne: string,
    alignedSequenceTwo: string,
}

export default function needlemanWunsch(sequenceOne: string, sequenceTwo: string, 
    matchScore: number, mismatchScore: number, gapScore: number): NeedlemanResult {
        const x: number = sequenceOne.length;
        const y: number = sequenceTwo.length;

        const scoreMatrix: Array<Array<number>> = Array(x + 1).fill(null).map(() => 
            Array(y + 1).fill(0)
        );

        const directionMatrix: Array<Array<string | string[]>> = Array(x + 1).fill(null).map(() => 
            Array(y + 1).fill(null)
        );

        for (let i = 0; i <= x; i++) {
            scoreMatrix[i][0] = i * gapScore;
            directionMatrix[i][0] = 'Up';
        }
        for (let j = 0; j <= y; j++) {
            scoreMatrix[0][j] = j * gapScore;
            directionMatrix[0][j] = 'Left';
        }

        directionMatrix[0][0] = "Done";

        // Skip first col/row since already calculated.
        for(let i = 1; i <= x; i++) {
            for(let j = 1; j <= y; j++) {
                // Where most of the dirty work is done.
                // Gonna iterate through each cell and calculate the score based on four factors per the algorithm itself.
                // Calculate the match/mismatch score (At this current index, are the two letters the same?)
                // Score Diagonal: Match score diagonal score.
                // Score Up: Gap Score + value above.
                // Score Left: Gap score + value left.

                const alignedScore: number = sequenceOne[i - 1] === sequenceTwo[j - 1] ? matchScore : mismatchScore;
                const diagonalScore: number = scoreMatrix[i-1][j-1] + alignedScore;
                const upScore = scoreMatrix[i-1][j] + gapScore;
                const leftScore = scoreMatrix[i][j-1] + gapScore;

                // Store in a hash-map just to get multiple directions.
                const scoreEntries: [number, string][] = [
                    [scoreMatrix[i - 1][j - 1] + alignedScore, 'Diagonal'],
                    [scoreMatrix[i - 1][j] + gapScore, 'Up'],
                    [scoreMatrix[i][j - 1] + gapScore, 'Left'],
                ];

                // Take the key values and find the max.
                const maxScore = Math.max(...scoreEntries.map(([score]) => score));

                // With the prior calculated max, iterate where the max is.
                const directions = scoreEntries
                    .filter(([score]) => score === maxScore)
                    .map(([, dir]) => dir);

                scoreMatrix[i][j] = Math.max(diagonalScore, upScore, leftScore);
                directionMatrix[i][j] = directions;
            }
        }

        // We will now backtrack using iteration rather than recursion (avoid heavy recursion limits).

        const initialIter: TracebackSequence = {
            i: x,
            j: y,
            alignedSequenceOne: '',
            alignedSequenceTwo: '',
        }

        const sequenceStack: TracebackSequence[] = [initialIter];

        const finalAlignments: [string, string][] = [];

        while (sequenceStack.length > 0) {
            //console.log(sequenceStack);
            const { i, j, alignedSequenceOne, alignedSequenceTwo} = sequenceStack.pop()!;

            // Base Case, we're at the beginning [0,0]
            if (i === 0 && j === 0) { 
                finalAlignments.push([alignedSequenceOne, alignedSequenceTwo]);
                continue;
             }

            const directions = directionMatrix[i]?.[j] || [];

            for (const eachDirection of directions) {
                if (eachDirection === "Diagonal") {
                    sequenceStack.push({
                        i: i - 1,
                        j: j - 1,
                        alignedSequenceOne: sequenceOne[i - 1] + alignedSequenceOne,
                        alignedSequenceTwo: sequenceTwo[j - 1] + alignedSequenceTwo,
                    })
                }
                else if (eachDirection === "Up") {
                    sequenceStack.push({
                        i: i - 1,
                        j: j,
                        alignedSequenceOne: sequenceOne[i - 1] + alignedSequenceOne,
                        alignedSequenceTwo: '-' + alignedSequenceTwo,
                    })
                }
                else if (eachDirection === "Left") {
                    sequenceStack.push({
                        i: i,
                        j: j - 1,
                        alignedSequenceOne: '-' + alignedSequenceOne,
                        alignedSequenceTwo: sequenceTwo[j - 1] + alignedSequenceTwo,
                    })
                }
            }
        }

    return {
        score: scoreMatrix[x][y],
        scoreMatrix,
        directionMatrix,
        alignedSequences: [...new Set(finalAlignments)],
    }
}