import { useMemo } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Coin } from 'types/Coins';

interface PriceProps {
  data: Coin;
}

const Price = ({ data }: PriceProps) => {
  const percentChange = useMemo<{
    color: 'success' | 'error' | 'default';
    icon?: JSX.Element;
  }>(() => {
    const n = Number(data.percent_change_24h);

    if (n > 0) {
      return {
        color: 'success',
        icon: <ArrowDropUpIcon />
      };
    }

    if (n < 0) {
      return {
        color: 'error',
        icon: <ArrowDropDownIcon />
      };
    }

    return {
      color: 'default'
    };
  }, [data]);

  return (
    <Box>
      <Typography
        sx={{ color: 'text.secondary', fontSize: '14px', mb: 1 }}
      >{`${data.name} Price (${data.symbol})`}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, pr: 2 }}>
          ${Number(data.price_usd).toLocaleString()}
        </Typography>
        <Chip
          label={`${data.percent_change_24h}%`}
          {...percentChange}
          sx={{ fontWeight: 600 }}
        />
      </Box>
    </Box>
  );
};

export default Price;
