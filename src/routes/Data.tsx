import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getGlobalData } from 'slices/global';
import { getCoins } from 'slices/coins';

const LIMIT = 20;

const Data = () => {
  const dispatch = useAppDispatch();
  const {
    // loading: globalLoading,
    global,
    coins
    // error: globalError
  } = useAppSelector((state) => state);

  const { data: globalData } = global;
  const { data: allCoins } = coins;

  // const [start, setStart] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    if (globalData?.coins_count) {
      dispatch(getCoins({ start: 0, limit: LIMIT }));
      setPageCount(Math.floor(globalData.coins_count / LIMIT));
    }
  }, [globalData?.coins_count]);

  return (
    <Box sx={{ py: 4 }}>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price (USD)</TableCell>
                <TableCell align="right">Market cap (USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCoins?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.rank}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>${row.price_usd}</TableCell>
                  <TableCell align="right">${row.market_cap_usd}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          py: 4,
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Pagination count={pageCount} color="primary" />
      </Box>
    </Box>
  );
};

export default Data;
