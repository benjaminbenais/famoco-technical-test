import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import { Header, Footer } from 'components/organisms';

const Root = () => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ minHeight: '100vh' }}>
          <Header />
          <Outlet />
        </Box>
        <Footer />
        <ScrollRestoration />
      </Container>
    </Box>
  );
};

export default Root;
