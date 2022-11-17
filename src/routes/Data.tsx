import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getGlobalData } from 'slices/global';
import { MarketTable } from 'components/organisms';
import { getCoins } from 'slices/coins';

const LIMIT = 15;

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

  if (!allCoins) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Box>
        <MarketTable data={allCoins} />
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
