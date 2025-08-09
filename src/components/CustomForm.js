import React, { useState, useEffect } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Slide,
  Box,
  TextField,
  Stack,
  Container,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const CustomForm = ({
  open,
  handleClose,
  mode = 'create',
  title = 'Create Record',
  initialData = {},
  fields = [],
  onSubmitAction,
  onSuccess
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (open) {
      setFormValues(initialData || {});
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(onSubmitAction(formValues));
      const payload = resultAction.payload;

      if (onSuccess && payload) {
        onSuccess(payload);
      }

      handleClose();
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen
      sx={{
        "& .MuiDialog-paper": {
          height: "100vh",
          mt: "50px",
          borderRadius: theme.shape.borderRadius,
        },
      }}
    >
      <Container>
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1, textAlign: 'center' }} variant="h6">
            {title}
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleSubmit}
          >
            {mode === 'edit' ? 'Save Changes' : 'Save'}
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ overflowY: 'auto', p: 3 }}>
        <Stack spacing={2}>
          {fields.map(({ name, label, type = 'text', required = false }) => (
            <TextField
              key={name}
              name={name}
              label={label}
              type={type}
              size="small"
              value={formValues[name] ?? ''}
              onChange={handleChange}
              required={required}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      </Container>
    </Dialog>
  );
};

export default CustomForm;