import React from "react";
import { useDispatch } from "react-redux";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, useTheme } from "@mui/material";

import { updateLocation } from "../../store/Location/locationSlice";
import { AppDispatch } from "../../store";
import FormDialog from "../../components/FormDialog";
import { Location } from "../../types";

interface EditLocationDialogProps {
  open: boolean;
  onClose: () => void;
  location: Location;
}

const EditLocationDialog: React.FC<EditLocationDialogProps> = ({ open, onClose, location }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const defaultValues = {
    locationName: location?.locationName || "",
  };

  const handleSubmit = async (data: any) => {
    const updatedLocation = await dispatch(
      updateLocation({ id: location._id, updatedData: data })
    ).unwrap();
    return { _id: updatedLocation._id };
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="Edit Location"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      <LocationFormFields theme={theme} />
    </FormDialog>
  );
};

interface LocationFormFieldsProps {
  theme: any;
}

const LocationFormFields: React.FC<LocationFormFieldsProps> = ({ theme }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="locationName"
      control={control}
      rules={{ required: "Location name is required" }}
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
  );
};

export default EditLocationDialog;