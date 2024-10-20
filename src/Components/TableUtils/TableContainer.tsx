// TableContainer.tsx
import React from 'react';
import { Box, Skeleton } from '@mui/material';
import TableBigScreen from './TableBigScreen'; // Adjust the path as necessary
import TableSmallScreen from './TableSmallScreen'; // Adjust the path as necessary
interface Option {
    delta: number;
    call_close: number | "";
    put_close: number | "";
    strike: number;
    call_delta: number | "";
    put_delta: number | "";
  }
interface TableContainerProps {
  loading: boolean;
  isSmallScreen: boolean;
  currentDate:string;
  isRefresh:boolean;
}

const TableContainer: React.FC<TableContainerProps> = ({ loading, isSmallScreen,currentDate,isRefresh }) => {
  return (
    <div style={{height: 'calc(100vh - 250px)', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
      {loading ? (
        <Box sx={{ padding: '20px' }}>
          <Skeleton variant="rectangular" width="100%" height={40} animation="wave" />
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={30} animation="wave" sx={{ marginTop: 1 }} />
          ))}
        </Box>
      ) : (
        <>
          {!isSmallScreen && <TableBigScreen  isRefresh={isRefresh}/>}
          {isSmallScreen && <TableSmallScreen  currentDate={currentDate} />}
        </>
      )}
    </div>
  );
};

export default TableContainer;
