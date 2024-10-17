import React from 'react';
import './ExpiryStatus.css'; // Ensure to import your CSS file

const ExpiryStatus: React.FC = () => {
    return (
        <div className="expiry-status">
            <span className="expiry-text">Expiry: Nifty</span>
            <span className="market-status">MARKET CLOSED</span>
        </div>
    );
};

export default ExpiryStatus;
