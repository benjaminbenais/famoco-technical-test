import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getGlobalData } from 'slices/global';
import { GlobalMarketData, CurrenciesTable } from 'components/organisms';
import { getCurrencies, resetState } from 'slices/currencies';

const LIMIT = 15;

const getCurrentPage = (page: string | null) => {
  return page ? +page : 1;
};

const Data = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultPage = useRef(getCurrentPage(searchParams.get('page')));

  const dispatch = useAppDispatch();
  const { global, currencies } = useAppSelector((state) => state);

  const { data: globalData } = global;
  const { data: currenciesData } = currencies;

  const [pageCount, setPageCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentResults, setCurrentResults] = useState({
    start: 1,
    end: LIMIT
  });

  // Get global market data
  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    // Global market data gives us the total number of currencies.
    // We can use this value to handle the pagination.
    if (globalData?.coins_count) {
      const page = getCurrentPage(searchParams.get('page'));
      const start = (page - 1) * LIMIT;
      dispatch(getCurrencies({ start, limit: LIMIT }));

      setCurrentResults({ start: start + 1, end: start + LIMIT });

      if (!pageCount) {
        setPageCount(Math.floor(globalData.coins_count / LIMIT));
      }
    }
  }, [globalData?.coins_count, searchParams]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: String(page) });
  };

  return (
    <Box>
      <Box sx={{ mb: 8 }}>
        {globalData && <GlobalMarketData data={globalData} />}
      </Box>
      {currenciesData && (
        <>
          <CurrenciesTable data={currenciesData} />
          <Box
            sx={{
              py: 4,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              sx={{ fontSize: '14px' }}
            >{`Showing ${currentResults.start} - ${currentResults.end} out of ${globalData?.coins_count}`}</Typography>
            <Pagination
              count={pageCount}
              onChange={handlePageChange}
              defaultPage={defaultPage.current}
              color="primary"
              shape="rounded"
            />
            <p />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Data;
