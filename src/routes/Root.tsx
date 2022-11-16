import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

import { Header } from 'components/organisms';

interface AppContainerProps {
  children?: ReactNode;
}

const Root = ({ children = null }: AppContainerProps) => {
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
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
};

export default Root;
