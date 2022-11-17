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
        position: 'relative',
        top: '-2px',
        content: '"\u25b2"',
        fontSize: '10px',
        marginRight: '2px'
      }
    };
  }

  if (n < 0) {
    return {
      color: 'red',
      '&:before': {
        position: 'relative',
        top: '-2px',
        content: '"\u25bc"',
        fontSize: '10px',
        marginRight: '2px'
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
              <TableCell align="right">
                ${Number(coin.price_usd).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body1"
                  sx={getPercentChangeStyle(coin.percent_change_1h)}
                >
                  {coin.percent_change_1h}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body1"
                  sx={getPercentChangeStyle(coin.percent_change_24h)}
                >
                  {coin.percent_change_24h}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body1"
                  sx={getPercentChangeStyle(coin.percent_change_7d)}
                >
                  {coin.percent_change_7d}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                ${Number(coin.market_cap_usd).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                ${Number(coin.volume24).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MarketTable;
