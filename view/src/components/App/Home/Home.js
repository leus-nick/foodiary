import { useState, useEffect } from "react";
import { Header } from "../Header";
import { Diary } from "../Diary";
// import { DishList } from "../DishList";
import { Goal } from "../Goal";
import { authMiddleWare } from "../../../util/auth";
import axios from "axios";

const Home = (props) => {
  const [user, setUser] = useState({});
  authMiddleWare(props.history);
  const authToken = localStorage.getItem("AuthToken");

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/user")
      .then((response) => {
        console.log(response.data);
        setUser({
          username: response.data.userCredentials.username,
          goal: response.data.userCredentials.goal,
          uiLoading: false,
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          props.history.push("/login");
        }
        console.log(error);
      });
  }, []);

  const logoutHandler = (event) => {
    localStorage.removeItem("AuthToken");
    props.history.push("/login");
  };

  return (
    <>
      <Header logout={logoutHandler} />
      <Goal goal={user.goal} text={user.username} />
      <main>
        <Diary />
        {/* <DishList /> */}
      </main>
    </>
  );
};

export { Home };
