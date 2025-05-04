import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Container,
  Box,
  Button,
  Typography,
  IconButton,
  Slide,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Slide transition
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  defaultValues: Record<string, any>;
  onSubmit: (data: any) => Promise<{ _id: string }>;
  navigateTo?: (id: string) => string;
  children: React.ReactNode;
  mode?: "create" | "edit"; // optional, for button label
}

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  title,
  defaultValues,
  onSubmit,
  navigateTo,
  children,
  mode,
}) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;
  const theme = useTheme();
  const navigate = useNavigate();

  // Reset form when dialog opens or defaultValues change (e.g., edit mode)
  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const handleFormSubmit = async (data: any) => {
    console.log("Form data:", data);
    try {
      const result = await onSubmit(data);
      onClose();

      if (navigateTo) {
        console.log("Navigating to:", result);
        const redirectUrl = navigateTo(result._id);
        navigate(redirectUrl);
      }
    } catch (err) {
      console.error("Form submission failed:", err);
    }
  };

  const isEditMode = mode === "edit" || defaultValues?._id;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullScreen
      sx={{
        "& .MuiDialog-paper": {
          height: "100vh",
          mt: "50px",
          borderRadius: theme.shape.borderRadius,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: theme.spacing(2),
        }}
      >
        <Container
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(2),
          }}
        >
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: theme.spacing(3),
                }}
              >
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
                <Typography variant="h5">{title}</Typography>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    height: 36,
                    fontSize: theme.typography.body2.fontSize,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
              {children}
            </Box>
          </FormProvider>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;