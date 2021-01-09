import { useContext } from "react";
import { Paper, Button } from "@material-ui/core";
import { dishContext } from "../Home";
import { DishListItem } from "../DishListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dishList: {
    width: "100%",
    flex: "1",
    overflowY: "scroll",
  },
  mobileList: {
    flexBasis: "100%",
    maxHeight: "100%",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listButtonContainer: {
    width: "99.9%",
    display: "flex",
  },
  listButton: {
    flex: "1",
    padding: "5px 20px",
    transition: "all .4s ease-in-out",
    borderRadius: "0px",
    backgroundColor: "#58d68d",
    color: "white",
    "@media (max-width:960px)": {
      fontSize: "0.7rem",
    },
  },
});

const MobileList = ({ addToCard, showMenu }) => {
  const styles = useStyles();
  const dishItems = useContext(dishContext);
  return (
    <Paper className={styles.mobileList} elevation={3} square={true}>
      <div>Search</div>
      <div className={styles.dishList}>
        {dishItems.map((item) => {
          if (!item.summary) {
            return null;
          }
          return (
            <DishListItem addToCard={addToCard} dish={item} key={item.id} />
          );
        })}
      </div>
      <div className={styles.listButtonContainer}>
        <Button className={styles.listButton} onClick={() => showMenu()}>
          Close Menu
        </Button>
      </div>
    </Paper>
  );
};

export { MobileList };
