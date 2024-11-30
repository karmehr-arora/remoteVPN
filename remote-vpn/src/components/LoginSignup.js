import React, {useState} from 'react';
import './LoginSignup.css';
import user_icon from './assets/person.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState(""); // For "Sign Up" name field
    const [email, setEmail] = useState(""); // For email field
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        setError("");

        if (action === "Sign Up" && name.trim() === "") {
            setError("Name is required for signing up.");
            return;
        }
        if (email.trim() === "") {
            setError("Email is required.");
            return;
        }
        if (password.trim() === "") {
            setError("Password is required.");
            return;
        }

        if (action === "Login") {
            console.log("Logging in submit pressed");
            // Login logic
        } else {
            console.log("Signing up submit pressed");
            // Signup logic
        }
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
                        type='text' 
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
