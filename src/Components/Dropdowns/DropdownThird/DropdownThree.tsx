import React from 'react';
import './dropdownthree.css'; 

const DropdownThird = () => {
  const selectedOption = {
    name: 'India VIX',
    value: '12.92'
  };

  return (
    <div className="dropdown-container-three">
      <div className="dropdown-header">
        <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'flex-start' }}>
          <div className="dropdown-title">{selectedOption.name}</div>
          <div className="dropdown-value">{selectedOption.value}</div>
        </div>
      </div>
    </div>
  );
};

export default DropdownThird;
