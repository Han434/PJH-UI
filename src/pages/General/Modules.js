// Modules.jsx
import React from 'react';
import MainAppBar from "../../components/MainAppBar.js";
import {
  SpaceDashboardOutlined as DashboardIcon,
  BarChartOutlined as FinanceIcon,
  Inventory2Outlined as InventoryIcon,
  HandshakeOutlined as PurchaseIcon,
  SellOutlined as SaleIcon,
  SettingsOutlined as SettingsIcon,
} from '@mui/icons-material';
import { Stack, Grid, Box, ButtonBase, useTheme, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModuleCard from "../../components/ModuleCard.js"; // Adjust path as needed

export default function Modules() {
  const navigate = useNavigate();
  const theme = useTheme();

  const modules = [
    { icon: <DashboardIcon fontSize="large" />, label: "Dashboard", path: "/modules" },
    { icon: <FinanceIcon fontSize="large" />, label: "Finance", path: "/modules" },
    { icon: <InventoryIcon fontSize="large" />, label: "Inventory", path: "/modules" },
    { icon: <PurchaseIcon fontSize="large" />, label: "Purchase", path: "/modules" },
    { icon: <SaleIcon fontSize="large" />, label: "Sale", path: "/modules" },
    { icon: <SettingsIcon fontSize="large" />, label: "Settings", path: "/users" },
  ];

  return (
    <Box>
      <MainAppBar />
      <Stack
        sx={{ padding: theme.spacing(2) }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={4} justifyContent="center">
          {modules.map(({ icon, label, path }) => (
            <Grid item xs={6} sm={4} md={2} key={label}>
              <ButtonBase
                onClick={() => navigate(path)}
                aria-label={label}
                sx={{
                  width: 150,
                  height: 150,
                  display: 'block',
                }}
              >
                <ModuleCard icon={icon} label={label} />
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}