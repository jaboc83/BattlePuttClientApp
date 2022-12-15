import { Box, Link, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => (
  <Box component={'header'} sx={{ mb: 12 }}>
    <AppBar enableColorOnDark color="primary">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Link
          component={RouterLink}
          to="/start"
          sx={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <Typography
            variant="h2"
            component={'h1'}
            sx={{ fontWeight: 500 }}
            align="center"
          >
            Battle Putt
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Header;
