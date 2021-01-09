import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    flexBasis: "20%",
    height: "100%",
    maxHeight: "100%",
    padding: "7px",
    "@media (max-width: 1450px)": {
      flexBasis: "33.333%",
    },
    "@media (max-width: 960px)": {
      flexBasis: "50%",
    },
    "@media (max-width: 650px)": {
      flexBasis: "100%",
    },
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(0deg, #8ae2af 0%, rgba(255,255,255,1) 25%)",
    "@media (max-width:960px)": {
      background: "linear-gradient(0deg, #8ae2af 0%, rgba(255,255,255,1) 35%)",
    },
  },
  cardImage: {
    flex: "1 0 150px",
    width: "100%",
    maskImage: "linear-gradient(180deg, black 70%, transparent 100%)",
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
  cardContent: {
    width: "100%",
    flex: "1 0 80px",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: "1rem",
    "@media (max-width:960px)": {
      fontSize: "0.95rem",
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
      fontSize: "0.95rem",
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
    },
  },
});

const DiaryCard = ({ card, deleteCard, expandCard, expanded, setId, sum }) => {
  const styles = useStyles();
  let { day, dishes, id, goal } = card;

  const formatCardTitle = (dishes) => {
    if (dishes.length > 2) {
      return ` and ${dishes.length - 1} more dishes in your menu`;
    } else if (dishes.length === 2) {
      return ` and 1 more dish in your menu`;
    } else if (dishes.length === 1) {
      return ` in your menu`;
    } else {
      return "Add dishes to your menu";
    }
  };

  return (
    <div className={styles.container}>
      <Card elevation={2} square={true} className={styles.card}>
        <CardMedia
          className={styles.cardImage}
          image={dishes.length > 0 ? dishes[0].image : null}
          title={dishes.length > 0 ? dishes[0].title : null}
        />

        <div className={styles.cardDay}>
          <Typography variant="h2" className={styles.dayName}>
            {day}
          </Typography>
        </div>

        <CardContent className={styles.cardContent}>
          <Typography
            variant="h6"
            color="textSecondary"
            component="p"
            className={styles.cardTitle}
          >
            {dishes.length > 0 ? <span>{dishes[0].title}</span> : null}
            {formatCardTitle(dishes)}
          </Typography>
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
                if (!expanded) {
                  setId(id);
                }
              }}
            >
              Open
            </Button>
            <Button
              variant="outlined"
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

export { DiaryCard };
