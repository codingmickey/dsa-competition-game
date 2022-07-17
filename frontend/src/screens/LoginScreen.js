import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import login from '../actions/userAction';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8985f2',
    },
    secondary: {
      main: '#ff4843',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minWidth: 0 },
      },
    },
  },
});

function LoginScreen() {
  const {
    handleSubmit,
    formState: { errors, touchedFields },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  console.log(error);

  const [snackBools, setSnackBools] = useState({
    successOpen: false,
    errorOpen: false,
  });
  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBools({ ...snackBools, successOpen: false });
    navigate('/landingPage');
  };
  const handleErorrClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBools({ ...snackBools, errorOpen: false });
  };
  console.log(errors);
  console.log(`touchedFields: ${touchedFields.username}`);

  const onSubmit = (data) =>
    dispatch(login(getValues('email'), getValues('password')));

  useEffect(() => {
    if (error) {
      setSnackBools({ ...snackBools, errorOpen: true });
    }
    if (userInfo) {
      setSnackBools({ ...snackBools, successOpen: true });
    }
  }, [error, userInfo]);

  const matchesM = useMediaQuery((theme) =>
    theme.breakpoints.up('md'),
  );
  const matchesS = useMediaQuery((theme) =>
    theme.breakpoints.up('sm'),
  );

  console.log(matchesM, matchesS);
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          backgroundImage: 'url(/images/background.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: '#F1F1F1',
          width: '100%',
          height: '100vh',
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgb(255, 255, 255, 0.1)',
            borderRadius: '7px',
            width: matchesM ? '40rem' : matchesS ? '40rem' : '45%',
            height: matchesM ? '30rem' : matchesS ? '30rem' : '20rem',
            textAlign: 'center',
            backdropFilter: 'blur(57.4px)',
            paddingBottom: matchesM ? '0.3' : '0.8rem',
            margin: matchesM ? '2rem 0' : '4rem 0',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: '2.3rem',
              color: '#8985F2',
              fontWeight: '700',
              margin: '1.5rem 0',
            }}
          >
            LOGIN
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item md={6} sm={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      color="primary"
                      label="Email"
                      id="email"
                      error={errors.email}
                      helperText={
                        errors.email ? 'Enter a valid email' : ' '
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      color="primary"
                      label="Password"
                      id="password"
                      type="password"
                      error={errors.password}
                      helperText={
                        errors.password
                          ? 'Enter a valid 6 digit password'
                          : ' '
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  height: '4px',
                  backgroundColor: '#f1f1f1',
                  width: matchesS ? '6.3rem' : '1rem',
                  display: 'inline-block',
                  margin: '0 0.5rem 0rem',
                  borderRadius: '2.5px',
                }}
              />
              <Typography
                variant="p"
                sx={{
                  fontWeight: '600',
                  margin: '1rem 0',
                  fontSize: '1.2rem',
                }}
              >
                OR
              </Typography>
              <Box
                sx={{
                  height: '4px',
                  backgroundColor: '#f1f1f1',
                  width: matchesS ? '6.3rem' : '4.5rem',
                  display: 'inline-block',
                  margin: '0 0.5rem 0rem',
                  borderRadius: '2.5px',
                }}
              />
            </Box>
            <Box
              sx={{
                m: 2,
                marginBottom: '0.5rem',
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="p"
                sx={{
                  margin: '1rem 0',
                  marginRight: matchesS ? '0.5rem' : '0',
                  fontSize: '1rem',
                }}
              >
                Sign Up With
              </Typography>
              <a href="http://localhost:5000/api/user/google">
                <FcGoogle
                  style={{
                    backgroundColor: '#f1f1f1',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '3.5px',
                    padding: '0.3rem',
                    margin: '0 0.7rem',
                  }}
                />
              </a>
              <a href="/">
                <FaGithub
                  style={{
                    backgroundColor: '#f1f1f1',
                    color: 'black',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '3.5px',
                    margin: '0 0.7rem',
                    padding: '0.3rem',
                  }}
                />
              </a>
            </Box>
            <Box
              sx={{
                width: matchesS ? '30rem' : '10rem',
                margin: '0 auto',
              }}
            >
              <Button
                variant="contained"
                size="matchesS? small :large"
                color="primary"
                fullWidth
                type="submit"
                style={{ fontSize: '1.3rem', fontWeight: '600' }}
              >
                Login
              </Button>
            </Box>
          </form>
          <Typography
            sx={{
              margin: '1rem 0',
              fontWeight: '300',
            }}
          >
            Already have an account?{' '}
            <a href="/signup">
              <Typography
                color="primary"
                style={{
                  fontWeight: '700',
                  display: 'inline-block',
                }}
              >
                Signup
              </Typography>
            </a>
          </Typography>
        </Box>
        <Snackbar
          open={snackBools.successOpen}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
        >
          <MuiAlert
            severity="success"
            sx={{ width: '100%' }}
            onClose={handleSuccessClose}
          >
            User successfully logged in!
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={snackBools.errorOpen}
          autoHideDuration={3000}
          onClose={handleErorrClose}
        >
          <MuiAlert
            severity="error"
            sx={{ width: '100%' }}
            onClose={handleErorrClose}
          >
            {error ? error.message : ''}
          </MuiAlert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default LoginScreen;
