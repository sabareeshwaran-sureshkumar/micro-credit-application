/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import AuthContext from "../../context/AuthContext";
import { RegisterUser } from "../../services/auth/authService";
import './registerUser.css';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[response,setResponse] = useState("");
    const navigate = useNavigate();



    const handleRegistration = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = response.json()
            data.then(response => setResponse(response.message))
             if(data){
                navigate('/dashboard')
         }

        } catch (error) {
            // Handle any errors that occur during registration
            alert("Registration error:", error.message);
            alert(error.message);
        }
    };

    
    return (
        <div className="wrapper">
            <form onSubmit={handleRegistration}>
                <h1>Register</h1>
                <center><p  class="message">{response ? response : ""}</p></center>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <MdEmail className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className="icon" />
                </div>

              
                    <div className="input-box">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <FaLock className="icon" />
                    </div>

                    {/* <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div> */}

                <button type="submit">Register</button>

                <div className="register-link">
                    <p>Already have an account? <a href="#" onClick={() => navigate("/login")}>Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;