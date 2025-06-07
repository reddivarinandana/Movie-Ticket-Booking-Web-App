import React from "react";

const LoginModal = ({ email, password, setEmail, setPassword, onLogin, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-contents">
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <div className="modal-buttons">
          <button onClick={onLogin} className="modal-btn">Login</button>
          <button onClick={onClose} className="modal-btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
