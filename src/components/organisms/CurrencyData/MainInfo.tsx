import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

import { Coin } from 'types/Coins';

interface MainInfoProps {
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

const MainInfo = ({ data }: MainInfoProps) => {
  const supplyPercentage = useMemo(() => {
    return ((Number(data.tsupply) * 100) / Number(data.msupply)).toFixed();
  }, [data]);

  return (
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
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'flex'
          },
          mt: 4
        }}
      >
        <Box
          sx={{
            pr: {
              xs: 0,
              sm: 3
            },
            pb: {
              xs: 3,
              md: 0
            }
          }}
        >
          <Item
            label="Market Cap"
            value={`$${Number(data.market_cap_usd).toLocaleString()}`}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Divider orientation="horizontal" />
        <Box
          sx={{
            px: {
              xs: 0,
              sm: 3
            },
            py: {
              xs: 3,
              sm: 0
            }
          }}
        >
          <Item
            label="Volume 24h"
            value={`$${Number(data.volume24).toLocaleString()}`}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Divider orientation="horizontal" />
        <Box
          sx={{
            pl: {
              xs: 0,
              sm: 3
            },
            pt: {
              xs: 3,
              sm: 0
            }
          }}
        >
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
  );
};

export default MainInfo;
