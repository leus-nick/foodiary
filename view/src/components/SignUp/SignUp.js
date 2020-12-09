import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";

const Signup = (props) => {
  console.log("render SignUp");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const newUserData = {
      username: username,
      email: email,
      goal: goal,
      password: password,
      confirmPassword: confirmPassword,
    };

    axios
      .post("/signup", newUserData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("AuthToken", `${response.data.token}`);
        setLoading(false);
        props.history.push("/");
      })
      .catch((error) => {
        setError(error.response.data.general);
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                onChange={(event) => setUserName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="goal"
                label="Goal"
                name="goal"
                autoComplete="goal"
                onChange={(event) => setGoal(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading || !email || !password || !username || !goal}
          >
            Sign Up
            {loading && <CircularProgress size={30} />}
          </Button>
          <Link href="login" variant="body2">
            Already have an account? Sign in
          </Link>
          {error && <Typography variant="body2">{error}</Typography>}
        </form>
      </div>
    </Container>
  );
};

export { Signup };
