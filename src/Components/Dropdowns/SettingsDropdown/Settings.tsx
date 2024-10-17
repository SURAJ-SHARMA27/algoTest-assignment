import React, { useState } from 'react';
import './settings.css'; // Ensure to create this CSS file

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('Synthetic FUT');
  const [showGreeks, setShowGreeks] = useState(false);
  const [showDeltaIV, setShowDeltaIV] = useState(true);
  const [showNearStrikes, setShowNearStrikes] = useState(false);
  const [showIlliquidStrikes, setShowIlliquidStrikes] = useState(true);

  const handleOptionChange = (event:any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <div className="option-group">
        <span>ATM Based on</span>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="Spot"
              checked={selectedOption === 'Spot'}
              onChange={handleOptionChange}
            />
            Spot
          </label>
          <label>
            <input
              type="radio"
              value="Synthetic FUT"
              checked={selectedOption === 'Synthetic FUT'}
              onChange={handleOptionChange}
            />
            Synthetic FUT
          </label>
        </div>
      </div>

      <div className="option-group">
        <span>Show</span>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="LTP"
              checked={!showGreeks}
              onChange={() => setShowGreeks(false)}
            />
            LTP
          </label>
          <label>
            <input
              type="radio"
              value="Greeks"
              checked={showGreeks}
              onChange={() => setShowGreeks(true)}
            />
            Greeks
          </label>
        </div>
      </div>

      <div className="toggle-group">
        <label>
          <input
            type="checkbox"
            checked={showDeltaIV}
            onChange={() => setShowDeltaIV(!showDeltaIV)}
          />
          Delta & IV
        </label>
        <label>
          <input
            type="checkbox"
            checked={showNearStrikes}
            onChange={() => setShowNearStrikes(!showNearStrikes)}
          />
          Near strikes
        </label>
        <label>
          <input
            type="checkbox"
            checked={showIlliquidStrikes}
            onChange={() => setShowIlliquidStrikes(!showIlliquidStrikes)}
          />
          Illiquid strikes
        </label>
      </div>
    </div>
  );
};

export default Settings;
