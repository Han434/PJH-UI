import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    useTheme,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/Auth/authSlice";
import { AppDispatch } from "../../store";

type FormData = {
    userName: string;
    password: string;
};

function LogInForm() {
    const dispatch: AppDispatch = useDispatch();
    const theme = useTheme();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = useCallback(
        () => setShowPassword((prev) => !prev),
        []
    );

    const onSubmit = async (data: FormData) => {
        const resultAction = dispatch(login(data));
        if (await resultAction) {
            navigate("/dashboard");
        }
    };

    return (
        <Box display="flex" height="100vh">
            <Box
                flex={1.5}
                sx={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1563253746-350a0a877afa?q=80&w=3164&auto=format&fit=crop")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Box
                flex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ px: { xs: 3, sm: 6 } }}
            >
                <Stack
                    width="100%"
                    maxWidth={600}
                    spacing={theme.spacing(4)}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                    >
                        Log in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: theme.spacing(3),
                            mt: theme.spacing(3),
                        }}
                    >
                        <TextField
                            label="User Name"
                            fullWidth
                            variant="outlined"
                            size="small"
                            error={!!errors.userName}
                            helperText={errors.userName?.message || ""}
                            {...register("userName", {
                                required: "Username is required",
                            })}
                        />

                        <TextField
                            label="Password"
                            fullWidth
                            variant="outlined"
                            size="small"
                            type={showPassword ? "text" : "password"}
                            error={!!errors.password}
                            helperText={errors.password?.message || ""}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleTogglePassword}
                                            edge="end"
                                            aria-label="toggle password visibility"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{
                                py: theme.spacing(1.2),
                                textTransform: "none",
                            }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export default LogInForm;