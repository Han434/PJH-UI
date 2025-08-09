// LoginPage.jsx
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    navigate('/modules');
  };

  return (
    <Box display="flex" height="100vh" width="100vw">
      <Box
        sx={{
          width: '60vw',
          backgroundImage: 'url("https://images.unsplash.com/photo-1563253746-350a0a877afa?q=80&w=3164&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          width: '40vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: theme.spacing(4), // 32px horizontal padding
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{ marginBottom: theme.spacing(6) }} // 48px bottom margin
          >
            Log in
          </Typography>

          <Box sx={{ marginBottom: theme.spacing(5) }}> {/* 40px bottom margin */}
            <TextField
              fullWidth
              required
              label="User Name"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              size="medium"
              sx={{ marginBottom: theme.spacing(5) }} // 40px bottom margin between inputs
            />
            <TextField
              fullWidth
              required
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              size="medium"
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="medium"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;