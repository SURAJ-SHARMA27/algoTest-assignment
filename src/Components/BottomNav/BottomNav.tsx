import React from 'react';
import './BottomNav.css'; // External CSS file

const BottomNav = () => {
  return (
    <div className="bottom-nav" data-testid="Bottom-navigation">
      <div className="nav-item-bottom">
        <img className="nav-bottom-img" src={"./optionChain.svg"} alt="Option Chain" />
        <span className="nav-label" style={{fontWeight:"bold",color:"#2A2A2A"}}>Option Chain</span>
      </div>
      <div className="nav-item-bottom">
        <img className="nav-bottom-img" src={"./position.svg"} alt="Positions" />
        <span className="nav-label">Positions</span>
      </div>
      <div className="nav-item-bottom">
        <img className="nav-bottom-img" src={"./Payoff.svg"} alt="Payoff" />
        <span className="nav-label">Payoff</span>
      </div>
      <div className="nav-item-bottom">
        <img className="nav-bottom-img" src={"./orderWindow.svg"} alt="Order Window" />
        <span className="nav-label">Order Window</span>
      </div>
    </div>
  );
};

export default BottomNav;
