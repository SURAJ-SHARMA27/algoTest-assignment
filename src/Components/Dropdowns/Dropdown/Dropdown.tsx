import React, { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Dropdown.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Store/Store';
import { setFirstSelectedOption } from '../../../Store/DropdownSlice';
interface DropdownProps {
 
}
const Dropdown: React.FC<DropdownProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
const firstDropdownRedux = useSelector((state: RootState) => state.dropdown.firstDropdown);
const firstSelectedOptionRedux = useSelector((state: RootState) => state.dropdown.firstSelectedOption);
const dispatch = useDispatch<AppDispatch>();

   const options =  firstDropdownRedux;
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
    dispatch(setFirstSelectedOption(option))
    
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
          <div className="dropdown-title">{firstSelectedOptionRedux.name}</div>
          <div className="dropdown-value">{firstSelectedOptionRedux.value} <span className='green'> 0.00 (0.00%) </span> </div>
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
