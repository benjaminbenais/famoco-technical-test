import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getCoin } from 'slices/coin';
import { getMarkets } from 'slices/markets';
import { CoinCard } from 'components/organisms';

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

  if (loadingCoin || loadingMarkets) {
    return <p>Loading...</p>;
  }

  return <Box>{coinData && <CoinCard data={coinData} />}</Box>;
};

export default CoinDetails;
