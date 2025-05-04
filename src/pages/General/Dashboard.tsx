import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { fetchBusinessById } from "../../store/Business/businessSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedBusiness, loading, error } = useSelector(
    (state: any) => state.business
  );

  useEffect(() => {
    dispatch(fetchBusinessById("67e7451c61a6205c8a66b0b6"));
  }, [dispatch]);

  return (
    <Box component="main">
      <Typography variant="h5" sx={{ color: theme.palette.text.primary, py: theme.spacing(2), px: theme.spacing(3) }}>
        Dashboard
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : selectedBusiness ? (
        < Box sx={{ px: theme.spacing(3)}}>
          <Box mb={2}>
            <Typography variant="body2">Business Name</Typography>
            <Typography variant="body1">{selectedBusiness.name}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body2">Business Type</Typography>
            <Typography variant="body1">{selectedBusiness.businessType}</Typography>
          </Box>
        </Box>
      ) : (
        <Typography>No business data found.</Typography>
      )}
    </Box>
  );
}

export default Dashboard;