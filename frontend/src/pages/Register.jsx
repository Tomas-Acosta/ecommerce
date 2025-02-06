import React, { useState } from 'react'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la solicitud de registro al servidor
    };

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
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default Register