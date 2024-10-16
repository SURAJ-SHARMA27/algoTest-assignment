import React, { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './dropdownSecond.css'; // Import the CSS file for styles

const DropdownSecond: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    name: 'FUT (30 Oct)',
    value: '52080.30'
  });

  // Sample data for the table
  const tableData = [
    { expiry: '30 Oct 24 (15 days)', ltp: '52080.35', lots: '' },
    { expiry: '27 Nov 24 (43 days)', ltp: '52364.45', lots: '' },
    { expiry: '24 Dec 24 (70 days)', ltp: '52720.00', lots: '' },
  ];

  // Specify the type of the ref
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="dropdown-container-second" ref={dropdownRef}>
      <div
        className="dropdown-header-second"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'flex-start' }}>
          <div className="dropdown-title-second">{selectedOption.name}</div>
          <div className="dropdown-value-second">{selectedOption.value}</div>
        </div>
        <span className="dropdown-arrow-second">
          <ExpandMoreIcon />
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-list-second">
          <table className="dropdown-table-second">
            <thead>
              <tr>
                <th className="table-header-second">Expiry</th>
                <th className="table-header-second">LTP</th>
                <th className="table-header-second">Lots</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="table-cell-second" style={{ fontWeight: "100" }}>{row.expiry}</td>
                  <td className="table-cell-second">{row.ltp}</td>
                  <td className="table-cell-second">{row.lots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DropdownSecond;
