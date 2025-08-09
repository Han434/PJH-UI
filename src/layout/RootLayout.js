import SizeBar from '../components/SizeBar';
import { Outlet } from 'react-router-dom';
import { Stack, Box } from '@mui/material';

export default function RootLayout() {
  return (
    <Stack direction="row" sx={{ height: '100vh' }}>
      <Box sx={{ width: '20vw', height: '100%' }}>
        <SizeBar />
      </Box>
      <Box sx={{ width: '80vw', height: '100%', overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Stack>
  );
}
