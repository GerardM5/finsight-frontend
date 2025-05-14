import { useState } from "react";

const columnOptions = ["Description", "Date", "Amount", "Ignore"];

export default function ImportTransactionsPage() {
    const [file, setFile] = useState<File | null>(null);
    const [csvPreview, setCsvPreview] = useState<string[][]>([]);
    const [columnMapping, setColumnMapping] = useState<string[]>(["", "", "", ""]);

    const handleColumnChange = (index: number, value: string) => {
        const newMapping = [...columnMapping];
        newMapping[index] = value;
        setColumnMapping(newMapping);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                const rows = text
                    .split("\n")
                    .map((row) => row.split(",").map((cell) => cell.trim()))
                    .filter((row) => row.length > 1);
                setCsvPreview(rows.slice(0, 5)); // solo las primeras 5 filas
            };
            reader.readAsText(selectedFile);
        }
    };

    const handleImport = () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("mapping", JSON.stringify(columnMapping));

        fetch("http://localhost:8080/transactions/import/custom", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error importing file");
                return res.text();
            })
            .then(alert)
            .catch((err) => alert(err.message));
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Import Transactions</h1>

            <div className="mb-4">
                <label className="block mb-2 font-medium">Upload CSV file</label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <div className="mb-4">
                <h2 className="font-semibold mb-2">Column Mapping</h2>
                {columnMapping.map((value, index) => (
                    <div key={index} className="mb-2">
                        <label className="block mb-1">Column {index + 1}</label>
                        <select
                            value={value}
                            onChange={(e) => handleColumnChange(index, e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                        >
                            <option value="">Select...</option>
                            {columnOptions.map((opt) => (
                                <option key={opt} value={opt.toUpperCase()}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            {csvPreview.length > 0 && (
                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Preview</h2>
                    <table className="w-full table-auto border border-collapse border-gray-300 text-sm">
                        <thead>
                            <tr>
                                {csvPreview[0].map((_, idx) => (
                                    <th key={idx} className="border p-2 bg-gray-100">
                                        Column {idx + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvPreview.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border p-2">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                onClick={handleImport}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Import
            </button>
        </div>
    );
}