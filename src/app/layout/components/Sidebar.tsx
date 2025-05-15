import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="text-2xl font-bold p-6 border-b border-gray-700">
                FinSight
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded ${
                            isActive ? "bg-gray-700" : "hover:bg-gray-700"
                        }`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded ${
                            isActive ? "bg-gray-700" : "hover:bg-gray-700"
                        }`
                    }
                >
                    Transactions
                </NavLink>
                <NavLink
                    to={"/import"}
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded ${
                            isActive ? "bg-gray-700" : "hover:bg-gray-700"
                        }`
                    }
                >
                    Import Transactions
                </NavLink>
            </nav>
            <button
                onClick={logout}
                className="m-4 p-2 bg-red-600 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
}