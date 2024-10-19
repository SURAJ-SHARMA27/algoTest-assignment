import { CloseValues, ContractDetail, Option } from "./interfaces";

export const getUniqueStrikes = (contractDetails: { strike: number }[]): number[] => {
    return [...new Set(contractDetails.map((contract) => contract.strike))].sort((a, b) => a - b);
  };


export const createTokenMap = (contractDetails: ContractDetail[]): { [token: string]: ContractDetail } => {
    return contractDetails.reduce((map: { [token: string]: ContractDetail }, contract: ContractDetail) => {
      map[contract.token] = contract;  
      return map;
    }, {});
  };


export const populateStrikeMap = (
  currentDateDataWithLTP: any
): { [strike: number]: CloseValues } => {
  const strikeMap: { [strike: number]: CloseValues } = {};

  if (currentDateDataWithLTP && Array.isArray(currentDateDataWithLTP.strike)) {
    currentDateDataWithLTP.strike.forEach((strikeValue: number, index: number) => {
      strikeMap[strikeValue] = {
        call_close: currentDateDataWithLTP.call_close[index],
        put_close: currentDateDataWithLTP.put_close[index],
        call_delta: currentDateDataWithLTP.call_delta[index],
        put_delta: currentDateDataWithLTP.put_delta[index],
      };
    });
  }

  return strikeMap;
};

export const populateRowData = (
    uniqueStrikes: number[],
    strikeMap: { [strike: number]: CloseValues }
  ): { [strike: number]: Option } => {
    const rowData: { [strike: number]: Option } = {};
  
    uniqueStrikes.forEach((strike: number) => {
      // Create a new Option object for each unique strike
      const option: Option = {
        delta: 0, // Default value, can be customized
        call_close: "", // Default to empty string
        put_close: "",  // Default to empty string
        strike: strike, // Set the current strike
        call_delta: 0,  // Default value
        put_delta: 0,   // Default value
      };
  
      // If strikeMap contains data for this strike, populate the option object
      if (strikeMap[strike]) {
        option.call_close = strikeMap[strike].call_close !== null ? strikeMap[strike].call_close : "";
        option.put_close = strikeMap[strike].put_close !== null ? strikeMap[strike].put_close : "";
        option.call_delta = strikeMap[strike].call_delta !== null ? strikeMap[strike].call_delta : 0;
        option.put_delta = strikeMap[strike].put_delta !== null ? strikeMap[strike].put_delta : 0;
      }
  
      // Add the option object to rowData using the strike as the key
      rowData[strike] = option;
    });
  
    return rowData;
  };