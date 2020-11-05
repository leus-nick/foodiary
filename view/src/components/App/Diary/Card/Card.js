import styles from "./Card.module.css";
import { useState } from "react";

const Card = () => {
  const [calories, setCalories] = useState(0);
  let goal = 2500;

  const formatDay = (date) => {
    let day = date.getDay();
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "New day";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <h2>{formatDay(new Date())}</h2>
        <h2>Total calories: {`${calories} / ${goal}`}</h2>
        <h3 onClick={() => setCalories(calories + 100)}>dish name</h3>
        <h3 onClick={() => setCalories(calories + 100)}>dish name</h3>
        <h3 onClick={() => setCalories(calories + 100)}>dish name</h3>
        <h3 onClick={() => setCalories(calories + 100)}>dish name</h3>
      </div>
    </div>
  );
};

export { Card };
