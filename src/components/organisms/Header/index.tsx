import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { ThemeSwitcher } from 'components/molecules';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        py: 3
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Crypto Market
        </Typography>
      </Link>
      <ThemeSwitcher />
    </Box>
  );
};

export default Header;
