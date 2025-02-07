import React, { useState, useEffect } from 'react'
import axios from '../utils/axios';
const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Simular la llamada a la API para obtener el perfil del usuario
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/auth/profile'); // Ruta de la API para obtener el perfil del usuario
                setUserData(response.data);
            } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {userData ? ( // Mostrar los datos del usuario cuando se hayan obtenido
                <>
                    <h1>Bienvenido {userData.user.name}.</h1>
                    <p>{userData.user.email}</p>
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
}

export default Profile