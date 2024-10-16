// Navigation.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavigationProps {
  dates: string[];
  currentDate: string;
  currentIndex: number;
  scrollLeft: () => void;
  scrollRight: () => void;
  handleDateChange: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  dates,
  currentDate,
  currentIndex,
  scrollLeft,
  scrollRight,
  handleDateChange,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '50px', background: '#FAFAFA', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      <IconButton onClick={scrollLeft} disabled={currentIndex === 0}>
        <ArrowBackIosIcon style={{ fontSize: '15px' }} />
      </IconButton>

      <div style={{ display: 'flex', overflow: 'hidden', width: '600px', position: 'relative' }}>
        <div style={{ display: 'flex', transform: `translateX(-${currentIndex * 100}px)`, transition: 'transform 0.3s ease' }}>
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateChange(index)}
              style={{
                width: '100px',
                height: '28px',
                borderRadius: '4px',
                backgroundColor: currentDate === date ? '#E7EEF3' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                fontWeight: currentDate === date ? 'bold' : 'normal',
                color: currentDate === date ? '#0B619B' : '#2A2A2A',
              }}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      <IconButton onClick={scrollRight} disabled={currentIndex >= dates.length - 1}>
        <ArrowForwardIosIcon style={{ fontSize: '15px' }} />
      </IconButton>

      <div style={{ width: '120px', color: '#868686', fontWeight: '500' }}>
        <div className="switch-wrapper">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <span style={{ color: '#8d8d8d' }}>View positions</span>
        </div>
      </div>

      <IconButton>
        <SettingsIcon />
      </IconButton>
    </div>
  );
};

export default Navigation;
