import React, { useState } from 'react'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Establecer el estado de carga en true
        setError(null); // Limpiar el estado de error

        const data = {
            name,
            email,
            password
        };

        try {
            const response = fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (response.ok) {
                // Si la respuesta es exitosa, puedes redirigir al usuario a la página de inicio de sesión
                alert('Usuario registrado exitosamente');
            } else {
                // Si la respuesta es un error, puedes mostrar un mensaje de error al usuario
                setError(result.message || 'Error al registrar el usuario');
            }
        } catch (error) {
            setError('Error al registrar el usuario', error);
        } finally {
            setLoading(false); // Establecer el estado de carga en false
        }}

    return (
        <div>
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Registrarse'}</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default Register