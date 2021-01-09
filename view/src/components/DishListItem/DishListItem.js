import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  IconButton,
} from "@material-ui/core";
import { ExpandMore, Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid #e0e3e6",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: "1",
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginLeft: "10px",
    fontSize: "1rem",
    "@media (max-width:960px)": {
      fontSize: "0.9rem",
    },
    flex: "1",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    flex: "0 0 100px",
  },
});

const DishListItem = ({ dish, addToCard }) => {
  const styles = useStyles();
  const { image, title, id } = dish;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={styles.container} elevation={0} square={true}>
      <div className={styles.inner}>
        <CardContent className={styles.content}>
          {image ? (
            <CardMedia className={styles.image} image={image} title={title} />
          ) : null}
          <Typography
            className={styles.title}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {title}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            onClick={() =>
              addToCard({
                title: title,
                calories: dish.nutrition.nutrients[0].amount,
                id: id,
                image: image,
              })
            }
            aria-label="add to card"
          >
            <Add />
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{dish.summary.replace(/(<([^>]+)>)/gi, "")}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export { DishListItem };
