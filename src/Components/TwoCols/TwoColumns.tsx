import React from 'react';
import './TwoColumnLayout.css';

const TwoColumnLayout: React.FC = () => {
  return (
    <div className="container-new">
      <div className="left-div">Option Chain</div>
      <div className="right-div">Positions</div>
    </div>
  );
};

export default TwoColumnLayout;
