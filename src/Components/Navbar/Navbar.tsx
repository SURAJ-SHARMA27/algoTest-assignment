import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={"./logo.png"} alt="Logo" className="logo-img" />
        <span className="logo">Algotest</span>
      </div>
      <div className="navbar-center">
        <span className="nav-item">Backtest</span>
        <span className="nav-item">Algo Trade</span>
        <span className="nav-item">Forward Test</span>
        <span className="nav-item">Portfolios</span>
        <span className="nav-item">Signals</span>
        <span className="nav-item">Simulator</span>
        <span className="nav-item"><u>Strategy Builder</u></span>
      </div>
      <div className="navbar-right">
  <span className="nav-item-right">Pricing</span>
  <span className="nav-item-right">Broker Setup</span>
  <div className="profile-card">
    <div className="profile-icon">SU</div>
    <div className="credits-info">Credits: 0</div>
  </div>
</div>

    </nav>
  );
};

export default Navbar;
