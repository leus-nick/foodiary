import { useState, useContext } from "react";
import { Paper, Button, TextField } from "@material-ui/core";
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
    marginLeft: "14px",
    flexBasis: "50%",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width:960px)": {
      marginLeft: "0px",
      flexBasis: "100%",
    },
  },
  searchContainer: {
    width: "100%",
    padding: "10px 5px",
    display: "flex",
    alignItems: "center",
  },
  searchField: {
    flex: "1",
    "& label.Mui-focused": {
      color: "#58d68d",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#58d68d",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#58d68d",
      },
    },
  },
  searchIcon: {
    marginLeft: "5px",
    transition: "all .3s ease-in-out",
    "&:hover": {
      backgroundColor: "#58d68d",
      color: "white",
    },
  },
  listButtonContainer: {
    width: "99.9%",
    display: "flex",
  },
  listButton: {
    flex: "1",
    padding: "10px 20px",
    transition: "all .4s ease-in-out",
    borderRadius: "0px",
    backgroundColor: "#58d68d",
    color: "white",
    "&:hover": {
      backgroundColor: "#58d68d",
    },
    "@media (max-width:960px)": {
      fontSize: "0.7rem",
    },
  },
  noDisplay: {
    "@media (max-width:960px)": {
      display: "none",
    },
  },
  noButtonDisplay: {
    display: "none",
  },
});

const DishList = ({ addToCard, showMenu, menu }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const styles = useStyles();
  const dishItems = useContext(dishContext);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Paper
      className={`${styles.mobileList} ${menu ? "" : styles.noDisplay}`}
      elevation={3}
      square={true}
    >
      <div className={styles.searchContainer}>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          className={styles.searchField}
          variant="outlined"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className={styles.dishList}>
        {searchQuery && searchQuery.length > 0
          ? dishItems.map((item) => {
              if (
                item.title.toLowerCase().indexOf(searchQuery) + 1 &&
                item.summary
              ) {
                return (
                  <DishListItem
                    addToCard={addToCard}
                    dish={item}
                    key={item.id}
                  />
                );
              }
              return null;
            })
          : dishItems.map((item) => {
              if (!item.summary) {
                return null;
              }
              return (
                <DishListItem addToCard={addToCard} dish={item} key={item.id} />
              );
            })}
      </div>
      <div
        className={`${styles.listButtonContainer} ${
          menu ? "" : styles.noButtonDisplay
        }`}
      >
        <Button className={styles.listButton} onClick={() => showMenu()}>
          Close Menu
        </Button>
      </div>
    </Paper>
  );
};

export { DishList };
