import { useEffect, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StoreIcon from '@mui/icons-material/Store';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getCurrency, resetState as resetCurrencyState } from 'slices/currency';
import { getMarkets, resetState as resetMarketsState } from 'slices/markets';
import { CurrencyData, MarketsTable } from 'components/organisms';

const Currency = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { currency, markets } = useAppSelector((state) => state);
  const { data: currencyData } = currency;
  const { data: marketsData } = markets;

  useEffect(() => {
    if (id) {
      dispatch(getCurrency({ id }));
      dispatch(getMarkets({ id }));
    }
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetCurrencyState());
      dispatch(resetMarketsState());
    };
  }, []);

  const currenciesLink = useMemo(() => {
    const params = Object.keys(location.state).map((key, i) => {
      if (location.state[key]) {
        return i === 0
          ? `?${key}=${location.state[key]}`
          : `&${key}=${location.state[key]}`;
      }

      return '';
    });

    return `/currencies${params.join('')}`;
  }, [location]);

  return (
    <Box>
      <Link style={{ textDecoration: 'none' }} to={currenciesLink}>
        <Typography
          color="text.primary"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            mb: 4,
            ml: '-12px',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <KeyboardArrowLeftIcon />
          Back
        </Typography>
      </Link>
      <Box sx={{ mb: 10 }}>
        {currencyData && <CurrencyData data={currencyData} />}
      </Box>
      <Box>
        {currencyData && marketsData && (
          <>
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                mb: 4
              }}
            >
              {currencyData.name} Markets
              <StoreIcon sx={{ pl: 1 }} />
            </Typography>
            <MarketsTable
              data={marketsData}
              volume24={Number(currencyData?.volume24)}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Currency;
