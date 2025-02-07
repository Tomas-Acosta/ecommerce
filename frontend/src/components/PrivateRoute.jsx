import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth para obtener el estado de autenticación

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Verifica el estado de autenticación
    console.log('isAuthenticated',isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;