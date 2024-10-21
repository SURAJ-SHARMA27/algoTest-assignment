import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './StrategyHeader.css';

const StrategyHeader = () => {
  return (
    <div className="strategy-header">
   <div className="strategy-left">
  <img src={"./Strategy.svg"} style={{width:"25px", height:"25px"}} alt="Strategy" />
  <span className="strategy-text">Strategies</span>
</div>

      <div className="strategy-mid">New strategy</div>
      <div className="strategy-right">
        <MoreVertIcon style={{ color: "#2A2A2A" ,fontSize:"18px"}} />
      </div>
    </div>
  );
};

export default StrategyHeader;
