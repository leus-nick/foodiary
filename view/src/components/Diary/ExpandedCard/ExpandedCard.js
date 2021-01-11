import {
  Avatar,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  expandedContainer: {
    flexBasis: "100%",
    minHeight: "100%",
    display: "flex",
  },
  expandedCard: {
    flex: "1",
    background: "white",
    display: "flex",
    flexDirection: "column",
  },
  cardDay: {
    flex: "0 0 60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dayName: {
    fontSize: "2rem",
    fontWeight: "700",
    "@media (max-width:960px)": {
      fontSize: "1.6rem",
      padding: "10px 0",
    },
  },
  expandedCardContent: {
    flex: "1",
  },
  cardItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },
  cardItemImage: {
    width: "50px",
    height: "50px",
  },
  cardItemContent: {
    display: "flex",
    alignItems: "center",
    "& p": {
      marginLeft: "15px",
    },
  },
  cardItemTitle: {
    fontSize: "1rem",
    "@media (max-width:960px)": {
      fontSize: "0.9rem",
    },
  },
  cardActions: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: "0 0 100px",
  },
  cardCalories: {
    textAlign: "center",
    fontSize: "1rem",
    "@media (max-width:960px)": {
      fontSize: "0.8rem",
    },
  },
  cardButtons: {
    marginLeft: "0px !important",
    width: "80%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  cardButton: {
    width: "100px",
    padding: "5px 20px",
    transition: "all .4s ease-in-out",
    borderColor: "#58d68d",
    borderRadius: "0px",
    "&:hover": {
      color: "white",
      backgroundColor: "#58d68d",
    },
    "@media (max-width:960px)": {
      fontSize: "0.7rem",
      width: "120px",
    },
  },
  cardDeleteButton: {
    display: "flex",
    "@media (max-width:960px)": {
      display: "none",
    },
  },
  cardMenuButton: {
    display: "none",
    "@media (max-width:960px)": {
      display: "flex",
    },
  },
});

const ExpandedCard = ({
  card,
  deleteCard,
  deleteFromCard,
  expanded,
  expandCard,
  setId,
  sum,
  showMenu,
}) => {
  const styles = useStyles();
  let { day, dishes, id, goal } = card;

  return (
    <div className={styles.expandedContainer}>
      <Card elevation={2} square={true} className={styles.expandedCard}>
        <div className={styles.cardDay}>
          <Typography variant="h2" className={styles.dayName}>
            {day}
          </Typography>
        </div>

        <CardContent className={styles.expandedCardContent}>
          {dishes.map((dish, i) => {
            return (
              <div key={i} className={styles.cardItem}>
                <div className={styles.cardItemContent}>
                  <Avatar
                    src={dish.image}
                    alt={`Image of a ${dish.title}`}
                    className={styles.cardItemImage}
                  />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    component="p"
                    className={styles.cardItemTitle}
                  >
                    {dish.title}
                  </Typography>
                </div>
                <IconButton
                  onClick={() => deleteFromCard(dish.id, id)}
                  aria-label="delete dish"
                >
                  <Clear />
                </IconButton>
              </div>
            );
          })}
        </CardContent>

        <CardActions className={styles.cardActions}>
          <Typography
            variant="h6"
            component="p"
            className={styles.cardCalories}
          >
            Total calories: {sum(dishes)} / {goal}
          </Typography>
          <div className={styles.cardButtons}>
            <Button
              variant="outlined"
              className={styles.cardButton}
              onClick={() => {
                expandCard(id);
                if (expanded) {
                  setId(null);
                }
              }}
            >
              Close
            </Button>
            <Button
              variant="outlined"
              className={`${styles.cardButton} ${styles.cardDeleteButton}`}
              onClick={() => deleteCard(id)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              className={`${styles.cardButton} ${styles.cardMenuButton}`}
              onClick={() => showMenu()}
            >
              Show Menu
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export { ExpandedCard };
