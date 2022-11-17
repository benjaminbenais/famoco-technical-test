import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Global } from 'types/Global';

interface GlobalMarketProps {
  data: Global;
}

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box
      component="li"
      sx={{ display: 'flex', alignItems: 'center', fontSize: '13px' }}
    >
      <Typography component="span" sx={{ fontSize: 'inherit', mr: 0.5 }}>
        {label}:
      </Typography>
      <Typography
        component="span"
        sx={{ fontSize: 'inherit', color: 'primary.main' }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const GlobalMarketData = ({ data }: GlobalMarketProps) => {
  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Item label="Cryptos" value={data.coins_count.toLocaleString()} />
      <Item label="Exchanges" value={data.active_markets.toLocaleString()} />
      <Item label="Market Cap" value={`$${data.total_mcap.toLocaleString()}`} />
      <Item label="24h Vol" value={`$${data.total_volume.toLocaleString()}`} />
      <Item label="Dominance BTC" value={`${data.btc_d.toLocaleString()}%`} />
    </Box>
  );
};

export default GlobalMarketData;
