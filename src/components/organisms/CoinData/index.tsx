import { Box } from '@mui/material';

import { Coin } from 'types/Coins';
import MainInfo from './MainInfo';
import Price from './Price';

interface CoinDataProps {
  data: Coin;
}

const CoinData = ({ data }: CoinDataProps) => {
  return (
    <Box
      sx={{
        display: {
          sm: 'block',
          md: 'flex'
        },
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          mb: {
            xs: 4,
            md: 0
          }
        }}
      >
        <MainInfo data={data} />
      </Box>
      <Price data={data} />
    </Box>
  );
};

export default CoinData;
