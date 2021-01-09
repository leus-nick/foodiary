import { useState, useEffect } from "react";
import { DishList } from "../DishList";
import { AddCard } from "./AddCard";
import { MobileList } from "../MobileDishList";
import { DiaryItem } from "./DiaryItem";
import { Goal } from "../Goal";
import { v4 as uuidv4 } from "uuid";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "24px",
    flexWrap: "wrap",
  },
  inner: {
    display: "flex",
    flexGrow: "1",
    width: "100%",
    maxHeight: "calc(100vh - 164px)",
    justifyContent: "flex-start",
    "@media (min-width:1980px)": {
      maxWidth: "1800px",
    },
    "@media (max-width:960px)": {
      justifyContent: "center",
    },
  },
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    flexBasis: "100%",
    maxHeight: "calc(100vh - 164px)",
  },
  expandedCards: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    flexBasis: "50%",
    maxHeight: "calc(100vh - 164px)",
    "@media (max-width:960px)": {
      flexBasis: "100%",
    },
  },
  noDisplay: {
    display: "none",
  },
});

const Diary = () => {
  const styles = useStyles();
  const [cards, setCards] = useState({});
  const [userGoal, setUserGoal] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [expandedCard, setExpandedCard] = useState("");
  const [sum, setSum] = useState(0);

  useEffect(() => {
    fetchUserDetails();
  }, [setCards, setUserGoal]);

  const fetchUserDetails = () => {
    axios.get("/user").then((response) => {
      setCards((cards) => (cards = response.data.userCredentials.cards));
      setUserGoal(
        (userGoal) => (userGoal = response.data.userCredentials.goal)
      );
    });
  };

  const handleGoalUpdate = () => {
    axios
      .post("/user", { goal: userGoal })
      .then(() => {
        const newCards = Object.values(cards).map((card) => {
          if (dateCheker(card)) {
            card.goal = userGoal;
          }
          return card;
        });
        setCards((cards) => (cards = newCards));
      })
      .then(() => {
        axios
          .post("/user", {
            cards: {
              ...cards,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoalChange = (goal) => {
    let calories = 0;

    Object.values(cards).map((card) => {
      if (dateCheker(card)) {
        card.dishes.map((dish) => {
          return (calories += dish.calories);
        });
      }
      return card;
    });

    if (calories < Number(goal)) {
      setUserGoal(goal);
      return "";
    } else {
      return "too small goal";
    }
  };

  const dateCheker = (card) => {
    const date = new Date(card.date);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getYear() === today.getYear()
    )
      return true;
    return false;
  };

  const formatDay = (date) => {
    let day = date.getDay();
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "New day";
    }
  };

  const handleAddCardClick = () => {
    axios
      .post("/user", {
        cards: {
          ...cards,
          [`card ${uuidv4()}`]: {
            day: formatDay(new Date()),
            dishes: [],
            id: uuidv4(),
            date: new Date(),
            goal: userGoal,
          },
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setCards(
      (cards) =>
        (cards = {
          ...cards,
          [`card ${uuidv4()}`]: {
            day: formatDay(new Date()),
            dishes: [],
            id: uuidv4(),
            date: new Date(),
            goal: userGoal,
          },
        })
    );
  };

  const handleDeleteCardClick = (deletedId) => {
    let result = Object.values(cards).filter((card) => {
      if (showMenu) {
        setShowMenu(false);
        setExpandedCard("");
      }
      return card.id !== deletedId;
    });
    axios
      .post("/user", {
        cards: { ...result },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setCards((cards) => (cards = { ...result }));
  };

  // Check this function for errors
  const handleAddToCardClick = (dish) => {
    let changed = false;
    setSum(sum + dish.calories);
    if (sum > userGoal) {
      alert("This dish have much more calories than your goal");
      return;
    }

    let result = Object.values(cards).map((card) => {
      if (card.id === expandedCard) {
        if (dish && sum <= userGoal) {
          card.dishes.push(dish);
          changed = true;
        } else {
          alert("You rich your goal for today.");
        }
      }
      return card;
    });

    if (changed) {
      axios
        .post("/user", {
          cards: { ...result },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setCards((cards) => (cards = { ...result }));
    }
  };

  const handleDeleteDishClick = (dishId, cardId) => {
    console.log(dishId, cardId);
    let result = Object.values(cards).map((card) => {
      if (card.id === cardId) {
        card.dishes = card.dishes.filter((dish) => {
          return dish.id !== dishId;
        });
      }
      return card;
    });

    axios
      .post("/user", {
        cards: { ...result },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setCards((cards) => (cards = { ...result }));
  };

  const handleExtendCard = (id) => {
    if (!showMenu) {
      setExpandedCard(id);
      setShowMenu(true);
    } else {
      setExpandedCard("");
      setShowMenu(!showMenu);
    }
  };

  const handleShowMenu = () => {
    if (!mobileMenu) {
      setMobileMenu(true);
    } else setMobileMenu(false);
  };

  return (
    <Container component="main" maxWidth="xl" className={styles.container}>
      <Goal
        goal={userGoal}
        submitGoal={handleGoalUpdate}
        changeGoal={handleGoalChange}
      />
      <div className={styles.inner}>
        <div
          className={
            showMenu
              ? `${styles.expandedCards} ${mobileMenu ? styles.noDisplay : ""}`
              : styles.cards
          }
        >
          <AddCard expanded={showMenu} handleClick={handleAddCardClick} />
          {Object.values(cards)
            .reverse()
            .map((card) => {
              return (
                <DiaryItem
                  menu={mobileMenu}
                  key={card.id}
                  card={card}
                  deleteCard={handleDeleteCardClick}
                  deleteFromCard={handleDeleteDishClick}
                  expandCard={handleExtendCard}
                  showMenu={handleShowMenu}
                  expanded={showMenu}
                />
              );
            })}
        </div>
        {showMenu ? (
          !mobileMenu ? (
            <DishList
              addToCard={handleAddToCardClick}
              showMenu={handleShowMenu}
            />
          ) : (
            <MobileList
              addToCard={handleAddToCardClick}
              showMenu={handleShowMenu}
            />
          )
        ) : null}
      </div>
    </Container>
  );
};

export { Diary };
