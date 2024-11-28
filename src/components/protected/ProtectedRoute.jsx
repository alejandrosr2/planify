import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // Comprobar si el usuario está autenticado a través de localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;  // Si está autenticado, renderiza las rutas protegidas
};

export default ProtectedRoute;
