import Sidebar from "./components/Sidebar.tsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-4 h-screen bg-gray-100">
            <Sidebar />
            <main className="flex justify-center overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}