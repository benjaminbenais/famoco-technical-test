import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Coin } from 'types/Coins';

interface CurrenciesTableProps {
  data: Coin[];
}

const getPercentChangeStyle = (value: string) => {
  const n = Number(value);

  if (n > 0) {
    return {
      color: '#16c784',
      symbol: '"\u25b2"'
    };
  }

  if (n < 0) {
    return {
      color: '#ea3943',
      symbol: '"\u25bc"'
    };
  }

  return null;
};

const PercentChange = ({ value }: { value: string }) => {
  const style = getPercentChangeStyle(value);

  return (
    <Typography
      variant="body1"
      sx={{
        color: style?.color,
        ...(style?.symbol
          ? {
              '&:before': {
                position: 'relative',
                top: '-2px',
                content: style.symbol,
                fontSize: '10px',
                marginRight: '2px'
              }
            }
          : {})
      }}
    >
      {value ? `${value}%` : '-'}
    </Typography>
  );
};

const CurrenciesTable = ({ data }: CurrenciesTableProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
          {data?.map((currency) => (
            <TableRow
              hover
              tabIndex={-1}
              key={currency.id}
              onClick={() =>
                navigate(`/currency/${currency.id}`, {
                  state: {
                    page: searchParams.get('page'),
                    rowsPerPage: searchParams.get('rowsPerPage')
                  }
                })
              }
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer'
              }}
            >
              <TableCell component="th" scope="row">
                {currency.rank}
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {currency.name}
                </Typography>
                {currency.symbol}
              </TableCell>
              <TableCell align="right">
                {currency.price_usd
                  ? `$${Number(currency.price_usd).toLocaleString()}`
                  : '-'}
              </TableCell>
              <TableCell align="right">
                <PercentChange value={currency.percent_change_1h} />
              </TableCell>
              <TableCell align="right">
                <PercentChange value={currency.percent_change_24h} />
              </TableCell>
              <TableCell align="right">
                <PercentChange value={currency.percent_change_7d} />
              </TableCell>
              <TableCell align="right">
                {currency.market_cap_usd
                  ? `$${Number(currency.market_cap_usd).toLocaleString()}`
                  : '-'}
              </TableCell>
              <TableCell align="right">
                {currency.volume24
                  ? `$${Number(currency.volume24).toLocaleString()}`
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrenciesTable;
