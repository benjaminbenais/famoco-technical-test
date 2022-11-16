import Box from '@mui/material/Box';

import { ThemeSwitcher } from 'components/molecules';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        px: 2,
        py: 3
      }}
    >
      <p>Logo</p>
      <ThemeSwitcher />
    </Box>
  );
};

export default Header;
