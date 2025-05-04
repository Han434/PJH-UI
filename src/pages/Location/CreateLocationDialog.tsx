import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  useTheme,
  MenuItem,
} from "@mui/material";

import { createLocation } from "../../store/Location/locationSlice";
import { createUser, fetchUsers } from "../../store/User/userSlice";
import { AppDispatch, RootState } from "../../store";
import FormDialog from "../../components/FormDialog";
import User from "../../types/paths/User";

interface CreateLocationDialogProps {
  open: boolean;
  onClose: () => void;
  location?: {
    _id: string;
    locationName?: string;
    businessId?: string;
    assignedUserId?: string;
  };
}

interface FormFieldsProps {
  theme: any;
  userOptions: { label: string; value: string }[];
}

const FormFields: React.FC<FormFieldsProps> = ({
  theme,
  userOptions,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name="locationName"
        control={control}
        rules={{ required: "Location Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Location Name"
            fullWidth
            margin="dense"
            size="small"
            variant="outlined"
            error={!!errors.locationName}
            helperText={typeof errors.locationName?.message === "string" ? errors.locationName.message : ""}
            sx={{ marginBottom: theme.spacing(2) }}
          />
        )}
      />

      <Controller
        name="user"
        control={control}
        rules={{ required: "Manager is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Manager"
            fullWidth
            margin="dense"
            size="small"
            variant="outlined"
            error={!!errors.assignedUserId}
            helperText={typeof errors.assignedUserId?.message === "string" ? errors.assignedUserId.message : ""}
            sx={{ marginBottom: theme.spacing(2) }}
          >
            {userOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Hidden businessId field */}
      <Controller
        name="business"
        control={control}
        defaultValue="67e7451c61a6205c8a66b0b6"
        render={({ field }) => (
          <input type="hidden" {...field} value="67e7451c61a6205c8a66b0b6" />
        )}
      />
    </>
  );
};

const CreateLocationDialog: React.FC<CreateLocationDialogProps> = ({
  open,
  onClose,
  location,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { users } = useSelector((state: RootState) => state.user);

  const isEditMode = Boolean(location);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const defaultValues = {
    locationName: location?.locationName || "",
    business: location?.businessId || "67e7451c61a6205c8a66b0b6",
    user: location?.assignedUserId || "",
  };

  const handleSubmit = async (data: any) => {
    try {
      const newLocation = await dispatch(createLocation(data)).unwrap();
      return { _id: newLocation._id };
    } catch (err) {
      console.error("Error creating location:", err);
      return Promise.reject(new Error("Failed to create location"));
    }
  };

  const userOptions = users.map((user: User) => ({
    label: user.name,
    value: user._id,
  }));

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title={isEditMode ? "Edit Location" : "Create Location"}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      navigateTo={(id: string) => `/location/${id}`}
    >
      <FormFields theme={theme} userOptions={userOptions} />
    </FormDialog>
  );
};

export default CreateLocationDialog;