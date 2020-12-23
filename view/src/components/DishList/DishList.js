import { useContext } from "react";
import { dishContext } from "../Home";
import { DishListItem } from "../DishListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dishList: {
    flexBasis: "50%",
    marginLeft: "14px",
    maxHeight: "100%",
    overflowY: "scroll",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
});

const DishList = ({ addToCard }) => {
  const styles = useStyles();
  const dishItems = useContext(dishContext);
  return (
    <div className={styles.dishList} elevation={3}>
      {dishItems.map((item) => {
        if (!item.summary) {
          return null;
        }
        return <DishListItem addToCard={addToCard} dish={item} key={item.id} />;
      })}
    </div>
  );
};

export { DishList };
