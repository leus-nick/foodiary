import { useState } from "react";
import { DiaryCard } from "../Card";
import { ExpandedCard } from "../ExpandedCard";

const DiaryItem = ({
  card,
  deleteCard,
  deleteFromCard,
  expandCard,
  expanded,
  menu,
  showMenu,
}) => {
  const [fullCard, setFullCard] = useState(null);

  const sumCalories = (dishes) => {
    let calories = 0;
    dishes.map((dish) => {
      return (calories += dish.calories);
    });
    return Math.round(calories);
  };

  return expanded ? (
    fullCard === card.id ? (
      <ExpandedCard
        card={card}
        deleteFromCard={deleteFromCard}
        sum={sumCalories}
        deleteCard={deleteCard}
        expandCard={expandCard}
        expanded={expanded}
        setId={setFullCard}
        showMenu={showMenu}
        menu={menu}
      />
    ) : null
  ) : (
    <DiaryCard
      sum={sumCalories}
      setId={setFullCard}
      card={card}
      deleteCard={deleteCard}
      expandCard={expandCard}
      expanded={expanded}
    />
  );
};

export { DiaryItem };
