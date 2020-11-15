import { useContext } from "react";
import { dishContext } from "../Home";
import styles from "./DishList.module.css";

const DishList = () => {
  console.log("render DishList");
  const dishItems = useContext(dishContext);

  return (
    <div className={styles.dishList}>
      {dishItems.map((item) => {
        return <p key={item.id}>{item.title}</p>;
      })}
    </div>
  );
};

export { DishList };
