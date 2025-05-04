import React from "react";
import { useDispatch } from "react-redux";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, useTheme } from "@mui/material";

import { updateUser } from "../../store/User/userSlice";
import { AppDispatch } from "../../store";
import FormDialog from "../../components/FormDialog";
import { User } from "../../types";

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, onClose, user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const defaultValues = {
    name: user?.name || "",
    userName: user?.userName || "",
    password: "", // do not prefill password
    status: user?.status || "active",
  };

  const handleSubmit = async (data: any) => {
    const updatedUser = await dispatch(updateUser({ id: user._id, updatedData: data })).unwrap();
    return { _id: updatedUser._id };
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="Edit User"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      <FormFields theme={theme} />
    </FormDialog>
  );
};

interface FormFieldsProps {
  theme: any;
}

const FormFields: React.FC<FormFieldsProps> = ({ theme }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="dense"
            size="small"
            variant="outlined"
            error={!!errors.name}
            helperText={typeof errors.name?.message === "string" ? errors.name.message : ""}
            sx={{ marginBottom: theme.spacing(2) }} // Added spacing using theme
          />
        )}
      />

      <Controller
        name="userName"
        control={control}
        rules={{ required: "Username is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Username"
            fullWidth
            margin="dense"
            size="small"
            variant="outlined"
            error={!!errors.userName}
            helperText={typeof errors.userName?.message === "string" ? errors.userName.message : ""}
            sx={{ marginBottom: theme.spacing(2) }} // Added spacing using theme
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          minLength: {
            value: 8,
            message: "Min length is 8",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            size="small"
            variant="outlined"
            error={!!errors.password}
            helperText={typeof errors.password?.message === "string" ? errors.password.message : ""}
            sx={{ marginBottom: theme.spacing(2) }} // Added spacing using theme
          />
        )}
      />
    </>
  );
};

export default EditUserDialog;

function onSave() {
  throw new Error("Function not implemented.");
}