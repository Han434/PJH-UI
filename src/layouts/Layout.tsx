import {
  Box,
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleTheme } from "../store/Theme/themeSlice";
import MainNavbar from "./MainNavBar";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useLocation, useNavigate } from "react-router-dom";
import UserInfoSidebar from "./UserInfoSideBar";

const drawerWidth = 250;
const appBarHeight = 64;

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userSidebarOpen, setUserSidebarOpen] = useState(false); // <-- ✅ state added
  const location = useLocation();
  const navigate = useNavigate(); // <-- ✅ for redirecting to profile

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: 'background.default', minHeight: '100vh' }}>
      <CssBaseline />
      {location.pathname !== "/" && (
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{
            height: appBarHeight,
            bgcolor: 'primary.main',
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <ViewSidebarOutlinedIcon />
            </IconButton>

            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              H.O.M.E
            </Typography>

            <Box>
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {isDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
              </IconButton>

              <IconButton onClick={() => setUserSidebarOpen(true)}>
                <AccountBoxOutlinedIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ display: "flex", width: "100%", mt: location.pathname !== "/" ? `${appBarHeight}px` : 0 }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              height: `100vh`,
            },
          }}
        >
          <MainNavbar onDrawerToggle={handleDrawerToggle} />
        </Drawer>

        {/* ✅ User Info Sidebar Drawer */}
        <UserInfoSidebar
          open={userSidebarOpen}
          onClose={() => setUserSidebarOpen(false)}
          onViewProfile={() => {
            setUserSidebarOpen(false);
            navigate("/profile");
          }}
        />

        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}