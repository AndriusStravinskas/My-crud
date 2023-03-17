import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, TextField } from '@mui/material';
import RegisterValidationSchema from '../validate-schema/register-validate-Schema';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const nav = useNavigate()

  const [getError, setError] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('register-email');
    const password = data.get('register-password');
    const confirmPassword = data.get('confirm-password');

    const value = { email, password, confirmPassword }
    let res;
    try {
      const validateData = RegisterValidationSchema.validateSync(value)
      const { email, password } = validateData
      setError('')

      res = await axios.post('http://localhost:3600/register', { email, password })

      if (res.data.error) {
        setError(res.data.message)
      } else {
        nav('/')
        console.log('Registration successfully');
        console.log(res.data);
      }
    } catch (error) {
      setError(error.message)
    }



  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      {getError !== '' && <Alert severity="error">{getError}</Alert>}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="register-email"
              label="Email Address"
              name="register-email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="register-password"
              label="Password"
              type="password"
              id="register-password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirm-password"
              label="Confirm password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Link to="/" variant="body2">Already have an account? Sign in</Link>
      </Box>
    </Box>
  );

}

export default Register
