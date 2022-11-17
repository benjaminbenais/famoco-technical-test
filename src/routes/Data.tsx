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
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const {
    // loading: globalLoading,
    global,
    coins
    // error: globalError
  } = useAppSelector((state) => state);

  const { data: globalData } = global;
  const { data: allCoins } = coins;

  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
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

  if (!allCoins || !globalData) {
    return <p>Loading...</p>;
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
