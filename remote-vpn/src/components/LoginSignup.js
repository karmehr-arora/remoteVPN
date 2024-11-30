import React, {useState} from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import user_icon from './assets/person.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        setError("");
        if (action === "Sign Up") {
            if (name.trim() === "") {
                setError("Name is required for signing up.");
                return;
            }
            if (!validEmail(email)) {
                setError("Invalid email format.");
                return;
            }
            if (!validPassword(password)) {
                setError("Password must be at least 8 characters long.");
                return;
            }
    
            // Meant to check that a user already exists. Actually implement this check in the backend.
            const existingUsers = [
                { email: "test@example.com", password: "password123" }
            ];
    
            const userExists = existingUsers.some((user) => user.email === email);
            if (userExists) {
                setError("Email is already registered. Please log in.");
                return;
            }
    
            console.log("Signing up submit pressed");
            console.log("User data:", { name, email, password });
            alert("Signup successful (frontend only)");
            // Tests passed. Forward the data to the backend from here
            navigate('/home');
        }
    
        if (action === "Login") {
            if (!validEmail(email)) {
                setError("Invalid email format.");
                return;
            }
            if (password.trim() === "") {
                setError("Password is required.");
                return;
            }
    
            // Same as before, check that the user exists in the backend. Also need to actually implement this
            const existingUsers = [
                { email: "test@example.com", password: "password123" }
            ];
    
            const validUser = existingUsers.find(
                (user) => user.email === email && user.password === password
            );
    
            if (!validUser) {
                setError("Invalid email or password.");
                return;
            }
    
            console.log("Logging in submit pressed");
            alert("Login successful (for frontend testing purposes only)");
            // Proceed with login to the backend
            navigate('/home');
        }
    };

    const validEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validPassword = (password) => {
        return password.length >= 8;
    };

    

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>

            <div className='submit-container'>
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={() => { setAction('Sign Up') }}
                >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => { setAction('Login') }}
                >
                    Login
                </div>
            </div>

            <div className='inputs'>
                {action === "Login" ? <div></div> : (
                    <div className='input'>
                        <img src={user_icon} alt='' />
                        <input 
                            type='text' 
                            placeholder='Name' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}

                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input 
                        type='text' 
                        placeholder='Email ID' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            {error && <div className='error'>{error}</div>}

            <div className='submit-button'>
                <button 
                    type='button' 
                    className='btn' 
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default LoginSignup;
