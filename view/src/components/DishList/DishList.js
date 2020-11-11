import styles from "./DishList.module.css";

const DishList = () => {
  console.log("render DishList");
  return <div className={styles.dishList}>DishList</div>;
};

export { DishList };
