import { useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    flexBasis: "20%",
    padding: "7px",
    minHeight: "100%",
    "@media (max-width:1450px)": {
      flexBasis: "33.333%",
    },
    "@media (max-width:960px)": {
      flexBasis: "50%",
    },
    "@media (max-width:650px)": {
      flexBasis: "100%",
    },
  },
  noneContainer: {
    display: "none",
  },
  expandedContainer: {
    flexBasis: "100%",
    minHeight: "100%",
  },
  card: {
    paddingBottom: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "100%",
    background: "linear-gradient(0deg, #8ae2af 0%, rgba(255,255,255,1) 35%)",
  },
  expandedCard: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    padding: "14px",
  },
  cardImage: {
    height: "350px",
    width: "100%",
    maskImage: "linear-gradient(180deg, black 50%, transparent 100%)",
  },
  cardImageHolder: {
    height: "350px",
    width: "100%",
  },
  cardTitle: {
    textAlign: "center",
    padding: "30px 5px",
  },
  cardContent: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: "0px",
    alignItems: "center",
  },
  cardItem: {
    display: "flex",
    alignItems: "center",
  },
  itemImage: {
    width: "100px",
    height: "100px",
  },
  cardFunc: {
    display: "flex",
    flexDirection: "column",
    justifySelf: "flex-end",
  },
  cardCalories: {
    padding: "10px 0px",
    // color: "white",
  },
  cardButton: {
    fontFamily: ["Alegreya Sans", "serif"].join(","),
    fontSize: "1rem",
    width: "100px",
    padding: "5px 20px",
    transition: "all .5s ease-in-out",
    // color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: "#58d68d",
      borderRadius: "0px",
    },
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

  const formatCardTitle = (dishes) => {
    if (dishes.length > 2) {
      return `"${dishes[0].title}" and ${
        dishes.length - 1
      } more dishes in your menu`;
    } else if (dishes.length === 2) {
      return `${dishes[0].title} and 1 more dish in your menu`;
    } else if (dishes.length === 1) {
      return `${dishes[0].title} in your menu`;
    } else {
      return "Add dishes to your menu";
    }
  };

  const sumCalories = (dishes) => {
    let calories = 0;
    dishes.map((dish) => {
      return (calories += dish.calories);
    });
    return Math.round(calories);
  };

  return (
    <div
      className={
        expanded
          ? fullCard === card.id
            ? styles.expandedContainer
            : styles.noneContainer
          : styles.container
      }
    >
      <Card
        elevation={2}
        square={true}
        className={expanded ? styles.expandedCard : styles.card}
      >
        {dishes.length > 0 ? (
          !expanded ? (
            <CardMedia
              className={styles.cardImage}
              image={dishes[0].image}
              title={dishes[0].title}
            />
          ) : null
        ) : (
          <div className={styles.cardImageHolder} />
        )}
        <CardHeader title={day} className={styles.cardDay} />
        <CardContent className={styles.cardContent}>
          {!expanded ? (
            <Typography
              variant="h6"
              color="textSecondary"
              component="p"
              className={styles.cardTitle}
            >
              {formatCardTitle(dishes)}
            </Typography>
          ) : (
            dishes.map((dish, i) => {
              return (
                <div key={i} className={styles.cardItem}>
                  <Avatar
                    src={dish.image}
                    alt={`Image of a ${dish.title}`}
                    className={styles.itemImage}
                  />
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
            })
          )}
        </CardContent>
        <CardActions className={styles.cardFunc}>
          <Typography
            variant="h6"
            color="textSecondary"
            component="p"
            className={styles.cardCalories}
          >
            Total calories: {sumCalories(dishes)} / {goal}
          </Typography>
          <div>
            <Button
              className={styles.cardButton}
              onClick={() => {
                expandCard(id);
                if (!expanded) {
                  setFullCard(id);
                } else {
                  setFullCard("");
                }
              }}
            >
              {!expanded ? "Open" : "Close"}
            </Button>
            <Button
              className={styles.cardButton}
              onClick={() => deleteCard(id)}
            >
              Delete
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export { DishCard };
