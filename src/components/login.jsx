import { Alert, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginValidationSchema from '../validate-schema/login-validate-Schema';

const Login = ({setLoginUser}) => {
  const nav = useNavigate();
  const [getError, setError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const dataValue = { email, password };

    try {
      const validateData = loginValidationSchema.validateSync(dataValue);

      const res = await axios.post('http://localhost:3600/login', validateData)

      if (res.data.error) {
        setError(res.data.message)
      } else {
        console.log(res.data.message)
        setError('')
        localStorage.setItem('userSecret', res.data.secret)
        setLoginUser(res.data.loginUserEmail)
        nav('/userPost')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Box sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >

      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Sign in
      </Typography>
      {getError !== '' && <Alert severity="error">{getError}</Alert>}
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
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Link to='/register' variant="body2">Don't have an account? Sign Up</Link>
      </Box>
    </Box>
  )
}

export default Login