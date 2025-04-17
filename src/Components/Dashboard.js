import React, { useState } from "react";
import Logo from "../assests/cover_logo.svg";
import btn from "../assests/chat_white_bg.png";
import './Dashboard.css'; 
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [prompt, setPrompt] = useState('');

    const savePrompt = (value) => {
        setPrompt(value);
        console.log("Prompt:", value); 
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
        if (prompt.trim()) {
            navigate("/chatInterface"); 
        }
    };

    return (
        <div className="wrapper">
            <div className="hero">
                <div className="logo">
                    <a href="/dashboard"><img src={Logo} alt="logo" /></a>
                </div>
                <h1 className="hero-text">
                    <span>Your Intelligent</span>
                    <span>Data Assistant</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="prompt-section">
                        <input
                            type="text"
                            name="prompt"
                            placeholder="Type your prompt here"
                            value={prompt}
                            onChange={(e) => savePrompt(e.target.value)}
                        />
                        <button type="submit" className="prompt-submit-btn">
                            <img src={btn} alt="white-chat" />
                            Ask to Chatbot
                        </button>
                    </div>
                </form>
            </div>
            <footer>
                <p>©2025 Changepond. All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default Dashboard;
