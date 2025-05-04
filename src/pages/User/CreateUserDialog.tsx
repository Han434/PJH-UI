import React from "react";
import { useDispatch } from "react-redux";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, useTheme } from "@mui/material";

import { createUser } from "../../store/User/userSlice";
import { AppDispatch } from "../../store";
import FormDialog from "../../components/FormDialog";

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const defaultValues = {
    name: "",
    userName: "",
    password: "",
    status: "active",
    businessID: "67e7451c61a6205c8a66b0b6",
  };

  const handleSubmit = async (data: any) => {
    try {
      const newUser = await dispatch(createUser(data)).unwrap();
      console.log("User created successfully:", newUser);
      return { _id: newUser._id };
    } catch (err) {
      return Promise.reject(new Error("Failed to create user"));
    }
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="Create User"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      navigateTo={(id: string) => `/user/${id}`}
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
            sx={{ marginBottom: theme.spacing(2) }}
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
            sx={{ marginBottom: theme.spacing(2) }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: { value: 8, message: "Min length is 8" },
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
            sx={{ marginBottom: theme.spacing(2) }}
          />
        )}
      />
    </>
  );
};

export default CreateUserDialog;