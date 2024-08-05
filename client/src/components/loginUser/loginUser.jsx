import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './loginUser.css';
import AuthContext from "../../context/AuthContext";
import { LoginUser } from "../../services/auth/authService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [responseMessage, setResponseMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            await LoginUser(userData, setAuth);

            // Send login request to backend server
            const response = await fetch('http://localhost:5000/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const responseData = await response.json();
                // Authentication successful, redirect to dashboard
                setResponseMessage(responseData.message || "Login successful");
                navigate("/Homepage");
            } else {
                // Authentication failed, display error message
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setResponseMessage(error.message || 'An error occurred during sign-in');
        }
    };

    useEffect(() => {}, [auth, navigate]);

    return (
        <div className="wrapper">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <center><p>{responseMessage ? responseMessage : ""}</p></center>
                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <MdEmail className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <FaLock className="icon" />
                </div>

                {/* <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <button 
                        type="button" 
                        className="link-button" 
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot password?
                    </button>
                </div> */}

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>
                        Don't have an account? 
                        <button 
                            type="button" 
                            className="link-button" 
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
