import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaIdCard,
  FaMapMarkerAlt,
  FaUpload,
  FaCheck,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";
import "../Component Css/CreateAccount.css";
 

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    businessType: "",
    taxId: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    profileImage: null,
  });

  const [showChatbot, setShowChatbot] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the data to your backend
    console.log("Form submitted:", formData);

    // Show success message and redirect
    alert("Account created successfully! Redirecting to dashboard...");
    navigate("/dashboard");
  };

  return (
    <div className="create-account-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">
              <h1>
                Bellary<span>Billing</span>
              </h1>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/register/bellarybilling+550+software&kk$" className="login-btn">
              Register
            </Link>
          </div>
        </div>
      </nav>

      <div className="create-account-container">
        {/* Software Info Section */}
        <div className="software-info-section">
          <div className="info-header">
            <h2>Welcome to Bellary Billing Software</h2>
            <p>The complete billing solution for modern businesses</p>
          </div>
          
          <div className="info-features">
            <div className="feature-card">
              <div className="feature-icon">
                <FaCheck />
              </div>
              <div className="feature-content">
                <h3>Streamlined Invoicing</h3>
                <p>Create and send professional invoices in seconds with customizable templates</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaCheck />
              </div>
              <div className="feature-content">
                <h3>Secure Payment Processing</h3>
                <p>Accept payments online with multiple gateways including Stripe, PayPal and more</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaCheck />
              </div>
              <div className="feature-content">
                <h3>Comprehensive Reporting</h3>
                <p>Gain insights with detailed financial reports and customizable dashboards</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaCheck />
              </div>
              <div className="feature-content">
                <h3>Client Management</h3>
                <p>Maintain detailed client profiles and payment histories in one place</p>
              </div>
            </div>
          </div>
          
          <div className="info-testimonial">
            <p>"Switching to Bellary Billing was the best decision for our business. The platform is intuitive, powerful, and has saved us countless hours on billing tasks."</p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Emma Rodriguez" />
              <div>
                <h4>Emma Rodriguez</h4>
                <p>CFO, Global Innovations</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Account Form Section */}
        <div className="account-form-section">
          <div className="form-header">
            <h2>Create Your Account</h2>
            <p>Fill in your details to get started with Bellary Billing</p>
          </div>
          
          <form onSubmit={handleSubmit} className="account-form">
            <div className="profile-upload">
              <div 
                className="upload-container" 
                onClick={triggerFileInput}
              >
                {formData.profileImage ? (
                  <img 
                    src={formData.profileImage || "/placeholder.svg"} 
                    alt="Profile Preview" 
                    className="profile-preview" 
                  />
                ) : (
                  <div className="upload-placeholder">
                    <FaUpload />
                    <span>Upload Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
            
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <FaPhone className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Business Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name</label>
                  <div className="input-with-icon">
                    <FaBuilding className="input-icon" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Business Type</label>
                  <div className="select-wrapper">
                    <select 
                      name="businessType" 
                      value={formData.businessType} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="" disabled>Select business type</option>
                      <option value="sole_proprietorship">Sole Proprietorship</option>
                      <option value="partnership">Partnership</option>
                      <option value="llc">Limited Liability Company (LLC)</option>
                      <option value="corporation">Corporation</option>
                      <option value="nonprofit">Non-profit Organization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Tax ID / EIN</label>
                <div className="input-with-icon">
                  <FaIdCard className="input-icon" />
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    placeholder="Enter your Tax ID or EIN"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Business Address</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your street address"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>ZIP/Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your ZIP code"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Country</label>
                  <div className="select-wrapper">
                    <select 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="India">India</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="terms-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            
            <button type="submit" className="submit-btn">
              Create Account <FaArrowRight />
            </button>
            
            <p className="login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
            
          </form>
        </div>
      </div>

      {/* AI Chatbot */}
      
    </div>
  );
};

export default CreateAccount;
