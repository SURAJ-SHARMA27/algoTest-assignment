export interface ContractDetail {
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
  export interface CloseValues {
    call_close: number | "";
    put_close: number | "";
    call_delta: number | "";
    put_delta: number | "";
  }
  export interface Option {
    delta: number;
    call_close: (number | ""); 
    put_close: (number | "");  
    strike: number;
    call_delta: (number|"");
    put_delta: (number|"");
  }

  export interface OptionData {
    delta: number[];
    call_close: (number | "")[]; 
    put_close: (number | "")[];  
    strike: number[];
    call_delta: number[];
    put_delta: number[];
  }

  export interface OptionChainData {
    [key: string  ]: OptionData;
  }

  export interface ContractDetail {
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

 export interface Option {
    delta: number;
    call_close: (number | ""); 
    put_close: (number | "");  
    strike: number;
    call_delta: (number|"");
    put_delta: (number|"");
  }