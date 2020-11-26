import { useContext } from "react";
import { dishContext } from "../Home";
import { DishListItem } from "../DishListItem";
import styles from "./DishList.module.css";

const DishList = ({ addToCard }) => {
  console.log("render DishList");
  const dishItems = useContext(dishContext);
  return (
    <div className={styles.dishList}>
      {dishItems.map((item) => {
        return <DishListItem addToCard={addToCard} dish={item} key={item.id} />;
      })}
    </div>
  );
};

export { DishList };
