import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        component={'footer'}
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {'Copyright © Jake Moening '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
};

export default Footer;
