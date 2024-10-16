import React, { useEffect, useState } from 'react';
import { IconButton, Box, Skeleton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Dropdown from './Components/Dropdowns/dropdown';
import DropdownSecond from './Components/Dropdowns/DropdownSecond';
import DropdownThird from './Components/Dropdowns/DropdownThree';
import "./App.css";
import CustomIcon from './Components/CustomIcon';
import TableBigScreen from './Components/TableUtils/TableBigScreen';
import TableSmallScreen from './Components/TableUtils/TableSmallScreen';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import TableContainer from './Components/TableUtils/TableContainer';
import { createContractMap, getUniqueStrikes, populateRowData, populateStrikeMap } from './Components/Utils/utils';
import { ContractDetail, Option, OptionChainData } from './Components/Utils/interfaces';



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
  const [rowData, setRowData] = useState<{ [strike: number]: Option }>({});  
  const [ltpData,setLtpData]=useState<any[]>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const constantValue = "25142.5";
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
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
        //Finding all the options for first dropdown like Nifty,BankNifty,Sensex,....
        const NameOptions = Object.keys(data).map((key) => ({
          name: key,
          value: constantValue,
        }));
        //Setting the first option as first Index fetched(BankNifty)
        setFirstSelectedOption(NameOptions[0]);
        //Setting Values for first dropdown
        setFirstDropdown(NameOptions);
        //fetching Option array for selected value(BankNifty) to get all the dates and Strikes
        const currentOpts=data[NameOptions[0].name].OPT;
        setOpts(currentOpts)
        //Date array is populated here
        const DateOptions=Object.keys(currentOpts)
        const sortedDateOptions = DateOptions.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        setDates(sortedDateOptions)
        setCurrentDate(sortedDateOptions[0]);
        
        const contractDetails:ContractDetail[]=currentOpts[sortedDateOptions[0]];
        //creating a map in which token will be key (all contracts api response)
        const contractMap = createContractMap(contractDetails);
        setContractMapState(contractMap);
        //extracting all unique strikes from all contract api response
        const uniqueStrikes: number[] = getUniqueStrikes(contractDetails);
        setSelectedContractDetails(currentOpts[sortedDateOptions[0]])
        //calling option-chain-with-ltp api for Banknifty by default
        const optionResponse = await fetch(`/api/option-chain-with-ltp?underlying=${NameOptions[0].name}`);
        if (!optionResponse.ok) {
          throw new Error(`HTTP error! Status: ${optionResponse.status}`);
        }
        const optionData = await optionResponse.json();
        setOptionResponse(optionData);

         const currentOptionData=optionData.options;
        // targeting the selected date data from the response of option-chain-with-ltp api response
        const currentDateDataWithLTP=currentOptionData[sortedDateOptions[0]]
        //creating a map from the response of option-chain-ltp api in which strike will be key and call_close,put_close,call_delta and put_delta will be values
        const strikeMap = populateStrikeMap(currentDateDataWithLTP);
        // it will now traverse through all the unique strikes fetched from all contract api and check whether strikeMap contains that strike (O(1)), if it contains
        // it puts the corresponding data in that row (i.e. call_close...)
        const rowData = populateRowData(uniqueStrikes, strikeMap);
        setRowData(rowData);
        setRows(rowData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching option chain data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (index: number) => {
    setLoading(true);
    const selectedDate = dates[index];
    setSelectedDate(selectedDate);
    setCurrentDate(selectedDate);
    const contractDetails:ContractDetail[]=opts[selectedDate]
    const uniqueStrikes: number[] = getUniqueStrikes(contractDetails);
    setSelectedContractDetails(opts[selectedDate])
    const currentOptionData=optionResponse.options;
    const currentDateDataWithLTP=currentOptionData[selectedDate]
      const contractMap = createContractMap(contractDetails);
    setContractMapState(contractMap);
    const strikeMap = populateStrikeMap(currentDateDataWithLTP);
    const rowData = populateRowData(uniqueStrikes, strikeMap);
setRowData(rowData)
setRows(rowData);
setLoading(false);

  };

  useEffect(() => {
    const fetchData = async () => {
        try {
 
           // Fetching Option array for selected value(BankNifty) to get all the dates and Strikes
            const currentOpts = allContracts[firstSelectedOption.name].OPT;
            setOpts(currentOpts);

            // Date array is populated here
            const DateOptions = Object.keys(currentOpts);
            const sortedDateOptions = DateOptions.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
            setDates(sortedDateOptions);
            setCurrentDate(sortedDateOptions[0]);
            const contractDetails: ContractDetail[] = currentOpts[sortedDateOptions[0]];
            const uniqueStrikes: number[] = getUniqueStrikes(contractDetails);
            const contractMap = createContractMap(contractDetails);
            setContractMapState(contractMap);
            setSelectedContractDetails(currentOpts[sortedDateOptions[0]]);

            const optionResponse = await fetch(`/api/option-chain-with-ltp?underlying=${firstSelectedOption.name}`);
            if (!optionResponse.ok) {
                throw new Error(`HTTP error! Status: ${optionResponse.status}`);
            }
            const optionData = await optionResponse.json();
            setOptionResponse(optionData);
            const currentOptionData = optionData.options;
            const currentDateDataWithLTP = currentOptionData[sortedDateOptions[0]];
            const strikeMap = populateStrikeMap(currentDateDataWithLTP);
            const rowData = populateRowData(uniqueStrikes, strikeMap);
setRowData(rowData)
setRows(rowData);

        } catch (error) {
            console.error("Error fetching option chain data:", error);
        }
    };
    if (Object.keys(allContracts).length > 0) {
      fetchData();
  }
  
}, [firstSelectedOption]); 

useEffect(() => {
  let ws: WebSocket;

  try {
    ws = new WebSocket('wss://prices.algotest.xyz/mock/updates');
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

    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send(JSON.stringify(initiationMessage));
    };
    ws.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
         const ltpInfo = jsonData.ltp;
     if (ltpInfo && Array.isArray(ltpInfo)) {
    setLtpData(ltpInfo);
    }

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
    
    // Checking if the token exists in the contractMap 
    if (contractMapState[token]) {
        const { strike, option_type } = contractMapState[token]; 
        // this line fetches the particular row in which we have to update call_ltp or put_ltp
        if (rowData[strike]) {
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
         return newIndex;
    });
};
 

  return (
<div className='responsive-container' >
<h2 style={{textAlign:"center"}}>Option Chain</h2>
     
<Header 
      firstDropdown={firstDropdown} 
      firstSelectedOption={firstSelectedOption} 
      setFirstSelectedOption={setFirstSelectedOption} 
      isSmallScreen={isSmallScreen} 
    />

<Navigation
        dates={dates}
        currentDate={currentDate}
        currentIndex={currentIndex}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
        handleDateChange={handleDateChange}
      />
           <TableContainer loading={loading} isSmallScreen={isSmallScreen} rows={rows} />





    </div>
  );
};

export default OptionChain;
