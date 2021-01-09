import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Button,
  Grid,
  TextField,
  Link,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  paper: {
    margin: "50px auto",
    minHeight: "calc(100vh - 100px)",
    width: "100%",
    maxWidth: "1800px",
    display: "flex",
    justifyContent: "flex-end",
    backgroundImage:
      "url(https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/12/orange-chicken-recipe.jpg?fit=1200%2C879&ssl=1)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "@media (max-width:1450px)": {
      margin: "0px auto",
      minHeight: "100vh",
    },
  },
  inner: {
    marginRight: "0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "35%",
    "@media (max-width:1280px)": {
      width: "45%",
    },
    "@media (max-width:960px)": {
      width: "100%",
    },
  },
  avatar: {
    backgroundColor: "#58d68d",
  },
  loginTitle: {
    fontSize: "4.5rem",
    "@media (max-width:960px)": {
      fontSize: "2rem",
      marginTop: "8px",
    },
  },
  form: {
    marginTop: "20px",
    width: "100%",
  },
  input: {
    "& label.Mui-focused": {
      color: "#58d68d",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#58d68d",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#58d68d",
      },
    },
  },
  button: {
    fontSize: "1rem",
    backgroundColor: "#58d68d",
    padding: "10px 0px",
    "&:hover": {
      backgroundColor: "#58d68d",
    },
  },
  progress: {
    color: "#58d68d",
  },
  error: {
    fontSize: "0.8rem",
    color: "red",
  },
  link: {
    fontSize: "0.8rem",
    color: "black",
    "&:hover": {
      color: "#85929e",
    },
  },
});

const Login = (props) => {
  const styles = useStyles();
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
    <Paper className={styles.paper}>
      <Container component="div" maxWidth="md" className={styles.inner}>
        <Avatar className={styles.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h1" className={styles.loginTitle}>
          Login
        </Typography>
        <form noValidate className={styles.form}>
          <Grid container spacing={2} direction="column" justify="center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                className={styles.input}
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
                className={styles.input}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={styles.button}
                disabled={loading || !email || !password}
              >
                Sign In
                {loading && (
                  <CircularProgress
                    size={20}
                    thickness={6}
                    className={styles.progress}
                  />
                )}
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" className={styles.error}>
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Link href="signup" variant="body2" className={styles.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};

export { Login };
