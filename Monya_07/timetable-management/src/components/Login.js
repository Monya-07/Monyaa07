import React from "react";
import { loginWithGoogle } from "../firebase"; // Ensure correct path
import { useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
