import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

import { ThemeSwitcher } from 'components/molecules';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 3
      }}
    >
      <RouterLink to="/" style={{ textDecoration: 'none' }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Crypto Market
        </Typography>
      </RouterLink>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link
          href="https://github.com/benjaminbenais/famoco-technical-test"
          target="_blank"
          rel="noreferrer"
          color="text.primary"
        >
          <GitHubIcon />
        </Link>
        <ThemeSwitcher />
      </Box>
    </Box>
  );
};

export default Header;
