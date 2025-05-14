// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage"; // ajusta si está en otra carpeta
import Dashboard from "./pages/DashboardPage";
import TransactionsPage from "./transactions/pages/TransactionsPage.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import ImportMappingPage from "./transactions/pages/ImportMappingPage.tsx"; // si ya existe

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/import" element={<ImportMappingPage />} />
                </Route>
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;