import {
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
  Avatar,
  Stack,
} from "@mui/material";

type UserSidebarProps = {
  open: boolean;
  onClose: () => void;
  onViewProfile: () => void;
};

export default function UserSidebar({
  open,
  onClose,
  onViewProfile,
}: UserSidebarProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 3 }} role="presentation">
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar sx={{ width: 56, height: 56 }}>JD</Avatar>
          <Box>
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="body2" color="text.secondary">
              johndoe@example.com
            </Typography>
          </Box>
        </Stack>

        <Divider />

        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 3 }}
          onClick={onViewProfile}
        >
          View Profile
        </Button>
      </Box>
    </Drawer>
  );
}