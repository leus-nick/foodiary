import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import styles from "./App.module.css";

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Home />
      </div>
    </Router>
  );
};

export { App };
