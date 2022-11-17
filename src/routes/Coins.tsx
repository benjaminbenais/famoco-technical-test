import { useEffect, useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getGlobalData } from 'slices/global';
import { GlobalMarketData, MarketTable } from 'components/organisms';
import { getCoins } from 'slices/coins';

const LIMIT = 15;

const Data = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { global, coins } = useAppSelector((state) => state);

  const { loading, data: globalData } = global;
  const { data: allCoins } = coins;

  const [pageCount, setPageCount] = useState(0);

  // Get global market data
  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    // Global market data gives us the total number of coins.
    // We can use this value to handle the pagination.
    if (globalData?.coins_count) {
      const page = searchParams.get('page') || 1;

      dispatch(getCoins({ start: (+page - 1) * LIMIT, limit: LIMIT }));

      if (!pageCount) {
        setPageCount(Math.floor(globalData.coins_count / LIMIT));
      }
    }
  }, [globalData?.coins_count, searchParams]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: String(page) });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!allCoins || !globalData) {
    return null;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 8 }}>
        <GlobalMarketData data={globalData} />
      </Box>
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
        <Pagination
          count={pageCount}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default Data;
