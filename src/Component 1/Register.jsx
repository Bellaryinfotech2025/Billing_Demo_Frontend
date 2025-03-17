"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaUserAlt, FaEnvelope, FaLock, FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa"
import { RiRefreshLine } from "react-icons/ri"
import "../Component Css/Register.css"
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState("success")
  const [captchaText, setCaptchaText] = useState("")
  const [userCaptcha, setUserCaptcha] = useState("")
  const [captchaValid, setCaptchaValid] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const navigate = useNavigate()
  const notificationRef = useRef(null)

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha()
  }, [])

  // Close notification when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotification(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let captcha = ""
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(captcha)
    setUserCaptcha("")
    setCaptchaValid(false)
  }

  const validateCaptcha = () => {
    if (userCaptcha === captchaText) {
      setCaptchaValid(true)
      return true
    } else {
      setCaptchaValid(false)
      showToast("CAPTCHA verification failed", "error")
      return false
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!username.trim()) errors.username = "Username is required"
    if (!email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid"
    if (!password.trim()) errors.password = "Password is required"
    else if (password.length < 6) errors.password = "Password must be at least 6 characters"
    if (!name.trim()) errors.name = "Full name is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const showToast = (message, type = "success") => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)

    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const handleRegister = () => {
    if (!validateForm()) return

    if (!validateCaptcha()) return

    axios
      .post("http://localhost:8282/api/register", { username, email, password, name })
      .then((response) => {
        showToast("You are registered to our software successfully")

        // Clear the form fields
        setUsername("")
        setEmail("")
        setPassword("")
        setName("")
        setUserCaptcha("")

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      })
      .catch((error) => {
        showToast("Registration failed. Please try again.", "error")
      })
  }

  const handleGoogleSignIn = () => {
    // In a real app, this would integrate with Google OAuth
    showToast("Google Sign-In feature coming soon!", "info")
  }

  return (
    <div className="register-page">
      {/* Notification Toast */}
      {showNotification && (
        <div ref={notificationRef} className={`notification-toast ${notificationType}`}>
          <p>{notificationMessage}</p>
        </div>
      )}

      <div className="register-container">
        <div className="register-form-container">
          <div className="register-form">
            <h1>Sign Up</h1>
            <p className="form-subtitle">Join our community and start your journey</p>

            <div className="social-login">
              <button className="google-btn" onClick={handleGoogleSignIn}>
              <FcGoogle /> Sign up with Google
              </button>
            </div>

            <div className="divider">
              <span>or register with email</span>
            </div>

            <div className="input-group">
              {/* <FaUserAlt className="input-icon" /> &nbsp;&nbsp; */}
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={formErrors.username ? "error" : ""}
              />
            </div>
            {formErrors.username && <p className="error-message">{formErrors.username}</p>}

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={formErrors.email ? "error" : ""}
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
                className={formErrors.password ? "error" : ""}
              />
              <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {formErrors.password && <p className="error-message">{formErrors.password}</p>}

            <div className="input-group">
              {/* <FaUserTie className="input-icon" /> */}
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={formErrors.name ? "error" : ""}
              />
            </div>
            {formErrors.name && <p className="error-message">{formErrors.name}</p>}

            <div className="captcha-container">
              <div className="captcha-box">
                <span className="captcha-text">{captchaText}</span>
                <button className="refresh-captcha" onClick={generateCaptcha}>
                  <RiRefreshLine />
                </button>
              </div>
              <div className="input-group captcha-input">
                <input
                  type="text"
                  placeholder="Enter CAPTCHA"
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  value={userCaptcha}
                />
              </div>
            </div>

            <button className="register-button" onClick={handleRegister}>
              Sign Up
            </button>

            <p className="redirect-link">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>

            <p className="terms-text">
              By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>

        <div className="register-image-container">
          <div className="image-overlay">
            <h2>Welcome to Bellary Billing Software</h2>
            <p>Streamline your billing process with our powerful and intuitive platform</p>
            <div className="features">
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Easy invoice management</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Secure payment processing</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Comprehensive reporting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

