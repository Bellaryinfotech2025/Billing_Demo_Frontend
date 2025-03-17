import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Component 1/Register';
import Login from './Component 1/Login';
import './index.css';
import Welcome from './Component 1/Welcome';
import LandingPage from './Component 1/landingpage';
import CreateAccount from './Component 1/CreateAccount';
import Dashboard from './Component 1/Welcome';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-account" element={<CreateAccount />}/>
        <Route path="/register/bellarybilling+550+software&kk$" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/welcome/:username' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
