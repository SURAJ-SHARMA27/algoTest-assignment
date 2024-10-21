import React, { useEffect, useRef, useState } from 'react';
import "./App.css";
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import TableContainer from './Components/TableUtils/TableContainer';
import { createTokenMap, getUniqueStrikes, populateRowData, populateStrikeMap } from './Components/Utils/utils';
import { AllContracts, ContractDetail, DropdownOption, Option, OptionChainData, OptionResponse } from './Components/Utils/interfaces';
import Navbar from './Components/Navbar/Navbar';
import StrategyHeader from './Components/StrategyHeader/StrategyHeader';
import TwoColumnLayout from './Components/TwoCols/TwoColumns';
import ExpiryStatus from './Components/ExpiryStatus/ExpiryStatus';
import OptionsAndHelp from './Components/OptionHelp/OptionsHelp';
import CenteredText from './Components/CenteredText/CenteredText';
import BottomNav from './Components/BottomNav/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './Store/Store';
import { setRowsRedux } from './Store/rowReduxSlice';
import { setDates } from './Store/datesSlice';
import { setFirstDropdown } from './Store/DropdownSlice';
import { setFirstSelectedOption } from './Store/DropdownSlice';
const OptionChain: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);  
  const [allContracts, setAllContracts] = useState<AllContracts>({});
  const [opts,setOpts]=useState<any>([]);
const [optionResponse, setOptionResponse] = useState<OptionResponse | any>([]);
  const [currentDate,setCurrentDate]=useState<any>('');
  const [selectedContractDetails,setSelectedContractDetails]=useState<any[]>([])
  const [tokenMapState, setTokenMapState] = useState<{ [token: string]: ContractDetail }>({});
  const [rowData, setRowData] = useState<{ [strike: number]: Option }>({});  
  const [ltpData,setLtpData]=useState<any[]>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const constantValue = "25142.5";
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const [isRefresh,setIsRefresh]=useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const datesRedux = useSelector((state: RootState) => state.dates.dates);
  const firstSelectedOptionRedux = useSelector((state: RootState) => state.dropdown.firstSelectedOption);

console.log(optionResponse,"firs")
  

  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 999;
      setIsSmallScreen(smallScreen);
    };
  
    handleResize();   
  
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
        dispatch(setFirstSelectedOption(NameOptions[0]));
        //Setting Values for first dropdown
        dispatch(setFirstDropdown(NameOptions));
        //fetching Option array for selected value(BankNifty) to get all the dates and Strikes
        const currentOpts=data[NameOptions[0].name].OPT;
        setOpts(currentOpts)
        //Date array is populated here
        const DateOptions=Object.keys(currentOpts)
        const sortedDateOptions = DateOptions.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        // setDates(sortedDateOptions)
        dispatch(setDates(sortedDateOptions));
        setCurrentDate(sortedDateOptions[0]);
        const contractDetails:ContractDetail[]=currentOpts[sortedDateOptions[0]];
        //creating a map in which token will be key (all contracts api response)
        const tokenMap = createTokenMap(contractDetails);
        setTokenMapState(tokenMap);
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
        dispatch(setRowsRedux(rowData));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching option chain data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (index: number) => {
    setLoading(true);
    const selectedDate = datesRedux[index];
    setCurrentDate(selectedDate);
    setIsRefresh(!isRefresh);
    const contractDetails:ContractDetail[]=opts[selectedDate]
    const uniqueStrikes: number[] = getUniqueStrikes(contractDetails);
    setSelectedContractDetails(opts[selectedDate])
    const currentOptionData=optionResponse.options;
    const currentDateDataWithLTP=currentOptionData[selectedDate]
      const tokenMap = createTokenMap(contractDetails);
    setTokenMapState(tokenMap);
    const strikeMap = populateStrikeMap(currentDateDataWithLTP);
    const rowData = populateRowData(uniqueStrikes, strikeMap);
setRowData(rowData)
dispatch(setRowsRedux(rowData));
setLoading(false);

  };

  useEffect(() => {
    const fetchData = async () => {
        try {
 
           // Fetching Option array for selected value(BankNifty) to get all the dates and Strikes
            const currentOpts = allContracts[firstSelectedOptionRedux.name].OPT;
            setOpts(currentOpts);

            // Date array is populated here
            const DateOptions = Object.keys(currentOpts);
            const sortedDateOptions = DateOptions.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
            dispatch(setDates(sortedDateOptions));
            setCurrentDate(sortedDateOptions[0]);
            const contractDetails: ContractDetail[] = currentOpts[sortedDateOptions[0]];
            const uniqueStrikes: number[] = getUniqueStrikes(contractDetails);
            const tokenMap = createTokenMap(contractDetails);
            setTokenMapState(tokenMap);
            setSelectedContractDetails(currentOpts[sortedDateOptions[0]]);

            const optionResponse = await fetch(`/api/option-chain-with-ltp?underlying=${firstSelectedOptionRedux.name}`);
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
dispatch(setRowsRedux(rowData));


        } catch (error) {
            console.error("Error fetching option chain data:", error);
        }
    };
    if (Object.keys(allContracts).length > 0) {
      fetchData();
  }
  
}, [firstSelectedOptionRedux]); 

useEffect(() => {

  if (!wsRef.current) {
    try {
      wsRef.current = new WebSocket('wss://prices.algotest.xyz/mock/updates');
      const initiationMessage = {
        msg: {
          datatypes: ['ltp'],
          underlyings: [
            {
              underlying: `${firstSelectedOptionRedux.name}`,
              cash: true,
              options: [`${currentDate}`]
            }
          ]
        }
      };

      wsRef.current.onopen = () => {
        wsRef.current?.send(JSON.stringify(initiationMessage));
      };

      wsRef.current.onmessage = (event) => {
        const jsonData = JSON.parse(event.data);
        const ltpInfo = jsonData.ltp;
        if (ltpInfo && Array.isArray(ltpInfo)) {
          setLtpData(ltpInfo);
        }
      };
    } catch (error) {
      console.error('Error while creating WebSocket connection:', error);
    }
  }

  // Clean up when the component unmounts
  return () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };
}, [currentDate, firstSelectedOptionRedux]);


useEffect(() => {
  if (Array.isArray(ltpData) && ltpData.length > 0) {
    
    // Create a shallow copy of rowData to avoid mutating the original object
    const updatedRowData = { ...rowData };

    ltpData.forEach((data) => {
      const { token, ltp } = data;  
      
      // Checking if the token exists in the tokenMap 
      if (tokenMapState[token]) {
        const { strike, option_type } = tokenMapState[token]; 
        
        // Check if the row for the given strike exists
        if (updatedRowData[strike]) {
          // Update the copy instead of the original state
          if (option_type === "CE") {
            updatedRowData[strike] = {
              ...updatedRowData[strike],
              call_close: ltp,
            };
          } else if (option_type === "PE") {
            updatedRowData[strike] = {
              ...updatedRowData[strike],
              put_close: ltp,
            };
          }
        }
      }
    });

    // Update the state with the modified copy
    dispatch(setRowsRedux(updatedRowData));
  }
}, [ltpData]);



  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => {
        const newIndex = Math.min(prevIndex + 1, datesRedux.length - 1);
         return newIndex;
    });
};
 

  return (
<>
   {!isSmallScreen &&<Navbar/>}
<div className='responsive-container' >
  <StrategyHeader/>
  <TwoColumnLayout/>
     
      <Header 
      isSmallScreen={isSmallScreen} 
      />

       <Navigation
        currentDate={currentDate}
        currentIndex={currentIndex}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
        handleDateChange={handleDateChange}
       />
           <TableContainer loading={loading} isSmallScreen={isSmallScreen}  currentDate={currentDate} isRefresh={isRefresh}/>




    </div>
    {isSmallScreen &&(
      <BottomNav/>
    )}

 {!isSmallScreen && (   <div className='right-container-full'>
      <ExpiryStatus/>
      <OptionsAndHelp/>
      <CenteredText/>
    </div>)}
    </>
  );
};

export default OptionChain;
