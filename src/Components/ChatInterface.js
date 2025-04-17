import React, { useState, useEffect, useRef } from "react";
import "./ChatInterface.css";
import asktechLogo from "../assests/asktech_logo.svg";
import homeIcon from "../assests/home-2.png";
import addIcon from "../assests/add.png";
import user from "../assests/user_icon.png"
import arrowForward from "../assests/arrow_forward.png";

const ChatInterface = () => {
  const [sidebarMini, setSidebarMini] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const chatAreaRef = useRef(null);

  const handleToggleSidebar = () => {
    setSidebarMini((prev) => !prev);
  };

  const handleNewChat = () => {
    setChatMessages([]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      type: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    setTimeout(() => {
      const botMessage = {
        type: "bot",
        text: "An error occurred while sending/processing your request. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1500); // Simulate API delay
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="container">
      <aside className={`sidebar ${sidebarMini ? "mini" : ""}`}>
        <div className="logo">
          <h3>
            <a href="#">
              <img src={asktechLogo} alt="logo" />
              <span className="logo-text">AskTech</span>
            </a>
          </h3>
        </div>
        <button className="toggle-btn" onClick={handleToggleSidebar}></button>
        <nav>
          <ul className="menu-list">
            <li>
              <a href="/dashboard" className="active">
                <img className="menu-icon" src={homeIcon} alt="Home Icon" />
                <span className="menu-text">Home</span>
              </a>
            </li>
            <li>
              <button id="chat-menu" onClick={handleNewChat}>
                <a href="#" className="new-chat">
                  <img src={addIcon} alt="New Chat Icon" />
                  <span className="menu-text">New Chat</span>
                </a>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="chat-section">
        <div className="chat-area" ref={chatAreaRef}>
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.type === "user" ? "user" : "bot"}`}
            >
              {msg.type === "user" ? (
                <>
                  <div>
                    <div className="message user-prompt">
                    <span>
                    <img src={user} alt="User" />
                    </span>
                      <pre>{msg.text}</pre>
                    </div>
                    <span className="timestamp">{msg.time}</span>
                  </div> 
                </>
              ) : (
                <>
                  <span>
                    <img src={asktechLogo} alt="Bot" />
                  </span>
                  <div>
                    <div className="message-content">
                      <p className="title response-type">Bot</p>
                      <div className="message">
                        <pre className="response-content">{msg.text}</pre>
                      </div>
                    </div>
                    <span className="timestamp">{msg.time}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Type your message to AskTech"
            maxLength="500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-primary ms-3 d-flex align-items-center"
            onClick={handleSend}
            disabled={loading}
          >
            <img src={arrowForward} alt="Send Icon" />
          </button>
        </div>

        {loading && <div id="loading-spinner" className="spinner"></div>}
      </main>
    </div>
  );
};

export default ChatInterface;
