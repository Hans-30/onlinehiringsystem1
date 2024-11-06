import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeSite.css';
import employeeAvatar from './Assets/fe-removebg-preview.png';
import adminAvatar from './Assets/fe-removebg-preview.png'; // Replace with your actual admin avatar path

const EmployeeSite = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [employeeUsername, setEmployeeUsername] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [employeeError, setEmployeeError] = useState('');
  const [adminError, setAdminError] = useState('');

  // Updated admin credentials
  const validAdminUsername = 'hiringsystem@gmail.com';
  const validAdminPassword = 'hiring123';

  const handleEmployeeLogin = () => {
    setEmployeeError('');
    if (!employeeUsername || !employeePassword) {
      setEmployeeError('Both fields are required.');
      return;
    }
    setIsAuthenticated(true);
    navigate('/account');
  };

  const handleAdminLogin = () => {
    setAdminError('');
    if (!adminUsername || !adminPassword) {
      setAdminError('Both fields are required.');
      return;
    }
    if (adminUsername === validAdminUsername && adminPassword === validAdminPassword) {
      setIsAuthenticated(true);
      navigate('/admin-dashboard');
    } else {
      setAdminError('Invalid username or password.');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        {/* Employee Login Section */}
        <div className="login-form">
          <img src={employeeAvatar} alt="Employee Avatar" className="avatar" />
          <h3>Employee Login</h3>
          {employeeError && <div className="error-message">{employeeError}</div>}
          <input
            type="text"
            placeholder="Username"
            value={employeeUsername}
            onChange={(e) => setEmployeeUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={employeePassword}
            onChange={(e) => setEmployeePassword(e.target.value)}
            className="input-field"
          />
          <button onClick={handleEmployeeLogin} className="login-button">Login</button>
        </div>

        {/* Admin Login Section */}
        <div className="login-form">
          <img src={adminAvatar} alt="Admin Avatar" className="avatar" />
          <h3>Admin Login</h3>
          {adminError && <div className="error-message">{adminError}</div>}
          <input
            type="text"
            placeholder="Admin Username"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="input-field"
          />
          <button onClick={handleAdminLogin} className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSite;
