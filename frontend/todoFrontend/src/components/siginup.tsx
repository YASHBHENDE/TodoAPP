/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { COLORMODE } from '../App';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // example primary color for dark mode
    },
    text: {
      primary: '#ffffff', // text color in dark mode
      secondary: '#cccccc', // secondary text color in dark mode
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // example primary color for light mode
    },
    text: {
      primary: '#000000', // text color in light mode
      secondary: '#333333', // secondary text color in light mode
    },
  },
});

export default function SignUp() {
  const navigate = useNavigate();
  const mode = useContext(COLORMODE);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(data.get('email') =='' || data.get('password') == '' || data.get('username') == ''){
      alert("fields cannot be empty")
    }else{
      const validateEmail = (email:string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      const email = data.get('email') as string;
      if(validateEmail(email)){
        fetch('http://localhost:3000/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
            username: data.get('username'),
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.token) {
              localStorage.setItem('token', 'Bearer ' + data.token);
              navigate('/home');
              window.location.reload();
            } else {
             
              if(data.UserNameExists){
                alert(data.UserNameExists)
              }else if(data.UserExists){
                alert(data.UserExists)
              }else{
                alert("username and password should atleast contain (5) characters")
              }
            }
          });
      }else{
          alert('invalid email address')
      }
      
    }
    
  };

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: mode === 'light' ? lightTheme.palette.text.primary : darkTheme.palette.text.primary,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: 'inherit' }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  variant="outlined"
                  sx={{ color: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  sx={{ color: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  sx={{ color: 'inherit' }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: mode === 'light' ? lightTheme.palette.primary.main : darkTheme.palette.primary.main,
                color: mode === 'light' ? lightTheme.palette.text.primary : darkTheme.palette.text.primary,
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: 'inherit' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


