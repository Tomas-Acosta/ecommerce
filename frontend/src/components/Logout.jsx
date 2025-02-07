import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local al cerrar sesión
        history.push('/login'); // Redirigir al usuario después de cerrar sesión

    };

    return (
        <button onClick={handleLogout}>Cerrar sesión</button>
    );
};

export default Logout;