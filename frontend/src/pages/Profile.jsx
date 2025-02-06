import React, { useState, useEffect } from 'react'
const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simular la llamada a la API para obtener el perfil del usuario
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/users/profile');
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            {user ? (
                <>
                    <h1>Bienvenido {user.name}.</h1>
                    <p>{user.email}</p>
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
}

export default Profile