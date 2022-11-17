import { Link } from 'react-router-dom';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MuiLink
          href="https://github.com/benjaminbenais/famoco-technical-test"
          target="_blank"
          rel="noreferrer"
          color="text.primary"
        >
          <GitHubIcon />
        </MuiLink>
        <ThemeSwitcher />
      </Box>
    </Box>
  );
};

export default Header;
