import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      <Box sx={{ mb: 8 }} textAlign="center">
        <Typography variant="h1">Hello Famoco !</Typography>
        <Typography>
          My name is Benjamin, This is my take on the technical test.
        </Typography>
      </Box>
      <Box textAlign="center">
        <Typography sx={{ mb: 2 }}>TODO: Explain the projet</Typography>
        <Button
          variant="contained"
          sx={{
            '& > a': {
              color: 'inherit',
              textDecoration: 'none'
            }
          }}
        >
          <Link to="/currencies">Go the the data</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
