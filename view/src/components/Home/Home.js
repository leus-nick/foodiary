import { Header } from "../Header";
import { Diary } from "../Diary";
import { Goal } from "../Goal";
import { authMiddleWare } from "../../util/auth";
import styles from "./Home.module.css";

const Home = (props) => {
  console.log(`render Home`);
  authMiddleWare(props.history);

  const logoutHandler = () => {
    localStorage.removeItem("AuthToken");
    props.history.push("/login");
  };

  return (
    <>
      <Header logout={logoutHandler} />
      <Goal />
      <main className={styles.main}>
        <Diary />
      </main>
    </>
  );
};

export { Home };
