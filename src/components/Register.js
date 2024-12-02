import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase";
import "./Register.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {

    FilledInput,

    TextField,

    Button,

    Typography,

    Box,

} from "@mui/material";

function RegisterForm({ registerFunc, setDialogOpen, dialogOpen }) {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!name || !email || !password || !confirmPassword) {

            setError("모든 필드를 채워주세요.");

            return;

        }

        if (password !== confirmPassword) {

            setError("비밀번호가 일치하지 않습니다.");

            return;

        }

        try {

            const userCredential = await createUserWithEmailAndPassword(

                auth,

                email,

                password

            );

            const user = userCredential.user;

            alert("회원가입 성공!");

            registerFunc(user.email); // Pass email or any user detail to the parent component

            setDialogOpen(false);

            setError("");

        } catch (err) {

            setError("회원가입에 실패했습니다. 다시 시도해주세요.");

        }

    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {

        event.preventDefault();

    };

    return (

        <React.Fragment>

            <Dialog

                fullWidth

                maxWidth={"sm"}

                open={dialogOpen}

                onClose={() => setDialogOpen(false)}

                PaperProps={{

                    sx: {

                        bgcolor: "#092979",

                        color: "#ffffff",

                        borderRadius: 3,

                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",

                        alignItems: "center",

                        height: "80vh",

                    },

                }}

            >

                <DialogTitle>회원가입</DialogTitle>

                <DialogContent

                    sx={{

                        display: "flex",

                        flexDirection: "column",

                        alignItems: "center",

                        marginTop: "40px",

                        ".MuiInputBase-root": { borderRadius: "15px" },

                        "& .MuiInputBase-input": { color: "white" },

                        ".MuiFilledInput-root": { bgcolor: "#3c59a3" },

                        "& .MuiInputLabel-root": { color: "#7792d4" },

                        "& .MuiInputLabel-root.Mui-focused": { color: "#acbeea" },

                        "& .MuiInputLabel-root.Mui-error": { color: "#dc3545" },

                    }}

                >

                    <DialogContentText sx={{ color: "#3c59a3" }}>
                        정보를 입력하여 회원가입을 완료하세요.
                    </DialogContentText>
                    <Box

                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1, width: "250px" }}
                    >

                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="이름"
                            name="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                        />

                        <TextField

                            variant="filled"

                            margin="normal"

                            required

                            fullWidth

                            id="email"

                            label="이메일"

                            name="email"

                            autoComplete="email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                        />

                        <FormControl fullWidth required variant="filled" margin="normal">

                            <InputLabel htmlFor="password">비밀번호</InputLabel>

                            <FilledInput

                                id="password"

                                type={showPassword ? "text" : "password"}

                                value={password}

                                onChange={(e) => setPassword(e.target.value)}

                                endAdornment={

                                    <InputAdornment position="end">

                                        <IconButton

                                            sx={{ color: "#ffffff" }}

                                            onClick={handleClickShowPassword}

                                            onMouseDown={handleMouseDownPassword}

                                            edge="end"

                                        >

                                            {showPassword ? <VisibilityOff /> : <Visibility />}

                                        </IconButton>

                                    </InputAdornment>

                                }

                            />

                        </FormControl>

                        <FormControl fullWidth required variant="filled" margin="normal">

                            <InputLabel htmlFor="confirm-password">비밀번호 확인</InputLabel>

                            <FilledInput

                                id="confirm-password"

                                type={showPassword ? "text" : "password"}

                                value={confirmPassword}

                                onChange={(e) => setConfirmPassword(e.target.value)}

                                endAdornment={

                                    <InputAdornment position="end">

                                        <IconButton

                                            sx={{ color: "#ffffff" }}

                                            onClick={handleClickShowPassword}

                                            onMouseDown={handleMouseDownPassword}

                                            edge="end"

                                        >

                                            {showPassword ? <VisibilityOff /> : <Visibility />}

                                        </IconButton>

                                    </InputAdornment>

                                }

                            />

                        </FormControl>

                        <Button

                            type="submit"

                            fullWidth

                            variant="contained"

                            sx={{

                                mt: 3,

                                mb: 3,

                                bgcolor: "#ffffff",

                                color: "#092979",

                                height: "45px",

                            }}

                        >

                            회원가입

                        </Button>

                        {error && (

                            <Typography color="error" variant="body2" align="center">

                                {error}

                            </Typography>

                        )}

                    </Box>

                </DialogContent>

                <DialogActions>

                    <Button

                        sx={{

                            color: "#acbeea",

                            position: "absolute",

                            bottom: "25px",

                            right: "25px",

                            border: "1px solid black",

                            borderColor: "#acbeea",

                        }}

                        onClick={() => setDialogOpen(false)}

                    >

                        닫기

                    </Button>

                </DialogActions>

            </Dialog>

        </React.Fragment>

    );

}

export default RegisterForm;