import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario después de iniciar sesión

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Guardar el token en el almacenamiento local
            history.push('/profile'); // Redirigir al usuario después de iniciar sesión
        } catch (error) {
            setError('Error al iniciar sesión', error);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin}>
                <h2>Iniciar sesión</h2>
                <label>
                    Correo electrónico:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}

export default Login