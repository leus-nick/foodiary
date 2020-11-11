import { Delete } from "@material-ui/icons";
import styles from "./Card.module.css";

const Card = ({ card, goal, deleteCard }) => {
  console.log("render card");
  let { day, dishes, id } = card;
  let calories = 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <h2>{day}</h2>
        {dishes.map((dish, i) => {
          calories += dish.calories;
          return <h3 key={i}>{dish.title}</h3>;
        })}
        <h2>Total calories: {`${calories} / ${goal}`}</h2>
        <Delete onClick={() => deleteCard(id)} />
      </div>
    </div>
  );
};

export { Card };
