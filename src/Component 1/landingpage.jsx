import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaSignInAlt, 
  FaBars, 
  FaSearch, 
  FaCreditCard, 
  FaFileInvoiceDollar, 
  FaChartLine, 
  FaUsersCog, 
  FaHeadset, 
  FaCloudDownloadAlt, 
  FaShieldAlt, 
  FaCheck,
  FaTimes,
  FaLightbulb,
  FaRocket,
  FaWhatsapp
} from 'react-icons/fa';
import '../Component Css/LandingPage.css';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openWhatsApp = () => {
    // Replace with your actual WhatsApp number
    window.open('https://wa.me/+918688349726', '_blank');
  };

  return (
    <div className="landing-page">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h2>Bellary<span>Billing</span></h2>
          </div>
          
          <div className="navbar-search">
            <div className="search-container">
              <input type="text" placeholder="Search..." />
              <button className="search-button"><FaSearch /></button>
            </div>
          </div>
          
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/features" className="navbar-link">Features</Link>
            <Link to="/pricing" className="navbar-link">Pricing</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <Link to="/login" className="navbar-link login-btn"><FaSignInAlt /> Login</Link>
            <Link to="/register/bellarybilling+550+software&kk$" className="navbar-link register-btn"><FaUser /> Register</Link>
            <Link to="/create-account" className="navbar-link register-btn"><FaUser /> Create Account</Link>
          </div>
          
          <div className="hamburger" onClick={toggleMenu}>
            <FaBars />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Smart Billing Solutions for Modern Businesses</h1>
          <p>Streamline your billing process, reduce errors, and get paid faster</p>
          <div className="hero-buttons">
            <Link to="/register/bellarybilling+550+software&kk$" className="btn btn-primary">Get Started Free</Link>
            <Link to="/demo" className="btn btn-secondary">Request Demo</Link>
          </div>
        </div>
      </div>

      {/* Features Overview Section */}
      <div className="features-section">
        <div className="section-title">
          <h2>Why Choose BellaryBilling?</h2>
          <p>Our comprehensive billing platform offers everything you need to manage your finances</p>
        </div>

        <div className="two-column-layout">
          {/* Left Column - Feature Menu */}
          <div className="features-menu">
            <div className="feature-card">
              <div className="feature-icon"><FaFileInvoiceDollar /></div>
              <div className="feature-text">
                <h3>Automated Invoicing</h3>
                <p>Create and send professional invoices automatically</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><FaCreditCard /></div>
              <div className="feature-text">
                <h3>Secure Payments</h3>
                <p>Accept payments through multiple gateways</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><FaChartLine /></div>
              <div className="feature-text">
                <h3>Financial Reports</h3>
                <p>Generate detailed reports and analytics</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><FaUsersCog /></div>
              <div className="feature-text">
                <h3>Client Management</h3>
                <p>Manage your customer database efficiently</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><FaCloudDownloadAlt /></div>
              <div className="feature-text">
                <h3>Cloud Storage</h3>
                <p>Access your data from anywhere, anytime</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Text Content */}
          <div className="features-content">
            <h2>Transform Your Billing Process</h2>
            <p className="lead-text">BellaryBilling helps you automate your entire billing workflow so you can focus on growing your business.</p>
            
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="check-icon"><FaCheck /></span>
                <p>Reduce manual errors by up to 95%</p>
              </div>
              <div className="benefit-item">
                <span className="check-icon"><FaCheck /></span>
                <p>Save 10+ hours per week on billing administration</p>
              </div>
              <div className="benefit-item">
                <span className="check-icon"><FaCheck /></span>
                <p>Get paid up to 14 days faster with automated reminders</p>
              </div>
              <div className="benefit-item">
                <span className="check-icon"><FaCheck /></span>
                <p>Generate comprehensive financial reports in seconds</p>
              </div>
              <div className="benefit-item">
                <span className="check-icon"><FaCheck /></span>
                <p>Seamless integration with your existing tools</p>
              </div>
            </div>
            
            <div className="cta-container">
              <Link to="/register/bellarybilling+550+software&kk$" className="btn btn-primary">Start Free Trial</Link>
              <p className="no-credit-card">No credit card required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="solutions-section">
        <div className="section-title">
          <h2>Solutions For Every Industry</h2>
          <p>Tailored billing solutions designed for your specific business needs</p>
        </div>
        
        <div className="solutions-grid">
          <div className="solution-card">
            <div className="solution-icon"><FaRocket /></div>
            <h3>Startups & SMBs</h3>
            <p>Affordable solutions to streamline your billing as you grow</p>
          </div>
          
          <div className="solution-card">
            <div className="solution-icon"><FaLightbulb /></div>
            <h3>E-commerce</h3>
            <p>Integrate with your store and automate order-to-cash</p>
          </div>
          
          <div className="solution-card">
            <div className="solution-icon"><FaHeadset /></div>
            <h3>Service Providers</h3>
            <p>Track time, expenses, and bill clients accurately</p>
          </div>
          
          <div className="solution-card">
            <div className="solution-icon"><FaShieldAlt /></div>
            <h3>Enterprise</h3>
            <p>Advanced features for complex billing requirements</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="section-title">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied businesses worldwide</p>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"BellaryBilling has completely transformed how we handle our invoicing. We've reduced our payment cycles by over 60% and saved countless hours on administrative tasks."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>Jane Smith</h4>
                <p>CFO, TechSolutions Inc.</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The automated reminders and payment tracking have dramatically improved our cash flow. I can't imagine running our business without BellaryBilling now."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>Michael Johnson</h4>
                <p>Owner, Johnson Consulting</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Simplify Your Billing?</h2>
          <p>Join thousands of businesses that trust BellaryBilling</p>
          <Link to="/register/bellarybilling+550+software&kk$" className="btn btn-large">Start Your Free 14-Day Trial</Link>
          <p className="cta-note">No credit card required. Cancel anytime.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>BellaryBilling</h3>
            <p>Your complete billing solution for modern businesses.</p>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Product</h3>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/integrations">Integrations</Link></li>
              <li><Link to="/updates">Updates</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/help-center">Help Center</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/webinars">Webinars</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/partners">Partners</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 BellaryBilling. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/security">Security</Link>
          </div>
        </div>
      </footer>

      {/* Chat and WhatsApp Buttons */}
      <div className="floating-buttons">
        <button 
          className="whatsapp-button"
          onClick={openWhatsApp}
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp />
        </button>
        
      </div>

      
    </div>
  );
};

export default LandingPage;
