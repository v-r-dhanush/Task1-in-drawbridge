import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const checkUser = async (e) => {
        e.preventDefault();

        if (!Username || !Password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("https://localhost:7187/api/Login/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Username, Password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate('/dashboard');
            } else {
                setError(data.message || "Login failed.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={checkUser}>
                {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

                <input
                    type='text'
                    placeholder='Username'
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type='password'
                    placeholder='Password'
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>

                {/* <div className="register">
                    <p>Don't have an account? <a href="/register">Register here</a></p>
                </div> */}
            </form>
        </div>
    );
};

export default Login;
