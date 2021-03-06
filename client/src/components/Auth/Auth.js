import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockIcon from "@mui/icons-material/Lock";

import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";
import GoogleIcon from "@mui/icons-material/Google";

const googleAuthId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword && isSignup) {
      alert("Passwords and Confirmed Passwords don't match");
      return;
    }
    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, payload: { result, token } });
      navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");

  return (
    <Paper elevation={3} className={classes.authContainer}>
      <Avatar sx={{ margin: "auto" }}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ paddingTop: 1 }}>
        {isSignup ? "Sign up" : "Sign in"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {isSignup && (
          <>
            <Input
              name="firstName"
              label="First Name"
              handleChange={handleChange}
              autoFocus
            />
            <Input
              name="lastName"
              label="Last Name"
              handleChange={handleChange}
            />
          </>
        )}
        <Input
          name="email"
          label="Email Address"
          handleChange={handleChange}
          type="email"
        />
        <Input
          name="password"
          label="Password"
          handleChange={handleChange}
          type={showPassword ? "text" : "password"}
          handleShowPassword={handleShowPassword}
        />
        {isSignup && (
          <Input
            name="confirmPassword"
            label="Repeat Password"
            handleChange={handleChange}
            type="password"
          />
        )}

        <Button
          sx={{ mt: 2 }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
        <GoogleLogin
          clientId={googleAuthId}
          render={(renderProps) => (
            <Button
              sx={{ mt: 3 }}
              color="primary"
              fullWidth
              onClick={renderProps.onClick}
              variant="contained"
              startIcon={<GoogleIcon />}
            >
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />

        <Button fullWidth onClick={switchMode} sx={{ mt: 1 }} color="secondary">
          {isSignup
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </Paper>
  );
};

export default SignUp;
