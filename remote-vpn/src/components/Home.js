import React, { useEffect, useState } from 'react';
import './Home.css';
import power_icon from './assets/power.png'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [userName, setUserName] = useState("");
    const [toggled, setToggled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const handleToggleOn = () => {
        console.log("Toggle is ON");
        document.body.style.background = 'linear-gradient(#4ea71a, #888686)';
        // --- Toggle is on logic ---
    };

    const handleToggleOff = () => {
        console.log("Toggle is OFF");
        document.body.style.background = 'linear-gradient(#bf1f1f, #888686)';
        // --- Toggle is off logic ---
    };

    const handleChangeIP = () => {
        setModalMessage('IP address has been changed!');
        setShowModal(true);
        // --- Changing IP address logic ---
    };

    const handleSignOut = () => {
        if (toggled) {
            setModalMessage('Please turn off the VPN before signing out!');
        } else {
            localStorage.removeItem('userName');
            setUserName('');
            navigate('/login')
            // --- Signing out logic here ---
        }
        setShowModal(true);
    };

    const handleToggleChange = () => {
        setToggled(prevState => {
            const newState = !prevState;
            if (newState !== prevState) {
                if (newState) {
                    handleToggleOn();
                } else {
                    handleToggleOff();
                }
            }
            return newState;
        });
    };

    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setShowModal(false);
        }, 300);
    };

    return (
        <div className='container'>
            <div className='homeHeader'>
                <div className='homeText'>
                    {userName ? (
                        <h1>Welcome {userName}!</h1>
                    ) : (
                        <h1>Welcome!</h1>
                    )}
                </div>
                <div className='homeUnderline'></div>
            </div>

            <div className="vpn-status-label">
                {toggled ? "VPN is ON" : "VPN is OFF"}
            </div>

            <div>
                <button 
                    className={`toggle-btn ${toggled ? "toggled" : ""}`}
                    onClick={handleToggleChange}
                >
                    <div className="thumb">
                        <img src={power_icon} alt='' />
                    </div>
                </button>
            </div>

            <button className="change-ip-btn" onClick={handleChangeIP}>Change IP Address</button>

            <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>

            {showModal && (
                <div className={`modal-overlay ${isClosing ? 'closing' : ''}`}>
                    <div className={`modal-content ${isClosing ? 'closing' : ''}`}>
                        <p>{modalMessage}</p>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
