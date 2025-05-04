import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import { useLocation } from "react-router-dom";
import { JSX } from "react";

// Define a type for the navItems
interface NavItem {
  text: string;
  href: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { text: "Dashboard", href: "/dashboard", icon: <DashboardOutlinedIcon /> },
  { text: "User", href: "/user", icon: <PersonOutlineOutlinedIcon /> },
  { text: "Location", href: "/location", icon: <StoreOutlinedIcon/> }
];

const NavbarItem = ({ href, text, icon, active, sx }: NavItem & { active: boolean; sx?: object }) => (
  <ListItem disablePadding sx={sx}>
    <ListItemButton
      component="a"
      href={href}
      selected={active}
      sx={{
        bgcolor: active ? "primary.main" : "transparent",
        "&:hover": {
          bgcolor: active ? "primary.dark" : "action.hover",
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

// Props definition to accept toggle function
type MainNavbarProps = {
  onDrawerToggle?: () => void;
};

export default function MainNavbar({ onDrawerToggle }: MainNavbarProps) {
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: 'primary.main',
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <ViewSidebarOutlinedIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            H.O.M.E
          </Typography>
        </Toolbar>
      </AppBar>

      <List sx={{ width: "100%" }}>
        {navItems.map((item) => (
          <NavbarItem
            sx={{ mb: theme.spacing(1), borderRadius: 1, mx: 1, width: "auto" }}
            key={item.href}
            {...item}
            active={location.pathname === item.href}
          />
        ))}
      </List>
    </>
  );
}