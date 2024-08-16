"use client";
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { setCookie } from "cookies-next";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false); 

  const handleLogin = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token, refresh_token } = data;
        
        setCookie("access_token", access_token)
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        
        router.refresh();
      } else {
        console.error('Login failed');
        setShowAlert(true); 
        setTimeout(() => {
            setShowAlert(false); 
        }, 3000);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setShowAlert(true); 
      setTimeout(() => {
        setShowAlert(false); 
    }, 3000);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        position: 'relative', 
      }}
    >
      {showAlert && (
        <Alert
          variant="filled"
          severity="error"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 100, 
          }}
        >
          Login failed. Please check your credentials.
        </Alert>
      )}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 420,
          padding: 3,
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          sx={{ mb: 2 }}
          variant="outlined"
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ mb: 2 }}
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ mt: 3 }}
          type="button" 
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
