import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "../Login";
import { Signup } from "../SignUp";
import { Home } from "../Home";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    "& main": {
      display: "flex",
      flexGrow: "1",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

const App = () => {
  const styles = useStyles();
  return (
    <Router>
      <CssBaseline />
      <div className={styles.app}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export { App };
