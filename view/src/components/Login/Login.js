import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import axios from "axios";
import styles from "./Login.module.css";

const Login = (props) => {
  console.log("render Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      email: email,
      password: password,
    };

    axios
      .post("/login", userData)
      .then((response) => {
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        localStorage.setItem("AuthTokenTime", new Date().getTime());
        setLoading(false);
        props.history.push("/");
      })
      .catch((error) => {
        setError(error.response.data.general);
        setLoading(false);
      });
  };

  return (
    <Paper className={styles.login}>
      <CssBaseline />
      <Container component="div" maxWidth="xs" className={styles.loginInner}>
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading || !email || !password}
          >
            Sign In
            {loading && <CircularProgress size={30} />}
          </Button>
          <Link href="signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
          {error && <Typography variant="body2">{error}</Typography>}
        </form>
      </Container>
    </Paper>
  );
};

export { Login };
