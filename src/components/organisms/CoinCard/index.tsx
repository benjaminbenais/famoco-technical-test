/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import { Box, Typography, Chip, Divider, LinearProgress } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Coin } from 'types/Coins';

interface CoinCardProps {
  data: Coin;
}

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <>
      <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
        {value}
      </Typography>
    </>
  );
};

const CoinCard = ({ data }: CoinCardProps) => {
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

  const supplyPercentage = useMemo(() => {
    return ((Number(data.tsupply) * 100) / Number(data.msupply)).toFixed();
  }, [data]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, pr: 2 }}>
            {data.name}
          </Typography>
          <Chip label={data.symbol} />
        </Box>
        <Chip label={`Rank #${data.rank}`} size="small" sx={{ mt: 1 }} />
        <Box sx={{ display: 'flex', mt: 4 }}>
          <Box sx={{ pr: 3 }}>
            <Item
              label="Market Cap"
              value={`$${Number(data.market_cap_usd).toLocaleString()}`}
            />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ px: 3 }}>
            <Item
              label="Volume 24h"
              value={`$${Number(data.volume24).toLocaleString()}`}
            />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ pl: 3 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>
              Circulating Supply
            </Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Typography
                sx={{ pr: 4, fontWeight: 600, fontSize: '14px' }}
              >{`${Number(data.tsupply).toLocaleString()} ${
                data.symbol
              }`}</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>
                {supplyPercentage}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              color="inherit"
              value={+supplyPercentage}
            />
          </Box>
        </Box>
      </Box>
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
    </Box>
  );
};

export default CoinCard;
