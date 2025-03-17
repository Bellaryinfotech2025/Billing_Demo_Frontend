import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import '../Component Css/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    
    const navigate = useNavigate();
    const notificationRef = useRef(null);

    // Close notification when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotification(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const validateForm = () => {
        const errors = {};
        
        if (!email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
        
        if (!password.trim()) errors.password = 'Password is required';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const showToast = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const handleLogin = () => {
        if (!validateForm()) return;

        axios.post('http://localhost:8282/api/login', { email, password })
            .then(response => {
                if (response.status === 200) {
                    const user = response.data;
                    showToast('Login successful! Redirecting to dashboard...');
                    
                    // Redirect after showing toast
                    setTimeout(() => {
                        navigate(`/welcome/${user.username}`);
                    }, 1500);
                } else {
                    showToast('Invalid credentials');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    showToast('Invalid email or password');
                } else {
                    showToast('Login failed. Please try again.');
                }
            });
    };

    const handleGoogleSignIn = () => {
        // In a real app, this would integrate with Google OAuth
        showToast('Google Sign-In feature coming soon!');
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-page">
            {/* Toast Notification */}
            {showNotification && (
                <div ref={notificationRef} className="notification-toast">
                    <p>{notificationMessage}</p>
                </div>
            )}
            
            <div className="login-container">
                <div className="login-form-container">
                    <div className="login-form">
                        <div className="logo-container">
                            <h1>Bellary<span>Billing</span></h1>
                        </div>
                        
                        <h2>Sign In</h2>
                        <p className="form-subtitle">Welcome back! Please enter your details</p>
                        
                        <div className="social-login">
                            <button className="google-btn" onClick={handleGoogleSignIn}>
                                <FaGoogle /> Sign in with Google
                            </button>
                        </div>
                        
                        <div className="divider">
                            <span>or continue with email</span>
                        </div>
                        
                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className={formErrors.email ? 'error' : ''}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                        
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className={formErrors.password ? 'error' : ''}
                                onKeyPress={handleKeyPress}
                            />
                            <div 
                                className="password-toggle" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                        
                        <div className="login-options">
                            <div className="remember-me">
                                <input 
                                    type="checkbox" 
                                    id="remember" 
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>
                        
                        <button 
                            className="login-button" 
                            onClick={handleLogin}
                        >
                            Sign In
                        </button>
                        
                        <p className="redirect-link">
                            Don't have an account? <Link to="/register/bellarybilling+550+software&kk$" className="register-link">Sign up</Link>
                        </p>
                    </div>
                </div>
                
                <div className="login-image-container">
                    <div className="image-overlay">
                        <h2>Streamline Your Billing Process</h2>
                        <p>Access powerful tools to manage invoices, track payments, and generate reports with ease.</p>
                        
                        <div className="feature-hexagons">
                            <div className="hexagon">
                                <div className="hexagon-content">
                                    <div className="hexagon-icon">📊</div>
                                    <div className="hexagon-title">Reports</div>
                                </div>
                            </div>
                            <div className="hexagon">
                                <div className="hexagon-content">
                                    <div className="hexagon-icon">📝</div>
                                    <div className="hexagon-title">Invoices</div>
                                </div>
                            </div>
                            <div className="hexagon">
                                <div className="hexagon-content">
                                    <div className="hexagon-icon">💼</div>
                                    <div className="hexagon-title">Clients</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="login-footer">
                            <p>Bellary Billing Software — Simplifying financial management</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
