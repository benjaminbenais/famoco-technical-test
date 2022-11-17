import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Coin } from 'types/Coins';

interface MarketTableProps {
  data: Coin[];
}

const getPercentChangeStyle = (value: string) => {
  const n = Number(value);

  if (n > 0) {
    return {
      color: '#16c784',
      '&:before': {
        content: '"\u25b2"',
        transform: 'scale(0.7)',
        verticalAlign: 'center'
      }
    };
  }

  if (n < 0) {
    return {
      color: 'red',
      '&:before': {
        content: '"\u25bc"',
        transform: 'scale(0.7)'
      }
    };
  }

  return null;
};

const MarketTable = ({ data }: MarketTableProps) => {
  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 650,
          bgcolor: 'background.default'
        }}
        aria-label="cryptocurrencies market table"
      >
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price (USD)</TableCell>
            <TableCell align="right">1h %</TableCell>
            <TableCell align="right">24h %</TableCell>
            <TableCell align="right">7d %</TableCell>
            <TableCell align="right">Market cap (USD)</TableCell>
            <TableCell align="right">Volume (24h)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((coin) => (
            <TableRow
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {coin.rank}
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 'bold' }}>{coin.name}</Typography>
                {coin.symbol}
              </TableCell>
              <TableCell align="right">${coin.price_usd}</TableCell>
              <TableCell align="right">
                <Typography
                  variant="body1"
                  sx={getPercentChangeStyle(coin.percent_change_1h)}
                >
                  {coin.percent_change_1h}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body1"
                  sx={getPercentChangeStyle(coin.percent_change_24h)}
                >
                  {coin.percent_change_24h}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body1"
                  sx={getPercentChangeStyle(coin.percent_change_7d)}
                >
                  {coin.percent_change_7d}
                </Typography>
              </TableCell>
              <TableCell align="right">${coin.market_cap_usd}</TableCell>
              <TableCell align="right">
                ${Number(coin.volume24).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MarketTable;
