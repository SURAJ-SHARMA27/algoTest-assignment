import React from 'react';
import './Center.css'; // Ensure to import your CSS file

const CenteredText: React.FC = () => {
    return (
        <div className="center-container" >
            <div className="analysis-title">
  <img src={"./main.svg"} style={{width:"100px",height:"100px"}}/>
  
              </div>
            <div className="analysis-title">
                Analysis shows Payoff Graph, Statistics and more...
            </div>
            <div className="analysis-description">
                Select trades from Option Chain or use <a href=""></a> <br/>
                 Prebuilt strategy from Positions tab to see analysis
            </div>
        </div>
    );
};

export default CenteredText;
