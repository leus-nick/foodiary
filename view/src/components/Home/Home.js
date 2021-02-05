import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import { Diary } from "../Diary";
import { authMiddleWare } from "../../util/auth";
import axios from "axios";

const dishContext = React.createContext(null);

const Home = (props) => {
  const [dishItems, setDishItems] = useState([]);
  authMiddleWare(props.history);
  const authToken = localStorage.getItem("AuthToken");
  axios.defaults.headers.common = { Authorization: `${authToken}` };

  useEffect(() => {
    let dishes = JSON.parse(localStorage.getItem("DishMenuItems"));
    dishes ? setDishItems(dishes) : fetchDishMenuItems();
  }, []);

  const fetchDishMenuItems = () => {
    axios
      .get(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=70bf437e2d094f64bac4878ca64e33fc&number=50&instructionsRequired=true&addRecipeNutrition=true&diet=Whole30&sort=random&type=main course,side dish,breakfast,soup,dessert"
      )
      .then((response) => {
        localStorage.setItem(
          "DishMenuItems",
          JSON.stringify(response.data.results)
        );
        setDishItems(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutHandler = () => {
    localStorage.removeItem("AuthToken");
    props.history.push("/login");
  };

  return (
    <>
      <dishContext.Provider value={dishItems}>
        <Header logout={logoutHandler} />
        <Diary />
      </dishContext.Provider>
    </>
  );
};

export { Home, dishContext };
