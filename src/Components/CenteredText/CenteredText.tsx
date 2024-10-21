import React from 'react';
import './Center.css'; // Ensure to import your CSS file

const CenteredText: React.FC = () => {
    return (
        <div className="center-container" data-testid="center-container">
            <div className="analysis-title" data-testid="title-container">
                <img 
                    src={"./main.svg"} 
                    alt="Main SVG" 
                    style={{width:"100px",height:"100px"}} 
                    data-testid="main-image"
                />
            </div>
            <div className="analysis-title" data-testid="analysis-title">
                Analysis shows Payoff Graph, Statistics and more...
            </div>
            <div className="analysis-description" data-testid="analysis-description">
                Select trades from Option Chain or use <a href="" data-testid="link"></a> <br/>
                Prebuilt strategy from Positions tab to see analysis
            </div>
        </div>
    );
};

export default CenteredText;
