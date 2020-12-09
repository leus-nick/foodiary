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
import styles from "./DishListItem.module.css";

const DishListItem = ({ dish, addToCard }) => {
  const { image, title } = dish;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={styles.dishListItem} elevation={3}>
      <div className={styles.itemInner}>
        <div className={styles.itemInnerContent}>
          {image ? (
            <CardMedia
              className={styles.dishListItemImage}
              image={image}
              title={title}
            />
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
