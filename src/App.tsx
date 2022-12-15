import { Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './layout';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Header />
        <Container
          component={'main'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Outlet />
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default App;
