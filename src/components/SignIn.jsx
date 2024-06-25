import { useState, useEffect, useReducer, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AuthContext from "../context/auth";

import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import Home from "./Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// const defaultTheme = createTheme();

function EmailVaild(state, action) {
  switch (action.type) {
    case "EMAIL_VALIDATION": {
      return {
        value: action.value,
        Valid: action.check,
      };
    }

    default:
      return {
        value: "",
        Valid: false,
      };
  }
}

function PasswordVaild(state, action) {
  switch (action.type) {
    case "PASSWORD_VALIDATION": {
      return {
        value: action.value,
        Valid: action.check,
      };
    }

    default:
      return {
        value: "",
        Valid: false,
      };
  }
}

export default function SignIn() {
  const { isLoggedIn, onLogin } = useContext(AuthContext);
  const [EmailState, dispatchEmail] = useReducer(EmailVaild, {
    value: "",
    Valid: false,
  });
  const [PasswordState, dispatchPassword] = useReducer(PasswordVaild, {
    value: "",
    Valid: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    if (showPassword) {
      document.getElementById("password").type = "text";
    } else {
      document.getElementById("password").type = "password";
    }
  }, [showPassword]);

  const { Valid: EmailValid } = EmailState;
  const { Valid: PasswordValid } = PasswordState;

  useEffect(() => {
    const time = setTimeout(() => {
      if (EmailValid && PasswordValid) {
        setError(false);
      } else {
        setError(true);
      }
      console.log("checking validity");
    }, 700);
    return () => {
      clearTimeout(time);
      console.log("clearing timeout");
    };
  }, [EmailValid, PasswordValid]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    onLogin(data.get("email"), data.get("password"));
  };

  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleClickHidePassword = () => {
    setShowPassword(false);
  };

  const handleValidationEmail = (e) => {
    // dispatchEmail({type:"VALID_EMAIL"})
    dispatchEmail({
      type: "EMAIL_VALIDATION",
      value: e.target.value,
      check: e.target.value.includes("@") && e.target.value.includes("."),
    });
  };

  const handleValidationPassword = (e) => {
    // dispatchPassword({type:"VALID_PASSWORD"})
    dispatchPassword({
      type: "PASSWORD_VALIDATION",
      value: e.target.value,
      check: e.target.value.trim().length >= 8,
    });
  };

  return isLoggedIn ? (
    <Home />
  ) : (
    <ThemeProvider theme={darkTheme}>
      <Container
        className="pb-20 border-2 h-fit bg-[#e9e9e923] rounded-2xl border-slate-500 hover:border-white"
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              //   style={{ borderColor: valid ? "green" : "red" }}
              //   className={valid ? "valid" : "notValid"}
              margin="normal"
              required
              fullWidth
              value={EmailState.value}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              autoSave="false"
              onChange={handleValidationEmail}
            />
            <TextField
              //   style={{ borderColor: valid ? "green" : "red" }}
              margin="normal"
              required
              fullWidth
              value={PasswordState.value}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleValidationPassword}
            />
            {showPassword ? (
              <BiShow
                className="z-9 text-2xl relative left-[85%] top-[-45px] :hover:cursor-pointer :hover:text-white"
                onClick={handleClickHidePassword}
              />
            ) : (
              <BiHide
                className="z-9 text-2xl relative left-[85%] top-[-45px] :hover:cursor-pointer :hover:text-white"
                onClick={handleClickShowPassword}
              />
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={error}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
