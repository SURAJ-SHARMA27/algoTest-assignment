import React from 'react';
import './Options.css'; // Ensure to import your CSS file

const OptionsAndHelp: React.FC = () => {
    return (
        <div className="options-container">
            <div className="options-left">
                <div className="option" style={{ color: '#0b619b', backgroundColor: '#daecf9',fontWeight:"bold",height:"28px",marginLeft:"2px",borderRadius:"4px" }}>
                    Analysis
                </div>
                <div className="option">Greeks</div>
                <div className="option">Monte Carlo</div>
                <div className="option" style={{marginRight:"10px"}}>Order Window</div>
            </div>
            <div className="help-center">
  
  <div className="question-card">
    <div className="question-icon">?</div>
    <div className="question-info">Help Center </div>
</div>          

  </div>
        </div>
    );
};

export default OptionsAndHelp;
