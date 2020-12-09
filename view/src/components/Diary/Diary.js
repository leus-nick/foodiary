import { useState, useEffect } from "react";
import { DishList } from "../DishList";
import { AddCard } from "./AddCard";
import { DishCard } from "./Card";
import styles from "./Diary.module.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Diary = ({ props }) => {
  console.log("render Diary");
  const [cards, setCards] = useState({});
  const [userGoal, setUserGoal] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    fetchUserCards();
  }, [setCards]);

  const fetchUserCards = () => {
    axios.get("/user").then((response) => {
      setCards((cards) => (cards = response.data.userCredentials.cards));
      setUserGoal(
        (userGoal) => (userGoal = response.data.userCredentials.goal)
      );
    });
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
          },
        })
    );
  };

  const handleDeleteCardClick = (deletedId) => {
    let result = Object.values(cards).filter((card) => {
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

  const handleExpandCardClick = (id) => {
    setExpandedCard(id);
    setExpanded(!expanded);
  };

  const handleAddToCardClick = (dish) => {
    let result = Object.values(cards).map((card) => {
      if (card.id === expandedCard) {
        if (dish && sum <= userGoal) {
          card.dishes.push(dish);
          setSum((sum) => (sum += dish.calories));
        } else {
          alert("You rich your goal for today.");
        }
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

  const handleDeleteDishClick = (dishId, cardId) => {
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

  return (
    <>
      <div className={expanded ? styles.diaryExp : styles.diary}>
        <AddCard handleClick={handleAddCardClick} />
        {Object.values(cards)
          .reverse()
          .map((card, i) => {
            return (
              <DishCard
                key={card.id}
                card={card}
                goal={userGoal}
                id={Object.keys(cards)[i]}
                expandMenu={handleExpandCardClick}
                deleteCard={handleDeleteCardClick}
                deleteFromCard={handleDeleteDishClick}
              />
            );
          })}
      </div>
      {expanded ? <DishList addToCard={handleAddToCardClick} /> : null}
    </>
  );
};

export { Diary };
