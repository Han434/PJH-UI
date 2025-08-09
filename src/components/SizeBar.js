import {
  Box,
  Stack,
  Divider,
  useTheme,
  Button,
  Typography
} from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps';
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "User", to: "/users" },
  { label: "Location", to: "/locations" },
];

export default function SizeBar() {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'primary.contrastText',
        height: '100%',
        boxSizing: 'border-box',
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={1} alignItems="center" p={2}>
        <Link 
          to="/modules" 
          aria-label="Go to Modules" 
          style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}
        >
          <AppsIcon />
        </Link>
        <Typography variant="h6" component="h6">
          Setting
        </Typography>
      </Stack>

      <Divider />

      {/* Navigation Links */}
      <Stack spacing={0.5} sx={{ p: 1 }}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              fullWidth
              size="large"
              sx={{
                justifyContent: 'flex-start',
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
                backgroundColor: isActive
                  ? theme.palette.background.jelly
                  : 'transparent',
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              {link.label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}