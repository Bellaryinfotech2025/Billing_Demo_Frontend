import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import '../Component Css/Homepage.css';

const AIChatbot = ({ username }) => {
  const [messages, setMessages] = useState([
    {
      text: `Hello ${username}! I'm your Billing Software Assistant. How can I help you today?`,
      sender: 'ai'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateResponse(inputValue);
      setMessages(prevMessages => [...prevMessages, {
        text: aiResponse,
        sender: 'ai'
      }]);
      setIsTyping(false);
    }, 1000);
  };

  // Simple response generation based on user input
  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Greetings
    if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
      return `Hello there! How can I assist you with your billing software needs today?`;
    }
    
    // About the software
    if (lowerInput.includes('about') && (lowerInput.includes('software') || lowerInput.includes('billing'))) {
      return `Our billing software is a comprehensive solution designed to streamline your invoicing, payment tracking, and financial reporting. It offers features like automated billing, customizable invoice templates, payment reminders, and detailed analytics.`;
    }
    
    // Features
    if (lowerInput.includes('feature') || lowerInput.includes('can') || lowerInput.includes('do')) {
      return `Our billing software includes features such as:
      • Automated recurring billing
      • Customizable invoice templates
      • Multiple payment gateway integrations
      • Customer portal for self-service
      • Comprehensive reporting and analytics
      • Tax calculation and management
      • Multi-currency support
      • Subscription management`;
    }
    
    // Pricing
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('subscription')) {
      return `We offer flexible pricing plans to suit businesses of all sizes. Our plans start at $29/month for small businesses, with premium plans offering additional features for larger enterprises. Would you like me to provide more details about a specific plan?`;
    }
    
    // Support
    if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('issue')) {
      return `We provide 24/7 customer support through chat, email, and phone. Our knowledge base also contains detailed guides and tutorials to help you get the most out of our billing software. Is there a specific issue you need help with?`;
    }
    
    // Integration
    if (lowerInput.includes('integrate') || lowerInput.includes('connection') || lowerInput.includes('api')) {
      return `Our billing software integrates seamlessly with popular accounting platforms, CRM systems, payment gateways, and e-commerce platforms. We also provide a robust API for custom integrations with your existing systems.`;
    }
    
    // Default response
    return `Thank you for your question. Our billing software is designed to make your financial operations more efficient. Can you provide more details about what you'd like to know?`;
  };

  return (
    <div className="ai-chatbot-container">
      <div className="ai-chatbot-header">
        <div className="ai-chatbot-title">
          <FaRobot className="ai-icon" />
          <h2 style={{color:'white'}}>Billing Software Assistant</h2>
        </div>
        <p>Ask me anything about our billing software</p>
      </div>
      
      <div className="ai-chatbot-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-avatar">
              {message.sender === 'user' ? <FaUser /> : <FaRobot />}
            </div>
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai-message">
            <div className="message-avatar">
              <FaRobot />
            </div>
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="ai-chatbot-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message here..."
        />
         <button type="submit">
          <FaPaperPlane />
        </button>
      </form>
      
      <div className="ai-chatbot-suggestions">
        
       
         
      </div>
    </div>
  );
};

export default AIChatbot;