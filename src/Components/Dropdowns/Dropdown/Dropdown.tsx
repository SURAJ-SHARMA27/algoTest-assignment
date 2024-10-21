import React, { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Dropdown.css'; 
interface DropdownProps {
  firstDropdown:{ name: string; value: string }[];
  firstSelectedOption:{ name: string; value: string };
  setFirstSelectedOption: (option: { name: string; value: string }) => void; 
}
const Dropdown: React.FC<DropdownProps> = ({ firstDropdown,firstSelectedOption,setFirstSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
   const options =  firstDropdown;
  const dropdownRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => { 
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);  
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: { name: string; value: string }) => {
    setFirstSelectedOption(option);
    setIsOpen(false); 
  };

  return (
    <div className="dropdown-container"  ref={dropdownRef}>
      <div
        className="dropdown-header"
        style={{border:"1px solid #E5E7EB"}}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="dropdown-header"
      >
        <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'flex-start' }}>
          <div className="dropdown-title">{firstSelectedOption.name}</div>
          <div className="dropdown-value">{firstSelectedOption.value} <span className='green'> 0.00 (0.00%) </span> </div>
        </div>
        <span className="dropdown-arrow">
          <ExpandMoreIcon />
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-list-first" data-testid="options-list">
          {options.map((option:any, index:any) => (
            <div
              key={index}
              className="dropdown-item-first"
              onClick={() => handleOptionClick(option)}
            >
              <div style={{ fontSize: "12px" }}>{option.name}</div>
              <div style={{ fontSize: "12px" }}>{option.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
