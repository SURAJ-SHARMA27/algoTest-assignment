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
  rows: { [strike: number]: Option }; // The rows object is keyed by strike prices
}

const TableContainer: React.FC<TableContainerProps> = ({ loading, isSmallScreen, rows }) => {
  return (
    <div style={{ height: '82vh', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
      {loading ? (
        <Box sx={{ padding: '20px' }}>
          <Skeleton variant="rectangular" width="100%" height={40} animation="wave" />
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={30} animation="wave" sx={{ marginTop: 1 }} />
          ))}
        </Box>
      ) : (
        <>
          {!isSmallScreen && <TableBigScreen rows={rows} />}
          {isSmallScreen && <TableSmallScreen rows={rows} />}
        </>
      )}
    </div>
  );
};

export default TableContainer;
