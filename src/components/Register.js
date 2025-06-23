import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import './Login.css'; // 引入 Login.css 以使用圆圈的样式

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

    const validateForm = () => {
        if (!username || !email || !password) {
            setError('All fields are required');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                await axios.post('http://localhost:5000/auth/register', {
                    username,
                    email,
                    password
                });
                console.log('User registered successfully');
            } catch (error) {
                console.error(error);
                setError('Registration failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
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
        <div className="register-container">
            <div
                className="circle"
                style={{
                    left: `${circlePosition.x - circleSize / 2}px`,
                    top: `${circlePosition.y - circleSize / 2}px`,
                    position: 'fixed', // 确保圆圈相对于视口定位
                    transform: 'none' // 移除不必要的 transform
                }}
            ></div>
            <div className="register-form">
                <h2>Register</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <button type="submit" onClick={handleSubmit} disabled={isLoading} className="register-button">
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </div>
        </div>
    );
};

export default Register;