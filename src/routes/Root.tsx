import { Outlet, ScrollRestoration } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
          <Box sx={{ py: 4 }}>
            <Outlet />
          </Box>
        </Box>
        <Footer />
        <ScrollRestoration />
      </Container>
    </Box>
  );
};

export default Root;
