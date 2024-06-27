/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

export default function SignIn() {
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
            fetch('http://localhost:3000/sign-in', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
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
                  
                  alert(data.msg);
                }
              });
        }else{
          alert('invalid email addresss')
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              sx={{ color: 'inherit' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              sx={{ color: 'inherit' }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: 'inherit' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <button onClick={() => { navigate('/signup') }}>Don't have an account? Sign up</button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
