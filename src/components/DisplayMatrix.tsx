type MatrixDisplayProps = {
    matrix: string[][];
    rowLabels?: string[];
    colLabels?: string[];
};

export default function MatrixDisplay({ matrix, rowLabels = [], colLabels = [] }: MatrixDisplayProps) {
    return (
        <table className="border-collapse">
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
                    <th className={labelClasses}>{rowLabels[i] || ''}</th>
                        { row.map((cell, j) => (
                    <td key={j} className={cellClasses}>
                        {Array.isArray(cell) ? (cell.join(', ')) : cell}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    );
}

const cellClasses = "border-2 border-cyan-700 p-2 text-center min-w-10";
const labelClasses = "border-2 border-amber-300 p-2 text-center min-w-10";