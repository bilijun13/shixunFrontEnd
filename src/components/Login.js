import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setToken }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        username_or_email: usernameOrEmail,
        password
      });
      setToken(response.data.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCirclePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 圆圈的尺寸
  const circleSize = 25;

  return (
    <div className="login-container">
      <div
        className="circle"
        style={{
          left: `${circlePosition.x - circleSize / 2}px`,
          top: `${circlePosition.y - circleSize / 2}px`,
          position: 'fixed', // 确保圆圈相对于视口定位
          transform: 'none' // 移除不必要的 transform
        }}
      ></div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;