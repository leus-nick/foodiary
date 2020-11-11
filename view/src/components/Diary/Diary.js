import { useState, useEffect } from "react";
import { AddCard } from "./AddCard";
import { Card } from "./Card";
import styles from "./Diary.module.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Diary = () => {
  console.log("render Diary");
  const [cards, setCards] = useState({});
  const [userGoal, setUserGoal] = useState(0);

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
            dishes: [
              { title: "Potato", calories: 350 },
              { title: "Egg", calories: 30 },
              { title: "Tea", calories: 5 },
            ],
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
            dishes: [
              { title: "Potato", calories: 350 },
              { title: "Egg", calories: 30 },
              { title: "Tea", calories: 5 },
            ],
            id: uuidv4(),
          },
        })
    );
  };

  const handleDeleteCardClick = (deletedId) => {
    let result = Object.values(cards).filter((card) => {
      return card.id != deletedId;
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
    <div className={styles.diary}>
      <AddCard handleClick={handleAddCardClick} />
      {Object.values(cards).map((card, i) => {
        return (
          <Card
            key={card.id}
            card={card}
            goal={userGoal}
            id={Object.keys(cards)[i]}
            deleteCard={handleDeleteCardClick}
          />
        );
      })}
    </div>
  );
};

export { Diary };
