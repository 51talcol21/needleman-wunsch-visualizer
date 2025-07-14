import { expect, test} from '@jest/globals';

const NeedlemanWunsch = require('./NeedlemanWunsch');

test('Expect Needleman Wunsch to correctly calculate score', () => {
    expect(NeedlemanWunsch("GCATGCG", "GATTACA", 1, -1, -1)).toEqual({
        score: 0,
        scoreMatrix: correctTestMatrix,
        directionMatrix: correctDirectionMatrix,
        alignedSequences: correctTestSequence,
    })
});

const correctTestMatrix = [
    [-0, -1,-2,-3,-4,-5,-6,-7],
    [-1,1,0,-1,-2,-3,-4,-5],
    [-2,0,0,-1,-2,-3,-2,-3],
    [-3,-1,1,0,-1,-1,-2,-1],
    [-4,-2,0,2,1,0,-1,-2],
    [-5,-3,-1,1,1,0,-1,-2],
    [-6,-4,-2,0,0,0,1,0],
    [-7,-5,-3,-1,-1,-1,0,0]
];

const correctDirectionMatrix = [
    ["Done","Left","Left","Left","Left","Left","Left","Left"],
    ["Up",["Diagonal"],["Left"],["Left"],["Left"],["Left"],["Left"],["Left"]],
    ["Up",["Up"],["Diagonal"],["Diagonal","Left"],["Diagonal","Left"],["Diagonal","Left"],["Diagonal"],["Left"]],
    ["Up",["Up"],["Diagonal"],["Left"],["Left"],["Diagonal"],["Left"],["Diagonal"]],
    ["Up",["Up"],["Up"],["Diagonal"],["Diagonal","Left"],["Left"],["Left"],["Up","Left"]],
    [ "Up",["Diagonal","Up"],["Up"],["Up"],["Diagonal"],["Diagonal","Left"],["Diagonal","Left"],
    ["Diagonal","Left"]],["Up",["Up"],["Up"],["Up"],["Diagonal","Up"],["Diagonal"],
    ["Diagonal"],["Left"]],["Up",["Diagonal","Up"],["Up"],["Up"],["Diagonal","Up"],
    ["Diagonal","Up"],["Up"],["Diagonal"]]]

const correctTestSequence = 
[
    [
        "GCATG-CG",
        "G-ATTACA"
    ],
    [
        "GCAT-GCG",
        "G-ATTACA"
    ],
    [
        "GCA-TGCG",
        "G-ATTACA"
    ]
]