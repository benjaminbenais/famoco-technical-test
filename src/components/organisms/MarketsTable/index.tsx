/* eslint-disable react/no-array-index-key */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Market } from 'types/Markets';

interface MarketsTableProps {
  data: Market[];
  volume24: number;
}

const MarketsTable = ({ data, volume24 }: MarketsTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Pairs</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">24h Volume</TableCell>
            <TableCell align="right">Volume %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((market, i) => (
            <TableRow
              key={`${market.name}-${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell>{market.name}</TableCell>
              <TableCell>{`${market.base}/${market.quote}`}</TableCell>
              <TableCell align="right">
                ${market.price_usd.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                ${market.volume_usd.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                ${((market.volume_usd * 100) / volume24).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MarketsTable;
