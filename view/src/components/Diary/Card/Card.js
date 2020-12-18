import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Delete, Add, Clear } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    flexBasis: "16.666%",
  },
  noneCard: {
    display: "none",
  },
  expandedCard: {
    flexBasis: "100%",
  },
});

const DishCard = ({
  card,
  deleteCard,
  deleteFromCard,
  expandCard,
  expanded,
}) => {
  const styles = useStyles();
  const [fullCard, setFullCard] = useState(null);
  let { day, dishes, id, goal } = card;
  let calories = 0;

  return (
    <Card
      elevation={3}
      className={
        expanded
          ? fullCard === card.id
            ? styles.expandedCard
            : styles.noneCard
          : styles.card
      }
    >
      <CardHeader title={day} />
      <CardContent>
        {dishes.map((dish, i) => {
          calories += dish.calories;
          if (calories >= goal) {
            alert("You rich your goal for today.");
          }

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
      <CardActions>
        <IconButton
          aria-label="add to card"
          onClick={() => {
            expandCard(id);
            if (!expanded) {
              setFullCard(id);
            } else {
              setFullCard("");
            }
          }}
        >
          <Add />
        </IconButton>
        <IconButton aria-label="delete card" onClick={() => deleteCard(id)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export { DishCard };
