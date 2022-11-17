import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import { Header } from 'components/organisms';

const Root = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Header />
      <Container maxWidth="lg">
        <Outlet />
        <ScrollRestoration />
      </Container>
    </Box>
  );
};

export default Root;
