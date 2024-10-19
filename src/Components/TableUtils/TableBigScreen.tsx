import React, { useEffect, useRef, useState } from 'react';
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
  isRefresh:boolean;
}

const TableBigScreen: React.FC<TableBigScreenProps> = ({ rows,isRefresh }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null); // State for tracking hovered row index
  const [selectedLot, setSelectedLot] = useState(1); // Default selected lot
  const [clickedIndices, setClickedIndices] = useState<number[]>([]); // State for storing clicked indices
  const [clickedColors, setClickedColors] = useState<{ [key: number]: string }>({}); // To track whether it's Buy (green) or Sell (red)
  const [selectedLotPut, setSelectedLotPut] = useState(1); // Default selected lot
  const [clickedIndicesPut, setClickedIndicesPut] = useState<number[]>([]); // State for storing clicked indices
  const [clickedColorsPut, setClickedColorsPut] = useState<{ [key: number]: string }>({}); // To track whether it's Buy (green) or Sell (red)
  
  const ind=18;
  const syntheticFutRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    setSelectedLot(1);
    setClickedIndices([]);
    setClickedColors([]);
    setSelectedLotPut(1);
    setClickedIndicesPut([]);
    setClickedColorsPut([]);
  }, [isRefresh]);  

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
  const handleGoToSyntheticFut = () => {
    if (syntheticFutRef.current) {
      syntheticFutRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    
<table className="table1">

<thead className="table1-head">
<tr>
    <th className="table-header-big">Delta</th>
    <th className="table-header-big">Call LTP</th>
    <th className="table-header-big">Lots</th>
    <th className="table-header-big">Strike</th>
    <th className="table-header-big">IV</th>
    <th className="table-header-big">Lots</th>
    <th className="table-header-big">Put LTP</th>
    <th className={`table-header-big table-header-right-border-big`}>Delta</th>
</tr>
      </thead>
      <tbody>
      {Object.values(rows).map((row: Option, index: number) => {
  const isHovered = hoveredRowIndex === index;  
  const midBlockBg=isHovered?'#FAFAFA':ind==index?'#e6f2fb':'';
  let backgroundColor = isHovered ? '#FAFAFA' : '#FFFBE5';  
  let bg,border;
  if (index==ind){
    bg=isHovered ? '#FAFAFA' : '#e6f2fb';
    backgroundColor=isHovered ? '#FAFAFA' : '#e6f2fb';
    border=isHovered ? '1px solid #2b99fe':'1px solid #2b99fe'
  }
  else if(index<ind){
    backgroundColor=isHovered ? '#FAFAFA' : '#FFFBE5';
    bg=isHovered ? '#FAFAFA' : '#ffffff';

  }
  else if(index>ind){
    backgroundColor=isHovered ? '#FAFAFA' : '#ffffff';
    bg=isHovered ? '#FAFAFA' : '#FFFBE5';
  }
return(

            <tr 
            key={index} 
            ref={index === ind ? syntheticFutRef : null} 
            style={{ 
              height: '30px', 
              background: hoveredRowIndex === index ? '#FAFAFA' : 'transparent' // Change background on hover
            }}
            onMouseEnter={() => setHoveredRowIndex(index)} // Set hovered row index
            onMouseLeave={() => setHoveredRowIndex(null)} // Reset hovered row index
          >
            <td className='table-cell-big' style={{background: backgroundColor,borderBottom:border}}>
              <div className='table-div-big'>
                {row.call_delta !== "" ? (
                  <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "" }}>{row.call_delta.toFixed(2)}</span>
                ) : (
                  "---"
                )}
              </div>
            </td>

            <td  className='table-cell-big' style={{ background:backgroundColor,borderBottom:border}}>
              <div className='table-div-big'>
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

            <td className='table-cell-big' style={{ background:backgroundColor,borderBottom:border}}>
  {(!(clickedIndices.includes(index))) && (
    <div className='table-div-big'>
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
      <div className='table-div-big'>
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
<td className='table-cell-big' style={{ background:midBlockBg, borderBottom: border, position: 'relative' }}>
  <div className='table-div-big'>
    <span style={{ background: "#F3F3F3", padding: "5px", fontWeight: "bold" }}>{row.strike}</span>
  </div>

  {/* Rounded div in the middle of the bottom border */}
  {index==ind &&(
    <div
  style={{
    position: 'absolute',
    bottom: '-12px', // Adjust as needed to position the div on the border
    zIndex:9999,
    left: '90%',
    transform: 'translateX(-50%)',
    width: '129px', // Size of the div
    height: '25px',
    backgroundColor: '#ffffff', // Adjust the color
    borderRadius: '9999px', // Fully rounded corners
    border: '1px solid #3fa3ff', // Optional: Add border to make it more visible
    display: 'flex', // Use flexbox
    justifyContent: 'center', // Horizontally center text
    alignItems: 'center', // Vertically center text
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#0085FF',
  }}
>
  Synthetic FUT 52226.65
</div>

  )}
 
</td>


            <td className='table-cell-big'  style={{ background:midBlockBg,borderBottom:border}}>
              <div className='table-div-big'>
                {/* Empty cell content */}
              </div>
            </td>
            <td className='table-cell-big'  style={{ background:bg,borderBottom:border}}>
  {(!(clickedIndicesPut.includes(index))) && (
    <div className='table-div-big'>
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
      <div className='table-div-big'>
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



            <td className='table-cell-big'  style={{ background:bg,borderBottom:border}} >
              <div className='table-div-big'>
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

            <td className='table-cell-big-last'  style={{ background:bg,borderBottom:border}}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {row.put_delta !== "" ? (
                  <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "" }}>{row.put_delta.toFixed(2)}</span>
                ) : (
                  "---"
                )}
              </div>
            </td>
          </tr>
          )
           
      })}
      </tbody>
    </table>
  );
};

export default TableBigScreen;
