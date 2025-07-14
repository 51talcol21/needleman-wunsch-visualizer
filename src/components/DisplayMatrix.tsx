import { useState } from "react";

type MatrixDisplayProps = {
    matrix: string[][];
    directionsMatrix: string[][];
    scoreMatrix: number[][];
    rowLabels?: string[];
    colLabels?: string[];
};

interface Point {
    x: number,
    y: number,
}

export default function MatrixDisplay({ matrix, directionsMatrix, scoreMatrix, rowLabels = [], colLabels = [] }: MatrixDisplayProps) {
    const [hoveredCell, setHoveredCell] = useState<Point | null>(null);

    return (
        <div className="w-full overflow-x-auto">
            <table className="border-collapse w-max table-fixed">
        <thead>
            <tr>
                <th></th>
                {colLabels.map((label, idx) => (
                    <th key={idx} className={labelClasses}>{label}</th>
                ))}
            </tr>
        </thead>
            <tbody>
                {matrix.map((row, i) => (
                <tr key={i}>
                    <th className={labelClasses}>
                        {rowLabels[i] || ''}
                    </th>
                    { row.map((_cell, j) => {
                        const isCurrent = hoveredCell?.x === i && hoveredCell?.y === j;
                        const hoveredValue = hoveredCell ? directionsMatrix[hoveredCell.x]?.[hoveredCell.y] : null;
                        const shouldHighlightDiagonal = hoveredValue?.includes('Diagonal') && (hoveredCell!.x - 1 === i) && (hoveredCell!.y - 1 === j);
                        const shouldHighlightUp = hoveredValue?.includes('Up') && (hoveredCell!.x - 1 === i) && (hoveredCell!.y === j);
                        const shouldHighlightLeft = hoveredValue?.includes('Left') && (hoveredCell!.x === i) && (hoveredCell!.y - 1 === j);

                        const isHovered = hoveredCell &&
                        (
                          (hoveredCell.x === i && hoveredCell.y === j) ||
                          (hoveredCell.x - 1 === i && hoveredCell.y === j) ||
                          (hoveredCell.x === i && hoveredCell.y - 1 === j) ||
                          (hoveredCell.x - 1 === i && hoveredCell.y - 1 === j)
                        );

                        return (
                            <td key={j} 
                                className={
                                    `${isCurrent ? 'bg-yellow-800 text-violet-50 border-2 border-cyan-700' : ''}` +
                                    `${shouldHighlightDiagonal ? 'bg-fuchsia-700 font-bold' : ''}` +
                                    `${shouldHighlightUp ? 'bg-fuchsia-700 font-bold' : ''}` +
                                    `${shouldHighlightLeft ? 'bg-fuchsia-700 font-bold' : ''}` +
                                    `${isHovered ? 'bg-stone-600 text-violet-50 border-2 border-cyan-700' : ''}` +
                                    cellClasses}
                                onMouseEnter={() => {
                                    setHoveredCell({ x: i, y: j })
                                }}
                                onMouseLeave={() => setHoveredCell(null)}>
                                <span className="text-blue-300"> {Array.isArray(directionsMatrix[i][j]) ? (directionsMatrix[i][j].join(', ')) : ''} </span> <br />
                                <span>
                                    {directionsMatrix[i][j]?.includes('Left') ? '←' : ''}
                                    {directionsMatrix[i][j]?.includes('Diagonal') ? '↖' : ''}
                                    {directionsMatrix[i][j]?.includes('Up') ? '↑' : ''}
                                </span> <br />
                                {scoreMatrix[i][j]}
                            </td>
                        )
                    }
                    )}
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

const cellClasses = "border-2 border-cyan-700 p-2 text-center min-w-10";
const labelClasses = "border-2 border-amber-300 p-2 text-center min-w-10";