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
    padding: "10px",
    marginBottom: "10px",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
});

const DishListItem = ({ dish, addToCard }) => {
  const styles = useStyles();
  const { image, title } = dish;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={styles.container} elevation={3} square="true">
      <div className={styles.inner}>
        <div className={styles.content}>
          {image ? (
            <CardMedia className={styles.image} image={image} title={title} />
          ) : null}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {title}
            </Typography>
          </CardContent>
        </div>
        <CardActions disableSpacing>
          <IconButton
            onClick={() =>
              addToCard({
                title: title,
                calories: dish.nutrition.nutrients[0].amount,
                id: dish.id,
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
          <Typography paragraph>
            {/* {instructions.replace(/(<([^>]+)>)/gi, "")} */}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export { DishListItem };
