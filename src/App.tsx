import React, { useEffect, useState } from 'react';
import { IconButton, Box, Skeleton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Dropdown from './Components/dropdown';
import DropdownSecond from './Components/DropdownSecond';
import DropdownThird from './Components/DropdownThree';
import "./App.css";
import CustomIcon from './Components/CustomIcon';

interface OptionData {
  delta: number[];
  call_close: (number | "")[]; 
  put_close: (number | "")[];  
  strike: number[];
  call_delta: number[];
  put_delta: number[];
}
interface Option {
  delta: number;
  call_close: (number | ""); 
  put_close: (number | "");  
  strike: number;
  call_delta: (number|"");
  put_delta: (number|"");
}
interface CloseValues {
  call_close: number | "";
  put_close: number | "";
  call_delta:number|"";
  put_delta:number|"";
}
 
interface OptionChainData {
  [key: string  ]: OptionData;
}
interface ContractDetail {
  exchange: string;
  expiry: string;
  instrument_type: string;
  is_tradable: boolean;
  lot_size: number;
  max_qty_in_order: number;
  option_type: string;
  strike: number;
  symbol: string;
  tick_size: number;
  token: string;
  underlying: string;
}


const OptionChain: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dates, setDates] = useState<string[]>([]);
  const [rows, setRows] = useState<{ [strike: number]: Option }>({});
  const [options, setOptions] = useState<OptionChainData>({});
  const [allContracts,setAllContracts]=useState<any>({});
  const [firstDropdown,setFirstDropdown]=useState<any[]>([]);
  const [firstSelectedOption,setFirstSelectedOption]=useState<any>({});
  const [opts,setOpts]=useState<any>([]);
  const [optionResponse,setOptionResponse]=useState<any>([]);
  const [rootDate,setRootDate]=useState<any>([]);
  const [currentDate,setCurrentDate]=useState<any>('');
  const [selectedContractDetails,setSelectedContractDetails]=useState<any[]>([])
   const [contractMapState, setContractMapState] = useState<{ [token: string]: ContractDetail }>({});
  const [rowData, setRowData] = useState<{ [strike: number]: Option }>({}); // Define rowData here
  const [ltpData,setLtpData]=useState<any[]>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const constantValue = "25142.5";
 
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    // Function to handle resize event
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/contracts');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllContracts(data)
        console.log(data, "here is data");
        //Finding all the options for first dropdown like Nifty,BankNifty,Sensex,....
        const NameOptions = Object.keys(data).map((key) => ({
          name: key,
          value: constantValue,
        }));

        //Setting the first option as first Index fetched(BankNifty)
        setFirstSelectedOption(NameOptions[0]);
        console.log(NameOptions,"here are options")
        //Setting Values for first dropdown
        setFirstDropdown(NameOptions);
        //fetching Option array for selected value(BankNifty) to get all the dates and Strikes
        const currentOpts=data[NameOptions[0].name].OPT;
        setOpts(currentOpts)
        //Date array is populated here
        const DateOptions=Object.keys(currentOpts)
        const sortedDateOptions = DateOptions.sort((a, b) => new Date(a) - new Date(b));
        setDates(sortedDateOptions)
        setCurrentDate(sortedDateOptions[0]);
        console.log(currentOpts[sortedDateOptions[0]],"here are the targetedOptions")
        const contractDetails:ContractDetail[]=currentOpts[sortedDateOptions[0]];
        const contractMap = contractDetails.reduce((map: { [token: string]: ContractDetail }, contract: ContractDetail) => {
          map[contract.token] = contract;  // Use 'token' as the key and 'contract' as the value
          return map;
        }, {}); 
        setContractMapState(contractMap);
        console.log(contractMap,"contractMapcontractMap")
        const uniqueStrikes: number[] = [...new Set(contractDetails.map((contract: { strike: number }) => contract.strike))].sort((a, b) => a - b);

        // console.log(contractDetails,"contractDetailscontractDetails")
        setSelectedContractDetails(currentOpts[sortedDateOptions[0]])
        const optionResponse = await fetch(`/api/option-chain-with-ltp?underlying=${NameOptions[0].name}`);
        if (!optionResponse.ok) {
          throw new Error(`HTTP error! Status: ${optionResponse.status}`);
        }
        const optionData = await optionResponse.json();
        setOptionResponse(optionData);
        console.log(optionData,"here is the final")
        const currentOptionData=optionData.options;
        const currentDateDataWithLTP=currentOptionData[sortedDateOptions[0]]
        const strikeMap: { [strike: number]: CloseValues } = {};

currentDateDataWithLTP.strike.forEach((strikeValue: number, index: number) => {
  console.log(currentDateDataWithLTP.call_delta[index],"currentDateDataWithLTP.call_delta[index]")
     strikeMap[strikeValue] = {
        call_close: currentDateDataWithLTP.call_close[index],
        put_close: currentDateDataWithLTP.put_close[index],
        call_delta:currentDateDataWithLTP.call_delta[index],
        put_delta:currentDateDataWithLTP.put_delta[index],
    };
    
});

const options: Option[] = []; // Initialize an array of Option
const rowData: { [strike: number]: Option } = {};

uniqueStrikes.forEach((strike: number) => {
  // Create a new Option object for each unique strike
  const option: Option = {
      delta: 0, // Set to your desired logic
      call_close: "", // Default to empty string
      put_close: "",  // Default to empty string
      strike: strike, // Set the current strike
      call_delta: 0,  // Set to your desired logic
      put_delta: 0,   // Set to your desired logic
  };

  if (strikeMap[strike]) {
      option.call_close = (strikeMap[strike].call_close !== null ? strikeMap[strike].call_close : "");  
      option.put_close = (strikeMap[strike].put_close !== null ? strikeMap[strike].put_close : ""); 
      option.call_delta = (strikeMap[strike].call_delta !== null ? strikeMap[strike].call_delta : ""); 
      option.put_delta = (strikeMap[strike].put_delta !== null ? strikeMap[strike].put_delta : ""); 

  }
  rowData[strike] = option;
});
setRowData(rowData);
setRows(rowData);
setLoading(false);

console.log(rowData, "rowData");

console.log(options,"rowsTable");
       console.log(strikeMap);
        
  
      } catch (error) {
        console.error('Error fetching option chain data:', error);
      }
    };

    fetchData();
  }, []);

   // Handle date change manually for user selection
  const handleDateChange = (index: number) => {
    setLoading(true);

    const selectedDate = dates[index];
    setSelectedDate(selectedDate);
    setCurrentDate(selectedDate);
    console.log(opts[selectedDate],"opts date")
    const contractDetails:ContractDetail[]=opts[selectedDate]
    const uniqueStrikes: number[] = [...new Set(contractDetails.map((contract: { strike: number }) => contract.strike))].sort((a, b) => a - b);

    setSelectedContractDetails(opts[selectedDate])
    const currentOptionData=optionResponse.options;
    const currentDateDataWithLTP=currentOptionData[selectedDate]
    const strikeMap: { [strike: number]: CloseValues } = {};
    console.log(currentDateDataWithLTP,"currentDateDataWithLTP")
    const contractMap = contractDetails.reduce((map: { [token: string]: ContractDetail }, contract: ContractDetail) => {
      map[contract.token] = contract;  // Use 'token' as the key and 'contract' as the value
      return map;
    }, {}); 
    setContractMapState(contractMap);
    if (currentDateDataWithLTP && Array.isArray(currentDateDataWithLTP.strike)) {
      currentDateDataWithLTP.strike.forEach((strikeValue: number, index: number) => {
          strikeMap[strikeValue] = {
              call_close: currentDateDataWithLTP.call_close[index],
              put_close: currentDateDataWithLTP.put_close[index],
              call_delta:currentDateDataWithLTP.call_delta[index],
              put_delta:currentDateDataWithLTP.put_delta[index],
          };
      });
  }

const rowData: { [strike: number]: Option } = {};

uniqueStrikes.forEach((strike: number) => {
  // Create a new Option object for each unique strike
  const option: Option = {
      delta: 0, // Set to your desired logic
      call_close: "", // Default to empty string
      put_close: "",  // Default to empty string
      strike: strike, // Set the current strike
      call_delta: 0,  // Set to your desired logic
      put_delta: 0,   // Set to your desired logic
  };

  if (strikeMap[strike]) {
      option.call_close = (strikeMap[strike].call_close !== null ? strikeMap[strike].call_close : "");  
      option.put_close = (strikeMap[strike].put_close !== null ? strikeMap[strike].put_close : ""); 
      option.call_delta = (strikeMap[strike].call_delta !== null ? strikeMap[strike].call_delta : ""); 
      option.put_delta = (strikeMap[strike].put_delta !== null ? strikeMap[strike].put_delta : ""); 


  }
  rowData[strike] = option;
});
setRowData(rowData)
setRows(rowData);
setLoading(false);

  };

  useEffect(() => {
    console.log("here is selected option", firstSelectedOption.name);
    const fetchData = async () => {
        try {
            console.log(allContracts, "here is data");

            // Fetching Option array for selected value(BankNifty) to get all the dates and Strikes
            const currentOpts = allContracts[firstSelectedOption.name].OPT;
            setOpts(currentOpts);

            // Date array is populated here
            const DateOptions = Object.keys(currentOpts);
            const sortedDateOptions = DateOptions.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
            setDates(sortedDateOptions);
            setCurrentDate(sortedDateOptions[0]);

            console.log(currentOpts[sortedDateOptions[0]], "here are the targetedOptions");

            const contractDetails: ContractDetail[] = currentOpts[sortedDateOptions[0]];
        const uniqueStrikes: number[] = [...new Set(contractDetails.map((contract: { strike: number }) => contract.strike))].sort((a, b) => a - b);

            console.log(uniqueStrikes, "uniqueStrikes");
            const contractMap = contractDetails.reduce((map: { [token: string]: ContractDetail }, contract: ContractDetail) => {
              map[contract.token] = contract;  // Use 'token' as the key and 'contract' as the value
              return map;
            }, {}); 
            setContractMapState(contractMap);
            setSelectedContractDetails(currentOpts[sortedDateOptions[0]]);

            const optionResponse = await fetch(`/api/option-chain-with-ltp?underlying=${firstSelectedOption.name}`);
            if (!optionResponse.ok) {
                throw new Error(`HTTP error! Status: ${optionResponse.status}`);
            }
            const optionData = await optionResponse.json();
            setOptionResponse(optionData);

            console.log(optionData, "here is the final");

            const currentOptionData = optionData.options;
            const currentDateDataWithLTP = currentOptionData[sortedDateOptions[0]];
            const strikeMap: { [strike: number]: CloseValues } = {};

            if (currentDateDataWithLTP && Array.isArray(currentDateDataWithLTP.strike)) {
              currentDateDataWithLTP.strike.forEach((strikeValue: number, index: number) => {
                  strikeMap[strikeValue] = {
                      call_close: currentDateDataWithLTP.call_close[index],
                      put_close: currentDateDataWithLTP.put_close[index],
              call_delta:currentDateDataWithLTP.call_delta[index],
              put_delta:currentDateDataWithLTP.put_delta[index],
                  };
              });
          }
          

            const rowData: { [strike: number]: Option } = {};

uniqueStrikes.forEach((strike: number) => {
  // Create a new Option object for each unique strike
  const option: Option = {
      delta: 0, // Set to your desired logic
      call_close: "", // Default to empty string
      put_close: "",  // Default to empty string
      strike: strike, // Set the current strike
      call_delta: 0,  // Set to your desired logic
      put_delta: 0,   // Set to your desired logic
  };

  if (strikeMap[strike]) {
      option.call_close = (strikeMap[strike].call_close !== null ? strikeMap[strike].call_close : "");  
      option.put_close = (strikeMap[strike].put_close !== null ? strikeMap[strike].put_close : ""); 
      option.call_delta = (strikeMap[strike].call_delta !== null ? strikeMap[strike].call_delta : "");
      option.put_delta = (strikeMap[strike].put_delta !== null ? strikeMap[strike].put_delta : ""); 


  }
  rowData[strike] = option;
});
setRowData(rowData)
setRows(rowData);

        } catch (error) {
            console.error("Error fetching option chain data:", error);
        }
    };
    if (Object.keys(allContracts).length > 0) {
      fetchData();
  }
  
}, [firstSelectedOption]); // Include allContracts in the dependency array

useEffect(() => {
  let ws: WebSocket;

  try {
    // Create a new WebSocket connection
    ws = new WebSocket('wss://prices.algotest.xyz/mock/updates');

    // Define the initiation message
    const initiationMessage = {
      msg: {
        datatypes: ["ltp"],
        underlyings: [
          {
            underlying: `${firstSelectedOption.name}`,
            cash: true,
            options: [`${currentDate}`]
          }
        ]
      }
    };

    // On WebSocket connection open, send the initiation message
    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send(JSON.stringify(initiationMessage));
    };

    // Log incoming messages from the WebSocket
    ws.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      // console.log('Incoming WebSocket data:', jsonData);
  
      // Extract ltp array from jsonData
      const ltpInfo = jsonData.ltp;
    //  console.log(ltpInfo,"ltpDataltpData")
    if (ltpInfo && Array.isArray(ltpInfo)) {
    setLtpData(ltpInfo);
    }

  };
  

    // Handle WebSocket errors
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

  } catch (error) {
    console.error('Error while creating WebSocket connection:', error);
  }

  // Close the WebSocket when the component unmounts
  return () => {
    if (ws) {
      ws.close();
      console.log('WebSocket connection closed');
    }
  };
}, [currentDate,firstSelectedOption]); 


useEffect(()=>{
console.log()
  ltpData.forEach((data) => {
    const { token, ltp } = data;  
    
    // Check if the token exists in the contractMap
    if (contractMapState[token]) {
        const { strike, option_type } = contractMapState[token]; // Get strike and option_type from contractMap
        
        // Check if the strike exists in rowData
        if (rowData[strike]) {
            // Update the row based on option type
            if (option_type === "CE") {
               rowData[strike].call_close=ltp;
           
            } else if (option_type === "PE") {
              rowData[strike].put_close=ltp;
               
            }
        }
    }
});
 setRows(rowData);
},[ltpData])


  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => {
        const newIndex = Math.min(prevIndex + 1, dates.length - 1);
        console.log(`New Index: ${newIndex}`);
        return newIndex;
    });
};
 

  return (
<div className='responsive-container' >
<h2 style={{textAlign:"center"}}>Option Chain</h2>
     
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown firstDropdown={firstDropdown} firstSelectedOption={firstSelectedOption} setFirstSelectedOption={setFirstSelectedOption}/>
        <DropdownSecond />
       {!isSmallScreen&&(
        <DropdownThird />
       )} 
      </Box>

      <div style={{ display: 'flex', alignItems: 'center', height: "50px", background: "#FAFAFA", border: "1px solid #E5E7EB", overflow: 'hidden' }}>
        <IconButton onClick={scrollLeft} disabled={currentIndex === 0}>
          <ArrowBackIosIcon style={{ fontSize: "15px" }} />
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

        <div style={{ width: "120px", color: "#868686", fontWeight: "500" }}>
          <div className="switch-wrapper">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <span style={{ color: "#8d8d8d" }}>View positions</span>
          </div>
        </div>

        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
      <div style={{ height: '82vh', overflowY: 'auto', overflowX: 'hidden',scrollbarWidth: 'none' }}>
      {loading ? (
          <Box sx={{ padding: '20px' }}>
            <Skeleton variant="rectangular" width="100%" height={40} animation="wave" />
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={30} animation="wave" sx={{ marginTop: 1 }} />
            ))}
          </Box>
        ) : (<>
 {!isSmallScreen&&
 (
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
  <tr key={index} style={{ height: '30px' }}>
    <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center', background: "#FFFBE5" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Any content for this cell */}
        {row.call_delta !== "" ? (
          <span style={{ marginRight: "2px", fontSize: "12px", fontWeight: "" }}>{row.call_delta.toFixed(2)}</span>
        ) : (
 "---"
 
 )}      </div>
    </td>

    <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center', background: "#FFFBE5" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ marginRight: "2px", fontSize: "10px", fontWeight: "bold" }}>
  {typeof row.call_close === "number" ? row.call_close.toFixed(2) : row.call_close}
</span>
        <CustomIcon />
      </div>
    </td>

    <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center', background: "#FFFBE5" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Empty cell content */}
      </div>
    </td>

    <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ background: "#F3F3F3", padding: "5px", fontWeight: "bold" }}>{row.strike}</span>
      </div>
    </td>

    <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       </div>
    </td>
    <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Empty cell content */}
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
    </td>

    <td style={{ padding: '8px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', textAlign: 'center' }}>
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
 )
 } 

{isSmallScreen&&(
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
)}
</>)}
</div>




    </div>
  );
};

export default OptionChain;
