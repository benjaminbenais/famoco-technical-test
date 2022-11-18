import { useEffect, useState, ChangeEvent, MouseEvent, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getGlobalData } from 'slices/global';
import { GlobalMarketData, CurrenciesTable } from 'components/organisms';
import { getCurrencies, resetState } from 'slices/currencies';

const LIMIT = 25;

const getCurrentPage = (page: string | null) => {
  return page ? +page : 1;
};

const getCurrentRowsPerPage = (rows: string | null) => {
  return rows ? +rows : LIMIT;
};

const Data = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { global, currencies } = useAppSelector((state) => state);

  const { data: globalData } = global;
  const { data: currenciesData } = currencies;

  const [pageCount, setPageCount] = useState(0);

  // Get global market data
  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  const page = useMemo(() => {
    return getCurrentPage(searchParams.get('page'));
  }, [searchParams]);

  const rowsPerPage = useMemo(() => {
    return getCurrentRowsPerPage(searchParams.get('rowsPerPage'));
  }, [searchParams]);

  useEffect(() => {
    // Global market data gives us the total number of currencies.
    // We can use this value to handle the pagination.
    if (globalData?.coins_count) {
      const start = (page - 1) * rowsPerPage;
      dispatch(getCurrencies({ start, limit: rowsPerPage }));

      if (!pageCount) {
        setPageCount(Math.floor(globalData.coins_count / rowsPerPage));
      }
    }
  }, [globalData?.coins_count, rowsPerPage, page]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchParams({
      page: String(newPage + 1),
      rowsPerPage: rowsPerPage.toString()
    });
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchParams({
      page: '1',
      rowsPerPage: parseInt(event.target.value, 10).toString()
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 8 }}>
        {globalData && <GlobalMarketData data={globalData} />}
      </Box>
      {currenciesData && (
        <>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
            Today&lsquo;s Cryptocurrency Prices by Market Cap
          </Typography>
          <CurrenciesTable data={currenciesData} />
          <TablePagination
            component="div"
            count={Number(globalData?.coins_count)}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default Data;
