import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/siginup";
import SignIn from "./components/signin";
import LandingPage from "./components/landing";
import Homepage from "./components/homepage";
import { useEffect, } from "react";
import Appbar from './components/appbar';
import ScoreBoard from "./components/scoreboard";
import axios from 'axios';
import { CompletedTasks } from "./store/index";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {
  RecoilRoot,
 
  useSetRecoilState,
} from 'recoil';

import { userState } from "./store/index";
import React from "react";


export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
export const COLORMODE = React.createContext('')
export default function App() {
  
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                background: {
                  default: '#ffffff',
                },
              }
            : {
                background: {
                  default: '#121212',
                },
              }),
        },
      }),
    [mode],
  );
  
  return (
    <>
      <COLORMODE.Provider value={mode}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <RecoilRoot>
            <BrowserRouter>
              <Appbar />
              <InitUser />
              <Routes>
                <Route element={<LandingPage />} path="/" />
                <Route element={<SignUp />} path="/signup" />
                <Route element={<SignIn />} path="/signin" />
                <Route element={<Homepage />} path="/home" />
                <Route element={<ScoreBoard />} path="/scoreboard" />
              </Routes>
            </BrowserRouter>
          </RecoilRoot>
          <CssBaseline />
        </ThemeProvider>
      </ColorModeContext.Provider>
      </COLORMODE.Provider>
    </>
  );
}

function InitUser() {
  const setusername = useSetRecoilState(userState);

  const setCompletedTasks = useSetRecoilState(CompletedTasks);
  
  useEffect(() => {
    axios.get('http://localhost:3000/me', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then((response) => {
      setCompletedTasks(response.data.CompletedTasks);
      setusername(response.data.username);
     
    });
  }, []);

  return <></>;
}
