import React, { useState } from 'react';
import CustomIcon from '../CustomIcon';
import "./table.css"
import { Tooltip } from '@mui/material';
// Define the type for a single row (Option)
interface Option {
  delta: number;
  call_close: number | "";
  put_close: number | "";
  strike: number;
  call_delta: number | "";
  put_delta: number | "";
}

// Define the props type for the table component
interface TableBigScreenProps {
  rows: { [strike: number]: Option }; // The rows object is keyed by strike prices
}

const TableBigScreen: React.FC<TableBigScreenProps> = ({ rows }) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null); // State for tracking hovered row index
   const [selectedLot, setSelectedLot] = useState(1); // Default selected lot
  const [clickedIndices, setClickedIndices] = useState<number[]>([]); // State for storing clicked indices
  const [clickedColors, setClickedColors] = useState<{ [key: number]: string }>({}); // To track whether it's Buy (green) or Sell (red)
  const [selectedLotPut, setSelectedLotPut] = useState(1); // Default selected lot
  const [clickedIndicesPut, setClickedIndicesPut] = useState<number[]>([]); // State for storing clicked indices
  const [clickedColorsPut, setClickedColorsPut] = useState<{ [key: number]: string }>({}); // To track whether it's Buy (green) or Sell (red)
  
  const handleBuySellClick = (index: number, type: string) => {
    if (clickedIndices.includes(index)) {
      // If already clicked, remove the index and its associated color
      setClickedIndices((prev) => prev.filter((i) => i !== index));
      setClickedColors((prev) => {
        const updatedColors = { ...prev };
        delete updatedColors[index]; // Remove color association
        return updatedColors;
      });
    } else {
      // Otherwise, add the index and set its color (green for Buy, red for Sell)
      setClickedIndices((prev) => [...prev, index]);
      setClickedColors((prev) => ({ ...prev, [index]: type === 'Buy' ? 'green' : 'red' }));
    }
  };
  const handleBuySellClickPut = (index: number, type: string) => {
    if (clickedIndicesPut.includes(index)) {
       setClickedIndicesPut((prev) => prev.filter((i) => i !== index));
      setClickedColorsPut((prev) => {
        const updatedColors = { ...prev };
        delete updatedColors[index]; // Remove color association
        return updatedColors;
      });
    } else {
      // Otherwise, add the index and set its color (green for Buy, red for Sell)
      setClickedIndicesPut((prev) => [...prev, index]);
      setClickedColorsPut((prev) => ({ ...prev, [index]: type === 'Buy' ? 'green' : 'red' }));
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <thead style={{ backgroundColor: '#FAFAFA', position: 'sticky', top: '0', zIndex: 1 }}>
        <tr>
          <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>Delta</th>
          <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>Call LTP</th>
          <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>Lots</th>
          <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>Strike</th>
          <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>IV</th>
          <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>Lots</th>
          <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>Put LTP</th>
          <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center', borderRight: '1px solid #ddd' }}>Delta</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(rows).map((row: Option, index: number) => (
          <tr 
            key={index} 
            style={{ 
              height: '30px', 
              background: hoveredRowIndex === index ? '#FAFAFA' : 'transparent' // Change background on hover
            }}
            onMouseEnter={() => setHoveredRowIndex(index)} // Set hovered row index
            onMouseLeave={() => setHoveredRowIndex(null)} // Reset hovered row index
          >
            <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center', background: hoveredRowIndex === index ? '#FAFAFA' : '#FFFBE5'}}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {row.call_delta !== "" ? (
                  <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "" }}>{row.call_delta.toFixed(2)}</span>
                ) : (
                  "---"
                )}
              </div>
            </td>

            <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center', background:hoveredRowIndex === index ? '#FAFAFA' : '#FFFBE5'}}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: "2px", fontSize: "10px", fontWeight: "bold" }}>
                  {typeof row.call_close === "number" ? row.call_close.toFixed(2) : row.call_close}
                </span>
                <Tooltip
                  title="IIIiquid Option"
                  arrow
                  placement="top"
                 >
                  <span>
                <CustomIcon />
                </span>
                </Tooltip>
              </div>
            </td>

            <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
  {(!(clickedIndices.includes(index))) && (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {hoveredRowIndex === index && row.put_close !== "" && row.call_close !== "" && (
        <>
          {/* Buy box */}
          <div
            className="box"
            style={{ background: clickedColors[index] === 'green' ? '#e1f5e9' : '' }} // Green if Buy is clicked
            onClick={() => handleBuySellClick(index, 'Buy')}
          >
            <span>B</span>
          </div>

          {/* Sell box */}
          <div
            className="box"
            style={{ background: clickedColors[index] === 'red' ? '#f9eaea' : '' }} // Red if Sell is clicked
            onClick={() => handleBuySellClick(index, 'Sell')}
          >
            <span>S</span>
          </div>
        </>
      )}

      {hoveredRowIndex === index && row.put_close === '' && row.call_close === '' && (
        <Tooltip
  title="Fetch Instrument's LTP"
  arrow
  placement="top"
 >
  <span>
    <img src={'./referesh.svg'} style={{ width: '15px', height: '15px' }} alt="Refresh" />
  </span>
</Tooltip>
    )}
    </div>
  )}

  {clickedIndices.includes(index) && (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Buy box */}
        <div
          className="box"
          style={{ background: clickedColors[index] === 'green' ? '#00c452' : '',
            border: clickedColors[index] === 'green' ? '1px solid #00c452' : '',
            color: clickedColors[index] === 'green' ? 'white' : '',
           }} // Green if Buy is clicked
          onClick={() => handleBuySellClick(index, 'Buy')}
        >
          <span>B</span>
        </div>

        {/* Sell box */}
        <div
          className="box"
          style={{ background: clickedColors[index] === 'red' ? '#ea5555' : '',
            border: clickedColors[index] === 'red' ? '1px solid #ea5555' : '',
            color: clickedColors[index] === 'red' ? 'white' : '',

           }} // Red if Sell is clicked
          onClick={() => handleBuySellClick(index, 'Sell')}
        >
          <span>S</span>
        </div>
      </div>

      {/* Lots Dropdown */}
      <div className="lots-container-big">
  <label htmlFor="lots" className="lots-label">Lots:</label>
  <select
    id="lots"
    value={selectedLot}
    onChange={(e) => setSelectedLot(Number(e.target.value))}
    className="lots-dropdown"
  >
    {[1, 2, 3, 4].map((lot) => (
      <option style={{background:"white"}} key={lot} value={lot}>
        {lot}
      </option>
    ))}
  </select>
</div>

    </>
  )}
</td>
            <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center'}}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ background: "#F3F3F3", padding: "5px", fontWeight: "bold" }}>{row.strike}</span>
              </div>
            </td>

            <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center'}}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Empty cell content */}
              </div>
            </td>
            <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
  {(!(clickedIndicesPut.includes(index))) && (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {hoveredRowIndex === index && row.put_close !== "" && row.call_close !== "" && (
        <>
          {/* Buy box */}
          <div
            className="box"
            style={{ background: clickedColorsPut[index] === 'green' ? '#e1f5e9' : '' }} // Green if Buy is clicked
            onClick={() => handleBuySellClickPut(index, 'Buy')}
          >
            <span>B</span>
          </div>

          {/* Sell box */}
          <div
            className="box"
            style={{ background: clickedColorsPut[index] === 'red' ? '#f9eaea' : '' }} // Red if Sell is clicked
            onClick={() => handleBuySellClickPut(index, 'Sell')}
          >
            <span>S</span>
          </div>
        </>
      )}

      {hoveredRowIndex === index && row.put_close === '' && row.call_close === '' && (
           <Tooltip
           title="Fetch Instrument's LTP"
           arrow
           placement="top"
          >
           <span>
        <img src={'./referesh.svg'} style={{ width: '15px', height: '15px' }} />
        </span>
        </Tooltip>
      )}
    </div>
  )}

  {clickedIndicesPut.includes(index) && (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Buy box */}
        <div
          className="box"
          style={{ background: clickedColorsPut[index] === 'green' ? '#00c452' : '',
            border: clickedColorsPut[index] === 'green' ? '1px solid #00c452' : '',
            color: clickedColorsPut[index] === 'green' ? 'white' : '',
           }} // Green if Buy is clicked
          onClick={() => handleBuySellClickPut(index, 'Buy')}
        >
          <span>B</span>
        </div>

        {/* Sell box */}
        <div
          className="box"
          style={{ background: clickedColorsPut[index] === 'red' ? '#ea5555' : '',
            border: clickedColorsPut[index] === 'red' ? '1px solid #ea5555' : '',
            color: clickedColorsPut[index] === 'red' ? 'white' : '',

           }} // Red if Sell is clicked
          onClick={() => handleBuySellClickPut(index, 'Sell')}
        >
          <span>S</span>
        </div>
      </div>

      {/* Lots Dropdown */}
      <div className="lots-container-big">
  <label htmlFor="lots" className="lots-label">Lots:</label>
  <select
    id="lots"
    value={selectedLot}
    onChange={(e) => setSelectedLotPut(Number(e.target.value))}
    className="lots-dropdown"
  >
    {[1, 2, 3, 4].map((lot) => (
      <option style={{background:"white"}} key={lot} value={lot}>
        {lot}
      </option>
    ))}
  </select>
</div>

    </>
  )}
</td>



            <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center',background:clickedIndices.includes(index)?"#FAFAFA":"" }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {row.put_close !== "" ? (
                  <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "bold" }}>{row.put_close.toFixed(2)}</span>
                ) : (
                  <Tooltip
                  title="IIIiquid Option"
                  arrow
                  placement="top"
                 >
                  <span>
                  <CustomIcon />
                  </span>
                  </Tooltip>
                )}
              </div>
            </td>

            <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', textAlign: 'center',background:clickedIndices.includes(index)?"#FAFAFA":"" }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {row.put_delta !== "" ? (
                  <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "" }}>{row.put_delta.toFixed(2)}</span>
                ) : (
                  "---"
                )}
              </div>
            </td>
          </tr>
        ))} 
      </tbody>
    </table>
  );
};

export default TableBigScreen;
