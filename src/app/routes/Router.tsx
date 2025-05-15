import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../../pages/login/LoginPage.tsx";
import MainLayout from "../layout/MainLayout.tsx";
import Dashboard from "../../pages/dashboard/DashboardPage.tsx";
import TransactionsPage from "../../pages/transaction/TransactionsPage.tsx";
import ImportMappingPage from "../../pages/transaction/ImportMappingPage.tsx";

export const Router = () => {
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