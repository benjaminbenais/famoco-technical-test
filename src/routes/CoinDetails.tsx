import { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getCoin, resetState as resetCoinState } from 'slices/coin';
import { getMarkets, resetState as resetMarketsState } from 'slices/markets';
import { CoinData, MarketsTable } from 'components/organisms';

const CoinDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { coin, markets } = useAppSelector((state) => state);
  const { loading: loadingCoin, data: coinData } = coin;
  const { loading: loadingMarkets, data: marketsData } = markets;

  useEffect(() => {
    if (id) {
      dispatch(getCoin({ id }));
      dispatch(getMarkets({ id }));
    }
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetCoinState());
      dispatch(resetMarketsState());
    };
  }, []);

  if (loadingCoin || loadingMarkets) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Link
        style={{ textDecoration: 'none' }}
        to={
          location.state?.page ? `/coins?page=${location.state.page}` : '/coins'
        }
      >
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
      <Box sx={{ mb: 10 }}>{coinData && <CoinData data={coinData} />}</Box>
      <Box>
        {coinData && marketsData && (
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
              {coinData.name} Markets
              <StoreIcon sx={{ pl: 1 }} />
            </Typography>
            <MarketsTable
              data={marketsData}
              volume24={Number(coinData?.volume24)}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default CoinDetails;
