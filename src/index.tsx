import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Battle from './pages/Battle';
import { themeOptions } from './theme';
import { start, battle, rejoin, game } from './routes';
import ReJoinLanding from './pages/ReJoin';
import Game from './pages/Game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const theme = createTheme(themeOptions);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="BattlePuttHostApp">
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to={start} />} />
            <Route path={start} element={<Landing />} />
            <Route path={rejoin} element={<ReJoinLanding />} />
            <Route path={`${battle}/:battleId`} element={<Battle />} />
            <Route path={`${game}/:slug/:code`} element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
