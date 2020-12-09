import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Delete, Add, Clear } from "@material-ui/icons";
import styles from "./Card.module.css";

const DishCard = ({ card, goal, deleteCard, expandMenu, deleteFromCard }) => {
  console.log("render card");
  let { day, dishes, id } = card;
  let calories = 0;

  return (
    <div className={styles.card}>
      <Card className={styles.cardInner} elevation={3}>
        <CardHeader title={day} />
        <CardContent>
          {dishes.map((dish, i) => {
            calories += dish.calories;
            return (
              <div key={i}>
                <Typography variant="h6" color="textSecondary" component="p">
                  {dish.title}
                </Typography>
                <IconButton
                  onClick={() => deleteFromCard(dish.id, id)}
                  aria-label="delete dish"
                >
                  <Clear />
                </IconButton>
              </div>
            );
          })}
          <Typography variant="h6" color="textSecondary" component="p">
            Total calories: {`${calories} / ${goal}`}
          </Typography>
        </CardContent>
        <CardActions className="actions">
          <IconButton
            aria-label="add new dish to card"
            onClick={() => {
              expandMenu(id);
            }}
          >
            <Add />
          </IconButton>
          <IconButton aria-label="delete card" onClick={() => deleteCard(id)}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export { DishCard };
