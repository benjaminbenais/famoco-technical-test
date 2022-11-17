import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getCoin, resetState as resetCoinState } from 'slices/coin';
import { getMarkets, resetState as resetMarketsState } from 'slices/markets';
import { CoinCard, MarketsTable } from 'components/organisms';

const CoinDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { coin, markets } = useAppSelector((state) => state);
  const { loading: loadingCoin, data: coinData } = coin;
  // eslint-disable-next-line
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
      <Box sx={{ mb: 10 }}>{coinData && <CoinCard data={coinData} />}</Box>
      <Box>
        {coinData && marketsData && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
              {coinData.name} Markets
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
