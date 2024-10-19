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
  // Helper function to format date as "DD MMM"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    return `${day} ${month}`;
  };

  // Helper function to calculate the difference in days from today
  const getDaysDifference = (dateString: string): number => {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInTime = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
  };

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
                width: '110px',
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
              {/* Format date and calculate day difference */}
              {`${formatDate(date)} (${getDaysDifference(date)}d)`}
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
