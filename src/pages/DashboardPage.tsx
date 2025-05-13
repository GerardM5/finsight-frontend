import { useEffect, useState } from "react";
import api from "../api/axios"; // tu instancia con interceptor
import { useNavigate } from "react-router-dom";

type MonthlySummary = {
    month: string;
    income: number;
    expense: number;
    net: number;
};

export default function Dashboard() {
    const [summary, setSummary] = useState<MonthlySummary[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await api.get("/stats/monthly-summary");
                setSummary(res.data);
            } catch (err) {
                console.error(err);
                navigate("/login"); // si falla, redirige al login
            }
        };

        fetchSummary();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Monthly Summary</h1>
            <table className="w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-gray-200 text-left">
                <tr>
                    <th className="p-2">Month</th>
                    <th className="p-2">Income</th>
                    <th className="p-2">Expense</th>
                    <th className="p-2">Net</th>
                </tr>
                </thead>
                <tbody>
                {summary.map((s) => (
                    <tr key={s.month} className="border-t">
                        <td className="p-2">{s.month}</td>
                        <td className="p-2 text-green-600">+{s.income.toFixed(2)}</td>
                        <td className="p-2 text-red-600">-{s.expense.toFixed(2)}</td>
                        <td className="p-2 font-bold">{s.net.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}