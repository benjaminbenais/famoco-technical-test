import Box from '@mui/material/Box';

import { ThemeSwitcher } from 'components/molecules';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <p>Logo</p>
      <ThemeSwitcher />
    </Box>
  );
};

export default Header;
