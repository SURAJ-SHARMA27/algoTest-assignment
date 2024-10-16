import React from 'react';
import CustomIcon from '../CustomIcon';

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


const TableSmallScreen: React.FC<TableBigScreenProps> = ({ rows }) => (
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
  {Object.values(rows).map((row: Option, index: number) => (
<tr key={index} style={{ height: '30px' }}>
  

  <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center', background: "#FFFBE5" }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ marginRight: "2px", fontSize: "10px", fontWeight: "bold" }}>
{typeof row.call_close === "number" ? row.call_close.toFixed(2) : row.call_close}
</span>
      <CustomIcon />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Any content for this cell */}
        {row.call_delta !== "" ? (
          <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "" }}>{row.call_delta.toFixed(2)}</span>
        ) : (
 "---"
 
 )}      </div>
  </td>

  

  <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ background: "#F3F3F3", padding: "5px", fontWeight: "bold" }}>{row.strike}</span>
    </div>
  </td>

   
  <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
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
);

export default TableSmallScreen;
