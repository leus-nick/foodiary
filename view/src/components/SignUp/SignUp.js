import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
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
  signTitle: {
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
  link: {
    fontSize: "0.8rem",
    color: "black",
    "&:hover": {
      color: "#85929e",
    },
  },
});

const Signup = (props) => {
  const styles = useStyles();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [errors, setError] = useState({});
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
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <Paper className={styles.paper}>
      <Container component="div" maxWidth="md" className={styles.inner}>
        <Avatar className={styles.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h1" className={styles.signTitle}>
          Sign up
        </Typography>
        <form noValidate className={styles.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                helperText={errors.username}
                error={errors.username ? true : false}
                className={styles.input}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                type="number"
                fullWidth
                id="goal"
                label="Goal"
                name="goal"
                helperText={errors.goal}
                error={errors.goal ? true : false}
                className={styles.input}
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
                helperText={errors.email}
                error={errors.email ? true : false}
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
                helperText={errors.password}
                error={errors.password ? true : false}
                className={styles.input}
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
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                className={styles.input}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
                disabled={
                  loading ||
                  !email ||
                  !confirmPassword ||
                  !password ||
                  !username ||
                  !goal
                }
              >
                Sign Up
                {loading && (
                  <CircularProgress size={20} className={styles.progress} />
                )}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link href="login" variant="body2" className={styles.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};

export { Signup };
