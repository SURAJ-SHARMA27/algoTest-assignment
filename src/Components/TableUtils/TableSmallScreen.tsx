import React, { useState } from 'react';
import CustomIcon from '../CustomIcon';
import Modal from './Modal';
import { RootState } from '../../Store/Store';
import { shallowEqual, useSelector } from 'react-redux';

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
  currentDate:string;
}
const TableSmallScreen: React.FC<TableBigScreenProps> = ({ currentDate }) => {
  const rowsRedux = useSelector((state: RootState) => state.rowReduxSlice.rows, shallowEqual);
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [col,setCol]=useState("");
  const handleCellClick = (name:string) => {
    setModalOpen(true); // Open the modal when the cell is clicked
    if(name=="Call")
    {
      setCol("Call")
    }
    else{
      setCol("Put")
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead style={{ backgroundColor: '#FAFAFA', position: 'sticky', top: '0', zIndex: 1 }}>
          <tr>
            <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>
              <div>Call LTP</div>
              <div>Delta</div>
            </th>
            <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>
              <div>Strike</div>
              <div>IV</div>
            </th>
            <th style={{ padding: '8px', fontSize: '12px', fontWeight: 'normal', color: "#555555", textAlign: 'center' }}>
              <div>Put LTP</div>
              <div>Delta</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.values(rowsRedux).map((row: Option, index: number) => (
            <tr key={index} style={{ height: '30px' }}>
              <td onClick={()=>handleCellClick("Call")} style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center', background: "#FFFBE5" }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ marginRight: "2px", fontSize: "10px", fontWeight: "bold" }}>
                    {typeof row.call_close === "number" ? row.call_close.toFixed(2) : row.call_close}
                  </span>
                  <CustomIcon />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {row.call_delta !== "" ? (
                    <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "" }}>{row.call_delta.toFixed(2)}</span>
                  ) : (
                    "---"
                  )}
                </div>
              </td>

              <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ background: "#F3F3F3", padding: "5px", fontWeight: "bold" }}>{row.strike}</span>
                </div>
              </td>

              <td onClick={()=>handleCellClick("Put")} style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {row.put_close !== "" ? (
                    <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "bold" }}>{row.put_close.toFixed(2)}</span>
                  ) : (
                    <CustomIcon />
                  )}
                </div>
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} currentDate={currentDate} col={col}/>
    </>
  );
};

export default TableSmallScreen;