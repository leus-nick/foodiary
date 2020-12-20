import { useContext } from "react";
import { dishContext } from "../Home";
import { DishListItem } from "../DishListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dishList: {
    flexBasis: "50%",
    padding: "0 10px",
    maxHeight: "calc(100% - 10px)",
    overflowY: "scroll",
  },
});

const DishList = ({ addToCard }) => {
  const styles = useStyles();
  const dishItems = useContext(dishContext);
  return (
    <div className={styles.dishList} elevation={3}>
      {dishItems.map((item) => {
        return <DishListItem addToCard={addToCard} dish={item} key={item.id} />;
      })}
    </div>
  );
};

export { DishList };
