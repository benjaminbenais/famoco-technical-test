import { Box, Typography, Divider, Link } from '@mui/material';

const Footer = () => {
  return (
    <>
      <Divider />
      <Box
        sx={{
          py: 8,
          color: 'text.secondary',
          fontSize: '13px'
        }}
        component="footer"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography sx={{ fontSize: 'inherit', mb: 2 }}>
            Made by Benjamin Benais
          </Typography>
          <Typography fontSize="inherit" sx={{ mb: 1 }}>
            benaisbenjamin@gmail.com
          </Typography>
          <Typography sx={{ mb: 1 }} fontSize="inherit">
            +32 492 41 04 35
          </Typography>
          <Link
            href="https://github.com/benjaminbenais"
            target="_blank"
            rel="noreferrer"
          >
            Github profile
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
